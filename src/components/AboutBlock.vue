<script setup>
import {useI18n} from 'vue-i18n';

const { t, locale } = useI18n({useScope: 'global'});
</script>

<template>
<div class="about">
  <div><p class="title">{{t('about.title')}}</p></div>
  <br>
  <div class="content-container">
    <div class="image">
      <img src="../assets/эмблема.jpg" alt="About Image">
    </div>
    <div class="text">
      <div class="article">
        <p class="first">{{ t('about.article1') }}</p>
        <p>{{ t('about.article2') }}</p>
        <p>{{ t('about.article3') }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@media (min-width: 2000px) {
  .article p {
    max-width: 60vw!important;
  }
}
@media (max-width: 500px) {
  .title {
    font-size: 19px!important;
  }
  .article p{
    font-size: 14px!important;
  }
  .content-container {
    flex-direction: column;
  }
  .image,
  .text {
    min-width: 80vw;
    margin-right: 0; /* Убираем отступ между изображением и текстом */
  }
}
.content-container {
  display: flex;
}
.image {
  flex: 1;
  margin-right: 20px;
  max-width: 30vw;
}
img {
  height: 300px;
  width: 300px;
}
.text {
  flex: 1; /* Текст занимает всю доступную ширину */
  max-width: 60vw;
}
.title {
  font-size: 30px;
  font-weight: 500;
  color: #203156;
  text-align: left;
  margin: 0px;
}
.article {
  font-size: 18px;
  font-weight: 300;
  color: #2c3e50;
  text-align: justify;
  text-indent: 40px;
  margin: 0;
}
.about{
  padding: 0 40px;
  margin-bottom: 50px;
  margin-top: 30px;
  max-width: 100vw;
}
.article p {
  padding: 0;
  margin: 10px 0 0 0;
  max-width: 80vw;
}
.first {
  margin-top: 10px;
}
</style>