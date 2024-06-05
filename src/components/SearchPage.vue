<script setup>

</script>

<template>
<div class="search-book">
  <p class="section-title">Поиск книг</p>
  <form @submit.prevent="searchBooks" class="search-form">
    <label for="author" style="margin-right: 122px">Автор:</label>
    <input type="text" id="author" v-model="authorQuery"><br>

    <label for="title" style="margin-right: 11px">Наименование книги:</label>
    <input type="text" id="title" v-model="titleQuery"><br>

    <label for="genre" style="margin-right: 124px">Жанр:</label>
    <input type="text" id="genre" v-model="genreQuery"><br>

    <button type="submit" class="button">Искать</button>
  </form>

  <div v-if="searchResults !== null">
    <p v-if="searchResults.length > 0">Результаты поиска:</p>
    <div v-if="searchResults.length > 0" class="books-list">
      <div v-for="book in searchResults" :key="book.id" class="book">
        <img src="../assets/book-icon.png" alt="Book" class="book-image" @click="readBook(book.pdfUrl)">
        <div class="book-details">
          <p style="padding-bottom: 12px">{{ book.title }}</p>
          <p v-if="Array.isArray(book.author)">
            <span v-for="(author, index) in book.author" :key="index">
              {{ author.firstname }} {{ author.patronymic }} {{ author.lastname }} <br>
            </span>
          </p>
          <p v-else>
            {{ book.author.firstname }} {{ book.author.patronymic }} {{ book.author.lastname }}
          </p>
          <p>Год издания: {{ book.year }}</p>
          <p>Издательство: {{ book.publisher }}</p>
        </div>
        <div class="status">
          <button @click="bookedBook(book.id)" >
            <img src="../assets/booked-icon.png" alt="" title="Забронировать книгу">
          </button>
          <button @click="saveBook(book.id)" >
            <img src="../assets/add-to-saved-icon.png" alt="" title="Сохранить книгу" style="height: 34px; width: 34px">
          </button>
          <button @click="readBook(book.id)" >
            <img src="../assets/read-icon.png" alt="" title="Чтение книги" style="height: 44px; width: 44px">
          </button>
          <!-- Кнопка удаления, видимая только для администраторов -->
          <button v-if="isAdmin" @click="deleteBook(book.id)" class="delete-button">
            <img src="../assets/delete-icon.png" alt="Delete">
          </button>
        </div>
      </div>
    </div>
    <p v-else class="section-title">Ничего не найдено</p>
  </div>
  <div v-else>
    <p class="section-title">Введите данные для поиска</p>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      authorQuery: '',
      titleQuery: '',
      genreQuery: '',
      searchResults: [], // Результаты поиска
      isAdmin: true,
      booksData: [
        {
          id: 1,
          title: 'Мастер и Маргарита',
          author: { firstname: 'Михаил', patronymic: 'Афанасьевич', lastname: 'Булгаков' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2001',
          publisher: 'Дрофа',
          genre: 'Художественная литература'
        },
        {
          id: 2,
          title: 'Война и мир',
          author: { firstname: 'Лев', patronymic: 'Николаевич', lastname: 'Толстой' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2003',
          publisher: 'Москва',
          genre: 'Художественная литература'
        },
        {
          id: 3,
          title: 'Преступление и наказание',
          author: { firstname: 'Федор', patronymic: 'Михайлович', lastname: 'Достоевский' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2010',
          publisher: 'Дрофа',
          genre: 'Художественная литература'
        },
        {
          id: 4,
          title: 'Братья Карамазовы',
          author: { firstname: 'Федор', patronymic: 'Михайлович', lastname: 'Достоевский' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2007',
          publisher: 'Дрофа',
          genre: 'Художественная литература'
        },
        {
          id: 5,
          title: 'Анна Каренина',
          author: { firstname: 'Лев', patronymic: 'Николаевич', lastname: 'Толстой' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2006',
          publisher: 'Санкт-Петербург',
          genre: 'Художественная литература'
        },
        {
          id: 6,
          title: 'Автоматизированные библиотечно-информационные системы России: состояние, выбор, внедрение и развитие',
          author: [
          { firstname: 'Яков', patronymic: 'Леонидович', lastname: 'Шрайберг' },
          { firstname: 'Феликс', patronymic: 'Семёнович', lastname: 'Воройский' }],
            pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
          year: '2015',
          publisher: 'Юрайт',
          genre: 'Документоведение'
        }
      ]
    };
  },
  computed: {
  },
  methods: {
    searchBooks() {
      if (!this.authorQuery.trim() && !this.titleQuery.trim() && !this.genreQuery.trim()) {
        this.searchResults = [];
        return;
      }

      let filteredBooks = this.booksData;

      if (this.authorQuery.trim() !== '') {
        const authorQuery = this.authorQuery.toLowerCase();
        filteredBooks = filteredBooks.filter(book => {
          if (Array.isArray(book.author)) {
            return book.author.some(author =>
                author.firstname.toLowerCase().includes(authorQuery) ||
                author.lastname.toLowerCase().includes(authorQuery) ||
                author.patronymic.toLowerCase().includes(authorQuery)
            );
          } else {
            return (
                book.author.firstname.toLowerCase().includes(authorQuery) ||
                book.author.lastname.toLowerCase().includes(authorQuery) ||
                book.author.patronymic.toLowerCase().includes(authorQuery)
            );
          }
        });
      }


      if (this.titleQuery.trim() !== '') {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(this.titleQuery.toLowerCase())
        );
      }
      if (this.genreQuery.trim() !== '') {
        filteredBooks = filteredBooks.filter(book =>
            book.genre && book.genre.toLowerCase().includes(this.genreQuery.toLowerCase())
        );
      }
      this.searchResults = filteredBooks;
    },
    saveBook() {

    },
    bookedBook() {

    },
    readBook(bookId) {
      const book = this.booksData.find(b => b.id === bookId);
      if (book && book.pdfUrl) {
        window.open(book.pdfUrl, '_blank');
      } else {
        console.error('Book URL not found!');
      }
    },
    // Удаление книги администратором
    deleteBook(bookId) {
      if (!this.isAdmin) {
        alert('Вы не имеете права администратора для выполнения этой операции!');
        return;
      }
      // Подтверждение удаления
      if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
        const index = this.booksData.findIndex(book => book.id === bookId);
        if (index !== -1) {
          this.booksData.splice(index, 1);
        }
        else {
          alert('Книга не найдена');
        }
        // Находим и удаляем книгу из массива результатов поиска searchResults
        const indexInSearchResults = this.searchResults.findIndex(book => book.id === bookId);
        if (indexInSearchResults !== -1) {
          this.searchResults.splice(indexInSearchResults, 1);
        }
      }
    },
  }
}
</script>
<style scoped>

.search-book {
  text-align: left;
  max-width: 80vw;
  margin: 20px auto 10px 60px;
  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 8px;
    margin-left: 20px;
  }
}
.section-title {
  font-size: 24px;
  color: #203156;
  margin: 20px 0px 10px;
  text-align: left;
  font-family: 'IBM Plex Serif', serif;
  font-weight: 600;
}
.search-form {
  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 8px;
    margin-bottom: 12px;
    width: 350px;
  }
  label {
    color: #5c7d9d;
  }
}
.button {
  background-color: #9db9d3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 16px;
  cursor: pointer;
  margin: 16px 0 16px 170px;
}
.books-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 90vw;
  p {
    margin: 0;
    font-weight: normal;
    font-size: 0.9rem;
  }
}
.books-list p:first-child{
  font-weight: bold;
  font-size: 1.1rem;
}
.book {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EAF1FB;
  border-radius: 8px;
  padding: 8px 16px 8px 0;
  margin-bottom: 10px;
  width: 43vw;
  min-width: 330px;
  img {
    width: 36px;
    height: 36px;
  }
  button {
    background-color: #EAF1FB;
    border: none;
  }
}
.book-details {
  flex-grow: 1;
  text-align: left;
  margin-left: 40px;
}
.book-image {
  margin-left: 20px;
}
</style>