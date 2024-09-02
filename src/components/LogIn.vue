<script setup>
import {useI18n} from 'vue-i18n';
const { t } = useI18n({useScope: 'global'});
</script>

<template>
  <div class="custom-login-form">
    <p class="info-color white-text text-center py-4">
      <strong>{{ t('login.title') }}</strong>
    </p>
    <div class="card-body px-lg-5 pt-0">
      <form class="text-center" style="color: #757575;" @submit.prevent="submitForm">
        <div class="md-form">
          <label for="materialLoginFormEmail" class="active">{{ t('login.username') }}</label>
          <input type="text" id="materialLoginFormLogin" class="form-control" v-model="user.login" required>
        </div>
        <div class="md-form">
          <label for="materialLoginFormPassword" class="active">{{ t('login.password') }}</label>
          <input type="password" id="materialLoginFormPassword" class="form-control" v-model="user.password" required>
        </div>
        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">{{ t('login.title2') }}</button>
        <p>{{ t('login.notmem') }}
          <a href="#/signup">{{ t('login.registr') }}</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      user: {
        login: '',
        password: '',
      },
    };
  },
  methods: {
    // Метод отправки формы для авторизации на сервер
    submitForm() {
      axios.post('http://localhost:8084/users/authenticate', this.user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(response => {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('role', response.data.role);
            sessionStorage.setItem('userId', response.data.userId);
            this.$router.push({ path: '/mylib' });
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              this.showAlert("Пользователь с таким логином не найден!");
            } else if (error.response && error.response.status === 401) {
              this.showAlert("Неверный пароль!");
            } else {
              this.showAlert("Ошибка связи с сервером");
            }
          });
    },
    // Метод для кастомного вывода сообщений об ошибках
    showAlert(errorMsg) {
      Swal.fire({
        title: 'Ошибка!',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
</script>

<style scoped>
@media (max-width: 500px) {
  .custom-login-form {
    max-width: 80vw;
    font-size: 14px;
  }
}
.custom-login-form {
  width: 600px;
  margin: 0 auto;
}
.md-form {
  margin-bottom: 10px;
}
</style>
