<script setup>
import {useI18n} from 'vue-i18n';

const { t } = useI18n({useScope: 'global'});
</script>

<template>
  <div class="custom-signup">
    <p class="info-color white-text text-center py-4">
      <strong>{{ t('register.title') }}</strong>
    </p>
    <div class="card-body px-lg-5 pt-0">
      <form class="text-center" style="color: #757575;" @submit.prevent="registerUser">
        <div class="form-row">
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormFirstName">{{ t('register.fname') }}</label>
              <input type="text" id="materialRegisterFormFirstName" class="form-control" v-model="user.name" required>
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.lname') }}</label>
              <input type="text" id="materialRegisterFormLastName" class="form-control" v-model="user.surname" required>
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.patronymic') }}</label>
              <input type="text" id="materialRegisterFormPatronymic" class="form-control" v-model="user.patronymic">
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.cardId') }}</label>
              <input type="text" id="materialRegisterFormcardId" class="form-control" v-model="user.cardId">
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.username') }}</label>
              <input type="text" id="materialRegisterFormUsername" class="form-control" v-model="user.login" required>
            </div>
          </div>
        </div>
        <div class="md-form">
          <label for="materialRegisterFormPassword" class="active">{{ t('register.password') }}</label>
          <input type="password" id="materialRegisterFormPassword" class="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock" v-model="user.password" required>
          <small id="materialRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4" >
            {{ t('register.info') }}
          </small>
        </div>
        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">{{ t('register.title2') }}</button>
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
        name: '',
        surname: '',
        patronymic: '',
        cardId: '',
        login: '',
        password: '',
      }
    };
  },
  methods: {
    // Метод отправки формы регистрации на сервер
    registerUser() {
      axios.post('http://localhost:8084/users/register', this.user)
          .then(response => {
            console.log('User registered:', response);
            this.showAlertSuccess('Регистрация прошла успешно.');
            this.$router.push({ path: '/login' });
          })
          .catch(error => {
            if (error.response) {
              // Проверяем, что есть объект data и в нем есть message
              if (error.response.status === 400 && error.response.data && error.response.data.message && error.response.data.message.includes("User already exists")) {
                this.showAlert('Пользователь с таким логином уже существует');
              } else {
                // Обработка других типов ошибок
                this.showAlert('Ошибка регистрации: ' + (error.response.data.message || "Неизвестная ошибка"));
              }
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
    },

    // Метод для кастомного вывода сообщения об успешной регистрации
    showAlertSuccess(text){
      Swal.fire({
        title: null,
        text: text,
        icon: "success",
        confirmButtonText: 'OK'
      });
    }
  }
};
</script>
<style scoped>
@media (max-width: 500px) {
  .custom-signup  {
    max-width: 80vw;
    font-size: 14px;
  }
}
.custom-signup {
  width: 600px;
  margin: 0 auto;
}
</style>