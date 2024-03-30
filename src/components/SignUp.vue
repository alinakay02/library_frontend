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
      <form class="text-center" style="color: #757575;">
        <div class="form-row">
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormFirstName">{{ t('register.fname') }}</label>
              <input type="text" id="materialRegisterFormFirstName" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.lname') }}</label>
              <input type="text" id="materialRegisterFormLastName" class="form-control">
            </div>
          </div>
          <div class="col">
            <div class="md-form">
              <label for="materialRegisterFormLastName">{{ t('register.username') }}</label>
              <input type="text" id="materialRegisterFormUsername" class="form-control">
            </div>
          </div>
        </div>
        <div class="md-form">
          <label for="materialRegisterFormPassword" class="active">{{ t('register.password') }}</label>
          <input type="password" id="materialRegisterFormPassword" class="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock">
          <small id="materialRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
            {{ t('register.info') }}
          </small>
        </div>
        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">{{ t('register.title2') }}</button>
      </form>
    </div>
  </div>
</template>

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