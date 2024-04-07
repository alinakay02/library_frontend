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
          <p>Username: {{ user.username }}</p>
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
    <div class="text">{{ t('profile.saved') }}</div>
    <div class="book-list">
      <div v-for="book in savedBooks" :key="book.id" class="book">
        <img src="../assets/book-icon.png" alt="Book" class="book-image">
        <div class="book-details">
          <p>{{ book.title }}</p>
          <p>{{ book.author }}</p>
        </div>
        <button @click="deleteBook(book.id)" class="delete-button">
          <img src="../assets/delete-icon.png" alt="Delete">
        </button>
      </div>
    </div>
    <div class="text">Забронированные книги</div>
    <div class="booked-list">
      <div v-for="book in reservedBooks" :key="book.id" class="book">
        <img src="../assets/book-icon.png" alt="Book" class="book-image">
        <div class="book-details">
          <p>{{ book.title }}</p>
          <p>{{ book.authors.join(', ') }}</p>
        </div>
        <div class="status">{{ book.status }}</div>
      </div>
    </div>


    <div v-if="admin" class="admin-panel">
      <p style="font-weight: bold; font-size: 1.2rem; padding-left: 20px">Панель администратора</p>
      <div class="section event news">
        <p style="font-weight: bold">Управление новостями</p>

        <p>Добавление новости</p>
        <form @submit.prevent="submitFormNews">
          <label for="title">Заголовок:</label><br>
          <input type="text" id="title" v-model="newNews.title" required class="input-group-text" style="width: 500px; overflow-x: auto!important;"><br>

          <label for="content">Текст новости:</label><br>
          <textarea id="content" v-model="newNews.text" style="height: 350px; width: 500px; resize: none"></textarea><br>

          <label for="date">Дата:</label><br>
          <input type="date" id="date" v-model="newNews.date" class="input-group-text" required><br>

          <label for="photo">Фото:</label><br>
          <input type="file" id="photo" accept="image/*" @change="handleFileChange" class=""><br>

          <button type="submit" class="button" style="margin-top: 12px">Добавить новость</button>
        </form>

        <p>Отображение новостей</p>
        <!-- Добавленные поля для выбора диапазона дат -->
        <div class="data-container">
          <label for="startDate" style="font-size: 0.9rem">Начальная дата:</label>
          <input type="date" id="startDate" v-model="startDateNews">
          <label for="endDate" style="font-size: 0.9rem">Конечная дата:</label>
          <input type="date" id="endDate" v-model="endDateNews">
        </div>

        <div v-for="(item, index) in filteredNews" :key="index" class="list-item">
          <span>{{ item.title }}</span>
          <br>
          <span class="event-text">{{ item.text }}</span>
          <br>
          <button class="button action-button" @click="editNewsEvent(index)">Редактировать</button>
          <button class="button action-button delete" @click="deleteNewsEvent(index)">Удалить</button>
        </div>
      </div>

      <div class="section event">
        <p style="font-weight: bold">Управление мероприятиями</p>

        <p>Добавление мероприятия</p>
        <form @submit.prevent="submitFormEvents">
          <label for="title">Заголовок:</label><br>
          <input type="text" id="title" v-model="newEvent.title" class="input-group-text" required style="width: 500px; overflow-x: auto"><br>

          <label for="content">Текст мероприятия:</label><br>
          <textarea id="content" v-model="newEvent.text" required style="height: 350px; width: 500px; resize: none"></textarea><br>

          <label for="date">Дата:</label><br>
          <input type="date" id="date" v-model="newEvent.date" class="input-group-text" required><br>

          <label for="photo">Фото:</label><br>
          <input type="file" id="photo" accept="image/*" @change="handleFileChange" class="input-photo"><br>

          <button type="submit" class="button" style="margin-top: 12px">Добавить мероприятие</button>
        </form>

        <!-- Добавленные поля для выбора диапазона дат -->
        <p>Отображение мероприятий</p>
        <div class="data-container">
          <label for="startDate" style="font-size: 0.9rem">Начальная дата:</label>
          <input type="date" id="startDate" v-model="startDateEvents">
          <label for="endDate" style="font-size: 0.9rem">Конечная дата:</label>
          <input type="date" id="endDate" v-model="endDateEvents">
        </div>

        <div v-for="(item, index) in filteredEvents" :key="index" class="list-item">
          <span>{{ item.title }}</span>
          <br>
          <span class="event-text">{{ item.text }}</span>
          <br>
          <button class="button action-button" @click="editNewsEvent(index)">Редактировать</button>
          <button class="button action-button delete" @click="deleteNewsEvent(index)">Удалить</button>
        </div>
      </div>
      <div class="section2">
        <p style="font-weight: bold">Управление книгами</p>

        <form @submit.prevent="FormBookAdd">
          <label for="book_title" >Наименование книги:</label><br>
          <input type="text" v-model="bookTitle" style="width: 400px;" required><br>

          <label>Количество авторов:</label><br>
          <input type="number" v-model="authorCount" min="1" required><br>

          <div v-for="index in authorCount" :key="index" style="display: inline-block; padding: 8px 8px 0px 0">
            <label>Автор {{ index }}:</label><br>
            <input type="text" v-model="authors[index-1].firstname" placeholder="Имя" style="width: 300px; margin-bottom: 8px" required><br>
            <input type="text" v-model="authors[index-1].lastname" placeholder="Фамилия" style="width: 300px; margin-bottom: 8px" required><br>
            <input type="text" v-model="authors[index-1].patronymic" placeholder="Отчество" style="width: 300px; margin-bottom: 8px" ><br>
          </div><br>

          <label>Количество жанров:</label><br>
          <input type="number" v-model="genreCount" min="1" required><br>

          <div v-for="index in genreCount" :key="index" style="display: inline-block; padding: 8px 8px 8px 0">
            <label>Жанр {{ index }}:</label><br>
            <input type="text" v-model="genres[index-1]" required><br>
          </div><br>

          <input type="submit" value="Добавить книгу" class="button" style="margin-bottom: 24px; padding: 8px 16px; border-radius: 8px">
        </form>

      </div>

      <div class="section">
        <p style="font-weight: bold">Обработка заявок на бронирование</p>
        <div v-for="(request, index) in bookingRequests" :key="index" class="booking-request">
          <p>{{ request.surname }} {{ request.name }} подал заявку на бронирование книги "{{ request.book }}"</p>
          <button class="button action-button" @click="approveRequest(index)">Одобрить</button>
          <button class="button action-button delete" @click="rejectRequest(index)">Отклонить</button>
        </div>
      </div>
      <div class="section">
        <p style="font-weight: bold">Просмотр статистики</p>
        <p class="statistics">Общее количество пользователей: {{ totalUsers }}</p>
        <p class="statistics">Количество заявок за текущий год: {{ requestsCount }}</p>
      </div>
    </div>
  </div>

  <div v-else class="not-authorized">
    <img src="../assets/notauthorized.png">
    <div>{{ t('messages.notautorized') }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        username: 'johndoe'
      },
      savedBooks: [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
        { id: 3, title: 'Book 3', author: 'Author 3' },
        { id: 4, title: 'Book 4', author: 'Author 4' },
        { id: 5, title: 'Book 5', author: 'Author 5' },
        { id: 6, title: 'Book 6', author: 'Author 6' }
      ],
      showChangePasswordForm: false,
      newPassword: '',
      repeatPassword: '',
      admin: true, // роль пользователя
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
        { id: 1, title: 'Книга 1', authors: ['Автор 1', 'Автор 2'], status: 'Забронировано' },
        { id: 2, title: 'Книга 2', authors: ['Автор 3', 'Автор 4'], status: 'Забронировано' }
      ],
    };
  },
  mounted() {

  },
  computed: {
    // Фильтруем новости по выбранному диапазону дат
    filteredNews() {
      return this.news.filter(item => {
        const itemDate = new Date(item.date);
        const start = this.startDateNews ? new Date(this.startDateNews) : null;
        const end = this.endDateNews ? new Date(this.endDateNews) : null;
        // Если дата начала не выбрана, фильтруем только по дате конца
        if (!start && end) {
          return itemDate <= end;
        }
        // Если дата конца не выбрана, фильтруем только по дате начала
        if (start && !end) {
          return itemDate >= start;
        }
        // Если выбраны обе даты, фильтруем по диапазону
        return itemDate >= start && itemDate <= end;
      });
    },
    // Фильтруем мероприятия по выбранному диапазону дат
    filteredEvents() {
      return this.Events.filter(item => {
        const itemDate = new Date(item.date);
        const start = this.startDateEvents ? new Date(this.startDateEvents) : null;
        const end = this.endDateEvents ? new Date(this.endDateEvents) : null;
        // Если дата начала не выбрана, фильтруем только по дате конца
        if (!start && end) {
          return itemDate <= end;
        }
        // Если дата конца не выбрана, фильтруем только по дате начала
        if (start && !end) {
          return itemDate >= start;
        }
        // Если выбраны обе даты, фильтруем по диапазону
        return itemDate >= start && itemDate <= end;
      });
    },

  },

  watch: {
    authorCount(newVal, oldVal) {
      if (newVal > oldVal) {
        for (let i = oldVal; i < newVal; i++) {
          this.authors.push({ firstname: '', lastname: '', patronymic: '' });
        }
      } else {
        this.authors.splice(newVal);
      }
    }
  },

  methods: {
    // Логика сохранения пароля
    savePassword() {

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
      // Здесь можно отправить данные формы на сервер
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
    }
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
    min-width: 80vw;
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
  margin-right: 20px;
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
.admin-panel {
  text-align: left;
}
.section {
  margin-bottom: 20px;
  max-width: 800px;
  border: #aebccb 1px solid;
  border-radius: 8px;
  padding: 10px;
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
.list-item {
  margin-bottom: 10px;
  align-items: flex-start;
}
.event-text {
  color: #182542;
  font-size: 0.8rem;
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
  margin-top: 20px;
}
.data-container {
  #startDate {
    margin: 0 10px;
    background-color: #f6f9ff;
    border-radius: 0px;
    border: none;
    padding: 2px 4px;
  }
  #endDate {
    margin: 0 10px;
    background-color: #f6f9ff;
    border-radius: 0px;
    border: none;
    padding: 2px 4px;
  }
}

.event {
  display: inline-block;
  width: 624px;
  max-width: 700px;
}
.event.news {
  margin-right: 36px;
}
.section2 {
  max-width: 90vw;
}
.section2 {
  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 2px 8px;
  }
  label {
    font-size: 0.9rem;
  }
}

.booked-list {
  text-align: left;
}
.status {
  padding: 0 16px;
}
.booked-list {
  p {
    margin: 0;
  }
}
</style>