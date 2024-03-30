<script setup>
import {useI18n} from 'vue-i18n';

const { t, locale } = useI18n({useScope: 'global'});

const switchlang = (lang) => {
  switch (lang) {
    case 'Русский':
      locale.value = 'ru';
      break;
    case 'English':
      locale.value = 'en';
      break;
    case 'O\'zbek':
      locale.value = 'uz';
      break;
  }
  localStorage.setItem('lang', locale.value);
}
</script>
<template>
  <div>
    <div class="nav">
      <div class="navbar-top">
        <div class="pre-block"></div>
        <div class="top-block">
          <button class="top-btn" @click="toggleDropdown()">{{ t('buttons.selectlang') }}</button>
          <ul v-show="isDropdownVisible" class="dropdown-list">
            <li v-for="language in languages" :key="language" @click="switchlang(language); isDropdownVisible = false;">{{ language }}</li>
          </ul>
          <a href="#/login" class="top-btn">{{ t('buttons.login') }}</a>
          <a href="#/signup" class="top-btn">{{ t('buttons.registr') }}</a>
        </div>
      </div>
      <div class="navbar">
        <a href="#/about" class="nav-block">{{ t('blocks.about') }}</a>
        <a href="#/activity" class="nav-block">{{ t('blocks.activity') }}</a>
        <a href="#/news" class="nav-block">{{ t('blocks.news') }}</a>
        <a href="#/mylib" class="nav-block">{{ t('blocks.mylib') }}</a>
        <a href="#/search" class="nav-block">{{ t('blocks.search') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavPanel',

  data() {
    return {
      blocks: ['О библиотеке', 'Деятельность', 'Новости', 'Моя библиотека', 'Поиск'],
      activeBlock: null,
      activity: false,
      about: false,
      news: false,
      mylib: false,
      search: false,
      languages: ['Русский', 'English', 'O\'zbek'],
      isDropdownVisible: false
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
  }
}
</script>

<style scoped>
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #eef3ff;
  border: 0 1px 1px 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 9vw;
}

.dropdown-list li {
  cursor: pointer;
  padding: 8px 12px;
}
.dropdown-list li:hover {
  background-color: #d2d7e5;
}

.navbar-top {
  width: calc(100vw - 8px);
  display: flex;
  padding: 0;
  margin: 0;
}
.pre-block {
  background-color: #eef3ff;
  width: 73vw;
}
.top-block {
  display: flex;
  width: 27vw;
  float: right;
  font-size: 12px;
  position: relative;
}
.top-btn {
  float: right;
  padding: 7px 15px 7px 0;
  color: #203156;
  border: none;
  cursor: pointer;
  min-width: fit-content;
  width: 9vw;
  background-color: #eef3ff;
  text-decoration: none;
}
.top-btn:hover {
  background-color: #d2d7e5;
}
.nav {
  position: sticky;
  padding: 0;
  margin: 0;
  top: 0;
}
.navbar {
  display: flex;
  width: calc(100vw - 8px);

}
.nav-block {
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #203156;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}
.nav-block:hover {
  background-color: #436591;
}
</style>