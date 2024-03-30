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
      <form class="text-center" style="color: #757575;">
        <div class="md-form">
          <label for="materialLoginFormEmail" class="active">{{ t('login.username') }}</label>
          <input type="text" id="materialLoginFormLogin" class="form-control">
        </div>
        <div class="md-form">
          <label for="materialLoginFormPassword" class="active">{{ t('login.password') }}</label>
          <input type="password" id="materialLoginFormPassword" class="form-control">
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
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      // Логика для отправки данных формы на сервер и обработки ответа
    }
  }
};
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
