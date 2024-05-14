<script setup>
import {useI18n} from 'vue-i18n';
const { t } = useI18n({useScope: 'global'});
</script>

<template>
  <div v-if="authorized" class="profile">
    <div class="text">{{ t('profile.prof') }}</div>
    <div class="user-profile">
      <div class="profile-info">
        <img src="../assets/profile-icon.png" alt="Profile" class="profile-image">
        <div class="user-details">
          <div class="users">{{ user.firstName }} {{ user.lastName }}</div>
          <p>Логин: {{ user.username }}</p>
        </div>
      </div>
      <button class="change-password-button" @click="showChangePasswordForm = !showChangePasswordForm">
        <p>{{ t('profile.change') }}</p>
      </button>
    </div>
    <div v-if="showChangePasswordForm" class="change-password-form">
      <div class="text">{{ t('profile.change') }}</div>
      <div class="password-form">
        <input type="password" v-model="newPassword" :placeholder=" t('profile.placeholder1') ">
        <input type="password" v-model="repeatPassword" :placeholder=" t('profile.placeholder2') ">
        <button @click="savePassword" class="save-button">{{ t('profile.saveButton') }}</button>
      </div>
    </div>
    <div v-if="!admin" class="text">{{ t('profile.saved') }}</div>
    <div v-if="!admin" class="book-list">
        <div v-for="book in savedBooks" :key="book.id" class="book">
          <img src="../assets/book-icon.png" alt="Book" class="book-image">
          <div class="book-details">
            <p style="padding-bottom: 12px; font-weight: bold">{{ book.title }}</p>
            <p v-if="Array.isArray(book.author)">
            <span v-for="(author, index) in book.author" :key="index">
              {{ author.firstname }} {{ author.patronymic }} {{ author.lastname }} <br>
            </span>
            </p>
            <p v-else>
              {{ book.author.firstname }} {{ book.author.patronymic }} {{ book.author.lastname }}
            </p>
          </div>
          <button @click="deleteBook(book.id)" class="delete-button">
            <img src="../assets/delete-icon.png" alt="Delete">
          </button>
          <button @click="bookedBook(book.id)" >
            <img src="../assets/booked-icon.png" alt="" title="Забронировать книгу">
          </button>
          <button @click="readBook(book.id)" >
            <img src="../assets/read-icon.png" alt="" title="Чтение книги" style="height: 44px; width: 44px">
          </button>
        </div>
    </div>
    <div v-if="!admin" class="text">Забронированные книги</div>
    <div v-if="!admin" class="booked-list">
      <div v-for="book in reservedBooks" :key="book.id" class="book">
        <img src="../assets/book-icon.png" alt="Book" class="book-image">
        <div class="book-details">
          <p>{{ book.title }}</p>
          <p>{{ book.authors.join(', ') }}</p>
        </div>
        <div class="status">{{ book.status }}</div>
      </div>
    </div>

    <AdminPanel v-if="admin" />
  </div>

  <div v-else class="not-authorized">
    <img src="../assets/notauthorized.png">
    <div>{{ t('messages.notautorized') }}</div>
  </div>

</template>

<script>
import AdminPanel from './AdminPanel.vue'; // Импорт компонента админ-панели

export default {
  name: "PdfViewer",
  props: { docPath: String },
  components: {
    AdminPanel // Регистрация компонента админ-панели
  },
  data() {
    return {
      user: {
        firstName: 'Алина',
        lastName: 'Каюмова',
        username: 'username'
      },
      savedBooks: [
        {
          id: 1,
          title: 'Мастер и Маргарита',
          author: { firstname: 'Михаил', patronymic: 'Афанасьевич', lastname: 'Булгаков' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        },
        {
          id: 2,
          title: 'Война и мир',
          author: { firstname: 'Лев', patronymic: 'Николаевич', lastname: 'Толстой' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        },
        {
          id: 3,
          title: 'Преступление и наказание',
          author: { firstname: 'Федор', patronymic: 'Михайлович', lastname: 'Достоевский' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        },
        {
          id: 4,
          title: 'Братья Карамазовы',
          author: { firstname: 'Федор', patronymic: 'Михайлович', lastname: 'Достоевский' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        },
        {
          id: 5,
          title: 'Анна Каренина',
          author: { firstname: 'Лев', patronymic: 'Николаевич', lastname: 'Толстой' },
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        },
        {
          id: 6,
          title: 'Автоматизированные библиотечно-информационные системы России: состояние, выбор, внедрение и развитие',
          author: [
            { firstname: 'Яков', patronymic: 'Леонидович', lastname: 'Шрайберг' },
            { firstname: 'Феликс', patronymic: 'Семёнович', lastname: 'Воройский' }],
          pdfUrl: 'https://drive.google.com/file/d/1DC55qfXIsvgw3Zko-oxzZheRoZq9Zepg/view?usp=sharing',
        }
      ],
      showChangePasswordForm: false,
      newPassword: '',
      repeatPassword: '',
      admin: false, // роль пользователя
      authorized: true, // признак что пользователь авторизовался

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
        { title: 'Книга 1', author: 'Автор 1' },
        { title: 'Книга 2', author: 'Автор 2' }
      ],
      bookingRequests: [
        { surname: 'Фамилия1', name: 'Имя1', book: 'Книга 1' },
        { surname: 'Фамилия2', name: 'Имя2', book: 'Книга 2' }
      ],
      totalUsers : 100, // Количество пользователей
      requestsCount : 50, // Количество заявок
      startDateNews: '', // Начальная дата
      endDateNews: '', // Конечная дата
      startDateEvents: '', // Начальная дата
      endDateEvents: '',// Конечная дата
      showModal: false,

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
      bookTitle: '',
      authorCount: 1, // Изначально один автор
      genreCount: 1, // Изначально один жанр
      authors: [{ firstname: '', lastname: '', patronymic: '' }], // Массив для данных об авторах
      genres: [''], // Массив для данных о жанрах

      // забронированные книги
      reservedBooks: [
        { id: 1,
          title: 'Анна Каренина',
          authors: ['Лев Николаевич Толстой'],
          status: 'Забронировано'
        },
        { id: 2,
          title: 'Автоматизированные библиотечно-информационные системы России: состояние, выбор, внедрение и развитие',
          authors: ['Яков Леонидович Шрайберг', 'Феликс Семёнович Воройский'],
          status: 'Забронировано'
        }
      ]

    };
  },
  mounted() {

  },
  computed: {

  },

  watch: {

  },

  methods: {
    // Логика сохранения пароля
    savePassword() {

    },
    // Удаление книги из сохраненного
    deleteBook(id) {
      this.savedBooks = this.savedBooks.filter(book => book.id !== id);
    },
    bookedBook() {

    },
    readBook(bookId) {
      const book = this.savedBooks.find(b => b.id === bookId);
      if (book && book.pdfUrl) {
        window.open(book.pdfUrl, '_blank');
      } else {
        console.error('Book URL not found!');
      }
    },
  }
};
</script>

<style scoped>
@media (max-width: 500px) {
 .profile {
   padding: 20px 0!important;
   margin-left: 20px!important;
   font-size: 14px;
 }
  .user-profile {
    min-width: 90vw;
  }
  .book {
    min-width: 86vw;
  }
  .profile-image {
    max-width: 48px;
    max-height: 48px;
    margin-top: 8px;
  }
  .user-details {
    margin-left: 10px!important;
  }
  .save-button {
    padding: 10px!important;
  }
  .text {
    font-size: 16px!important;
  }
}
.change-password-form input {
  height: 48px;
  border: none;
  border-radius: 8px 8px 0 0;
  border: 0px;
  border-bottom: solid #203156 1px;
  padding-left: 10px;
  background-color: transparent;
  transition: background-color 0.3s ease;
  min-width: 300px;
}
.change-password-form input:hover,
.change-password-form input:focus, .change-password-form input:active {
  background-color: #EAF1FB;
  border-bottom: solid #182542 0 0 1px 0;
}
.profile {
  max-width: 90vw;
  margin: 0 auto 0 40px;
  padding: 20px 10px;
}
.user-profile {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 50vw;
  align-items: flex-start;
}
.profile-info {
  display: flex;
  align-items: flex-start;
  max-width: max-content;
}
.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 10px;
}
.user-details {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 40px;
  margin-top: 10px;
}
.change-password-button {
  background-color: #9db9d3;
  color: white;
  border: none;
  border-radius: 8px;
  height: 48px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}
.change-password-button p{
  line-height: 1;
  margin: auto 0;
}
.change-password-form {
  margin-top: 20px;
}
.password-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40vw;
  margin: 10px auto 20px 0;
}
.save-button {
  height: 48px;
  border-radius: 8px;
  background-color: #9db9d3;
  color: white;
  border: none;
  margin: 0 auto;
  padding: 10px 20px;
}
.book-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 90vw;
  align-items: start;
  p {
    margin: 0;
  }
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
  max-height: max-content!important;
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
.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.delete-button img {
  width: 20px;
  height: 20px;
}
.text {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 0 auto 10px 20px;
}
.not-authorized {
  margin: 80px auto;
  font-weight: bold;
  font-size: 20px;
}

</style>