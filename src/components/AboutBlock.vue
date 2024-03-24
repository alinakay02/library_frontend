<script setup>
import {useI18n} from 'vue-i18n';

const { t, locale } = useI18n({useScope: 'global'});
</script>

<template>
<div class="about">
  <div><p class="title">{{t('about.title')}}</p></div>
  <br>
  <div class="article">
    <p class="first"> {{t('about.article1')}} </p>
    <p> {{t('about.article2')}} </p>
    <p> {{t('about.article3')}} </p>
  </div>
</div>
</template>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
  color: #203156;
  text-align: left;
  margin-bottom: 8px;
}
.article {
  font-size: 18px;
  font-weight: 300;
  color: #2c3e50;
  text-align: justify;
  text-indent: 40px;
}
.about{
  padding: 40px;
  margin-bottom: 50px;
}
.article p {
  padding: 0;
  margin: 10px 0 0 0;
}
.first {
  margin-top: 10px;
}
</style>