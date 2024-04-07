<script setup>

</script>

<template>
<div class="search-book">
  <p>Поиск книг</p>
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
<!--    <ul v-if="searchResults.length > 0">
      <li v-for="book in searchResults" :key="book.id">
        <strong>{{ book.title }}</strong> - {{ book.authors.join(', ') }} ({{ book.genre }})
      </li>
    </ul>-->

    <div v-if="searchResults.length > 0" class="books-list">
      <div v-for="book in searchResults" :key="book.id" class="book">
        <img src="../assets/book-icon.png" alt="Book" class="book-image">
        <div class="book-details">
          <p>{{ book.title }}</p>
          <p>{{ book.authors.join(', ') }}</p>
          <p>{{ book.genre }}</p>
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
        </div>
      </div>
    </div>
    <p v-else>Ничего не найдено</p>
  </div>
  <div v-else>
    <p>Введите данные для поиска</p>
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
      booksData: null,

    };
  },
  computed: {
    searchResults() {
      if (!this.booksData) return null;

      let filteredBooks = this.booksData;
      if (this.authorQuery.trim() !== '') {
        filteredBooks = filteredBooks.filter(book =>
            book.authors.some(author =>
                author.toLowerCase().includes(this.authorQuery.toLowerCase())
            )
        );
      }
      if (this.titleQuery.trim() !== '') {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(this.titleQuery.toLowerCase())
        );
      }
      if (this.genreQuery.trim() !== '') {
        filteredBooks = filteredBooks.filter(book =>
            book.genre.toLowerCase().includes(this.genreQuery.toLowerCase())
        );
      }
      return filteredBooks;
    }
  },
  methods: {
    searchBooks() {
      // Здесь можно отправить запрос на сервер для поиска книг
      console.log('Выполняется поиск книг по запросу:', {
        authorQuery: this.authorQuery,
        titleQuery: this.titleQuery,
        genreQuery: this.genreQuery
      });
      this.booksData = [
        { id: 1, title: 'Book 1', authors: ['Author 1'], genre: 'Genre 1' },
        { id: 2, title: 'Book 2', authors: ['Author 2'], genre: 'Genre 2' },
        { id: 3, title: 'Book 3', authors: ['Author 3'], genre: 'Genre 3' },
        // Здесь можно добавить другие книги
      ]
    },
    saveBook() {

    },
    bookedBook() {

    },
    readBook() {

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