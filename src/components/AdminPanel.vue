<script setup>
import {useI18n} from 'vue-i18n';
const { t } = useI18n({useScope: 'global'});
</script>

<template>
  <div class="admin-panel">
    <p class="section-title" style="padding-bottom: 14px">Панель администратора</p>
    <!--    Обработка заявок на бронирование-->
    <div class="section">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Обработка заявок на бронирование</p>
        <button @click="showRequests= !showRequests"
                style="display: inline-block; background-color: white; border: none; margin-left: 16px; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showRequests">expand_more</span>
          <span class="material-icons" v-if="showRequests">expand_less</span>
        </button>
      </div>
      <div v-if="showRequests" style="margin-bottom: 16px">
        <div v-for="(request, index) in bookingRequests" :key="index">
          <div v-if="request.state === null" class="booking-request">
            <p>№ {{ request.id }}, {{ request.date }}</p>
            <p><b>{{ request.surname }} {{ request.name }} {{ request.patronymic}}</b> (CardID: <b>{{ request.cardId }}</b>) подал(a) заявку на бронирование книги:</p>
            <div class="book-info" style="margin-bottom: 16px">
              <p>"{{ request.book }}"</p>
              <p>Год издания: {{ request.year }}</p>
              <p>Издательство: {{ request.publisher }}</p>
            </div>

            <button class="button action-button" @click="approveRequest(index)">Одобрить</button>
            <button class="button action-button delete" @click="rejectRequest(index)">Отклонить</button>
          </div>
        </div>
      </div>
    </div>
    <!--    Одобренные заявки-->
    <div class="section">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Одобренные заявки</p>
        <button @click="showApproved= !showApproved"
                style="display: inline-block; background-color: white; border: none; margin-left: 16px; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showApproved">expand_more</span>
          <span class="material-icons" v-if="showApproved">expand_less</span>
        </button>
      </div>
      <div v-if="showApproved" style="margin-bottom: 16px">
        <div v-for="(request, index) in bookingRequests" :key="index">
          <div v-if="request.state === true" class="booking-request" style="max-width: 700px">
            <p>№ {{ request.id }}, {{ request.date }}</p>
            <p><b>{{ request.surname }} {{ request.name }} {{ request.patronymic}}</b> (CardID: <b>{{ request.cardId }}</b>) забронировал(а) книгу:</p>
            <div class="book-info" style="margin-bottom: 16px; display: inline-block">
              <p>"{{ request.book }}"</p>
              <p>Год издания: {{ request.year }}</p>
              <p>Издательство: {{ request.publisher }}</p>
            </div>
            <button class="button action-button delete" @click="rejectRequest(index)" style="display: inline-block; float: right; margin-bottom: 16px">Удалить</button>
          </div>
        </div>
      </div>
    </div>
    <!--    Добавление новости-->
    <div class="section news">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Управление новостями</p>
        <button @click="showNews = !showNews"
                style="display: inline-block; background-color: white; border: none; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showNews">expand_more</span>
          <span class="material-icons" v-if="showNews">expand_less</span>
        </button>
      </div>
      <div v-if="showNews">
        <p>Добавление новости</p>
        <form @submit.prevent="submitFormNews">
          <label for="title">Заголовок:</label><br>
          <input type="text" id="title" v-model="newNews.title" required class="input-group-text" style="width: 500px; overflow-x: auto!important;"><br>

          <label for="content">Текст новости:</label><br>
          <textarea id="content" v-model="newNews.text" style="height: 200px; width: 500px; resize: none" class="input-group-text"></textarea><br>

          <label for="date">Дата:</label><br>
          <input type="date" id="date" v-model="newNews.date" class="input-group-text" required><br>

          <label for="photo">Фото:</label><br>
          <input type="file" id="photo" accept="image/*" @change="handleFileChange" class=""><br>

          <button type="submit" class="button" style="margin-top: 12px; padding: 8px 16px">Добавить новость</button>
        </form>
      </div>
    </div>
    <!--    Добавление мероприятия-->
    <div class="section ">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Управление мероприятиями</p>
        <button @click="showEvents = !showEvents"
                style="display: inline-block; background-color: white; border: none; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showEvents">expand_more</span>
          <span class="material-icons" v-if="showEvents">expand_less</span>
        </button>
      </div>
      <div v-if="showEvents">
        <p>Добавление мероприятия</p>
        <form @submit.prevent="submitFormEvents">
          <label for="title">Заголовок:</label><br>
          <input type="text" id="title" v-model="newEvent.title" class="input-group-text" required style="width: 500px; overflow-x: auto"><br>

          <label for="content">Текст мероприятия:</label><br>
          <textarea id="content" v-model="newEvent.text" required style="height: 200px; width: 500px; resize: none" class="input-group-text"></textarea><br>

          <label for="date">Дата:</label><br>
          <input type="date" id="date" v-model="newEvent.date" class="input-group-text" required><br>

          <label for="photo">Фото:</label><br>
          <input type="file" id="photo" accept="image/*" @change="handleFileChange" class="input-photo"><br>

          <button type="submit" class="button" style="margin-top: 12px; padding: 8px 16px">Добавить мероприятие</button>
        </form>
      </div>
    </div>
    <!--    Добавление книги-->
    <div class="section">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Управление книгами</p>
        <button @click="showAddBook= !showAddBook"
                style="display: inline-block; background-color: white; border: none; margin-left: 16px; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showAddBook">expand_more</span>
          <span class="material-icons" v-if="showAddBook">expand_less</span>
        </button>
      </div>
      <div v-if="showAddBook">
        <form @submit.prevent="FormBookAdd" class="book-form">
          <label for="book_title" >Наименование книги:</label><br>
          <input type="text" v-model="newBook.bookTitle" style="max-width: 400px;" required class="inp"><br>

          <label>Количество авторов:</label><br>
          <input type="number" v-model="newBook.authorCount" min="1" required class="inp"><br>

          <div v-for="index in newBook.authorCount" :key="index" style="display: inline-block; padding: 8px 8px 0px 0">
            <label>Автор {{ index }}:</label><br>
            <input type="text" v-model="newBook.authors[index-1].firstname" placeholder="Имя" class="inp" style="max-width: 250px; margin-bottom: 8px" required><br>
            <input type="text" v-model="newBook.authors[index-1].lastname" placeholder="Фамилия" class="inp" style="max-width: 250px; margin-bottom: 8px" required><br>
            <input type="text" v-model="newBook.authors[index-1].patronymic" placeholder="Отчество" class="inp" style="max-width: 250px; margin-bottom: 8px" ><br>
          </div><br>

          <label>Количество жанров:</label><br>
          <input type="number" v-model="newBook.genreCount" min="1" required class="inp"><br>

          <div v-for="index in newBook.genreCount" :key="index" style="display: inline-block; padding: 8px 8px 8px 0">
            <label>Жанр {{ index }}:</label><br>
            <input type="text" v-model="newBook.genres[index-1]" required class="inp"><br>
          </div><br>

          <label for="year" >Год издания книги:</label><br>
          <input type="number" v-model="newBook.year" required style="margin-bottom: 8px" class="inp"><br>

          <label for="publisher" >Издательство:</label><br>
          <input type="text" v-model="newBook.publisher" style="margin-bottom: 24px" required class="inp"><br>

          <div style="display: flex; justify-content: end">
            <button type="reset"
                    style="background-color: #eef2fa; color: #2c3e50; border: none; border-radius: 8px; height: 42px; margin-right: 8px;
                            width:fit-content; padding: 0 16px ">
              Очистить
            </button>
            <input type="submit" value="Добавить книгу" class="button"
                   style="margin-bottom: 24px; padding: 8px 16px; border-radius: 8px; width: fit-content">
          </div>
        </form>
      </div>
    </div>
    <!--    Просмотр статистики-->
    <div class="section">
      <div>
        <p style="display: inline-block; width: 80%" class="section-title">Просмотр статистики</p>
        <button @click="showStat= !showStat"
                style="display: inline-block; background-color: white; border: none; margin-left: 16px; float: right; width: 10%; height: 24px">
          <span class="material-icons" v-if="!showStat">expand_more</span>
          <span class="material-icons" v-if="showStat">expand_less</span>
        </button>
      </div>
      <div v-if="showStat">
        <div style="margin-bottom: 16px">
          <button @click="refreshCount" style="display: inline-block; border: none; border-radius: 8px; height: 36px; font-size: 14px;
                                              background-color: #e5e7e8; color: #4c4d54; margin-right: 16px; padding: 0 8px">
            Обновить данные
          </button>
          <p class="statistics">Общее количество пользователей: {{ totalUsers }}</p>
        </div>
        <div style="margin-bottom: 16px">
          <button @click="refreshOrderBooks" style="display: inline-block; border: none; border-radius: 8px; height: 36px; font-size: 14px;
                                              background-color: #e5e7e8; color: #4c4d54; margin-right: 16px; padding: 0 8px">
            Обновить данные
          </button>
          <p class="statistics">Количество заявок за текущий год: {{ requestsCount }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // для админа
      news : [
        { title: 'Новость 1', type: 'news', text: 'abcde', date: '2024-04-01' },
        { title: 'Новость 2', type: 'news', text: 'abcde', date: '2024-03-01' },
        { title: 'Новость 3', type: 'news', text: 'abcde', date: '2024-02-01' },
      ],
      Events : [
        { title: 'Мероприятие 1', type: 'event', text: 'abcde', date: '2024-04-01' },
        { title: 'Мероприятие 2', type: 'event', text: 'abcde', date: '2024-03-01' },
        { title: 'Мероприятие 3', type: 'event', text: 'abcde', date: '2024-02-01' },
      ],
      books : [
        { title: 'Книга 1', author: 'Автор 1', year: '2000', publisher: 'Дрофа' },
        { title: 'Книга 2', author: 'Автор 2', year: '2002', publisher: 'Москва' }
      ],
      bookingRequests: [
        {
          id: '1',
          surname: 'Иванов',
          name: 'Алексей',
          patronymic: 'Иванович',
          cardId: 'AF2344568764',
          year: '2000',
          publisher: 'Эксмо',
          state: true,
          book: 'Мастер и Маргарита',
          date: '2024-05-15'
        },
        {
          id: '2',
          surname: 'Сидоров',
          name: 'Николай',
          patronymic: 'Семенович',
          cardId: 'AF2344564864',
          year: '2001',
          publisher: 'Дрофа',
          state: true,
          book: 'Преступление и наказание',
          date: '2024-05-16'
        },
        {
          id: '3',
          surname: 'Кузнецова',
          name: 'Елена',
          patronymic: 'Николаевна',
          cardId: 'AF1145657640',
          year: '2015',
          state: null,
          publisher: 'Санкт-Петербург',
          book: 'Братья Карамазовы',
          date: '2024-05-17'
        },
        {
          id: '4',
          surname: 'Морозов',
          name: 'Дмитрий',
          patronymic: 'Олегович',
          cardId: 'AF1145657640',
          year: '2008',
          state: null,
          publisher: 'Москва',
          book: 'Анна Каренина',
          date: '2024-05-18'
        }
      ],

      totalUsers : 4, // Количество пользователей
      requestsCount : 5, // Количество заявок
      showModal: false,
      showApproved: false,
      showRequests: false,
      showNews: false,
      showEvents: false,
      showAddBook: false,
      showStat: false,

      // новая новость
      newNews: {
        title: '',
        text: '',
        date: '',
        photo: null
      },

      // новое мероприятие
      newEvent: {
        title: '',
        text: '',
        date: '',
        photo: null
      },

      // добавление книги
      newBook: {
        bookTitle: '',
        authorCount: 1, // Изначально один автор
        genreCount: 1, // Изначально один жанр
        authors: [{ firstname: '', lastname: '', patronymic: '' }], // Массив для данных об авторах
        genres: [''], // Массив для данных о жанрах
        publisher: '',
        year: null,
      },
    };
  },
  mounted() {

  },
  computed: {

  },

  watch: {
    'newBook.authorCount': function(newCount, oldCount) {
      if (newCount > oldCount) {
        // Добавляем пустых авторов
        for (let i = oldCount; i < newCount; i++) {
          this.newBook.authors.push({ firstname: '', lastname: '', patronymic: '' });
        }
      } else {
        // Удаляем лишних авторов
        this.newBook.authors.splice(newCount);
      }
    }
  },

  methods: {
    // Логика сохранения пароля
    savePassword() {

    },
    deleteBookfromData(bookId) {
      if (!this.isAdmin) {
        alert('Вы не имеете права администратора для выполнения этой операции.');
        return;
      }
      // Подтверждение удаления
      if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
        this.books = this.books.filter(book => book.id !== bookId);
      }
    },
    // Удаление книги из сохраненного
    deleteBook(id) {
      this.savedBooks = this.savedBooks.filter(book => book.id !== id);
    },
    // Методы для управления новостями и мероприятиями
    createNewsEvent() {
      // Логика создания новости/мероприятия
    },
    editNewsEvent(index) {
      // Логика редактирования новости/мероприятия
    },
    deleteNewsEvent(index) {
      // Логика удаления новости/мероприятия
    },
    // Методы для управления книгами
    addBook() {
      // Логика добавления книги
    },
    // Методы для обработки заявок
    approveRequest(index) {
      // Логика одобрения заявки
      this.bookingRequests.splice(index, 1); // Удаляем одобренную заявку из списка
    },
    rejectRequest(index) {
      // Логика отклонения заявки
      this.bookingRequests.splice(index, 1); // Удаляем отклоненную заявку из списка
    },

    // добавление фото для новости
    handleFileChange(event) {
      this.news.photo = event.target.files[0];
    },

    FormBookAdd() {
      // Отправка данных на сервер
      console.log('Отправка данных на сервер:', {
        bookTitle: this.bookTitle,
        authors: this.authors,
        genres: this.genres
      });
    },

    async submitFormNews() {
      try {
        const formData = new FormData();
        formData.append('title', this.news.title);
        formData.append('content', this.news.text);
        formData.append('date', this.news.date);
        formData.append('photo', this.news.photo);

        const response = await fetch('url/to/your/api', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          // Дополнительные действия при успешной отправке
          console.log('Новость успешно добавлена!');
        } else {
          console.error('Ошибка при отправке данных на сервер');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    },

    async submitFormEvents() {
      try {
        const formData = new FormData();
        formData.append('title', this.news.title);
        formData.append('content', this.news.text);
        formData.append('date', this.news.date);
        formData.append('photo', this.news.photo);

        const response = await fetch('url/to/your/api', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          // Дополнительные действия при успешной отправке
          console.log('Новость успешно добавлена!');
        } else {
          console.error('Ошибка при отправке данных на сервер');
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    },

    async refreshCount() {},

    async refreshOrderBooks() {},
  }
};
</script>

<style scoped>
.section-title {
  font-size: 24px;
  color: #203156;
  margin: 0;
  text-align: left;
  font-family: 'IBM Plex Serif', serif;
  font-weight: 600;
  display: inline-block;
}
.admin-panel {
  text-align: left;
  margin-bottom: 36px;
}
.section {
  margin-bottom: 16px;
  max-width: 800px;
  border: #aebccb 1px solid;
  border-radius: 8px;
  padding: 16px 36px 10px 36px;
  background-color: #ffffff;
}
.section p {
  color: #182542;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.button {
  background-color: #9db9d3;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 16px;
  margin-bottom: 10px;
  cursor: pointer;
}
.button:hover {
  background-color: #182542;
  color: white;
}
.book-info p {
  margin-bottom: 0;
}
.book-form {
  input.inp {
    min-width: 250px;
  }
}
.action-button {
  background-color: #9dd3b6;
  margin-left: 32px;
}
.action-button.delete {
  background-color: #ffadad;
}
.action-button:hover {
  background-color: #3b805b;
  color: white;
}
.action-button.delete:hover {
  background-color: #e13535;
  color: white;
}
.booking-request {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-top: 8px;
}
.booking-request p{
  font-size: 1rem;
}
p.statistics {
  font-size: 1rem;
  display: inline-block;
}
</style>