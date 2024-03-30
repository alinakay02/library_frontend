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
        {{ t('profile.change') }}
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
    <div v-if="admin" class="admin-panel">
      <p>Панель администратора</p>
      <div></div>
      <div></div>
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
        firstName: 'John',
        lastName: 'Doe',
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
    };
  },
  methods: {
    // Логика сохранения пароля
    savePassword() {

    },
    // Удаление книги из сохраненного
    deleteBook(id) {
      this.savedBooks = this.savedBooks.filter(book => book.id !== id);
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
}
.book {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EAF1FB;
  border-radius: 8px;
  padding: 4px;
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
</style>