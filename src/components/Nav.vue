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
    <div class="nav-str">
      <div class="navbar-top">
        <div class="top-block" >
          <button class="lang top-btn " @click="toggleDropdown()">
<!--            {{ t('buttons.selectlang') }}-->
            <img src="../assets/en.png" alt="" title="English" style="height: 24px; width: 24px; margin-right: 10px">
            <img src="../assets/ru.png" alt="" title="Русский" style="height: 24px; width: 24px; margin-right: 10px">
            <img src="../assets/uz.png" alt="" title="O'zbek" style="height: 24px; width: 24px">
          </button>
            <ul v-if="isDropdownVisible"
                class="dropdown-list"
                @mouseover="showDropdown"
                @mouseleave="hideDropdown"
            >
              <li v-for="language in languages" :key="language" @click="switchlang(language); isDropdownVisible = false;" style="min-width: 70px">{{ language }}</li>
            </ul>
          <a href="#/login" class="top-btn">{{ t('buttons.login') }}</a>
          <a href="#/signup" class="top-btn">{{ t('buttons.registr') }}</a>
        </div>
      </div>
      <div class="navigate-block">
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
      isDropdownVisible: false,
      showLoginModal: false,
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
  },

  mounted () {
  },
}
</script>

<style>
@media (max-width: 720px) {
  .nav-block, .top-btn {
    font-size: 10px;
  }

  .dropdown-list {
    min-width: 20vw!important;
  }
  button.top-btn {
    padding: 7px 7px 7px 0!important;
    min-width: 103px!important;
  }
  a.top-btn {
    padding: 7px 8px;
  }

}

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
  z-index: 10000;
  width: 9vw;
  min-width: 70px;
  outline: none;
}
.dropdown-list li {
  cursor: pointer;
  padding: 8px 0px;
  z-index: 10;
}
.dropdown-list li:hover {
  background-color: #d2d7e5;
}
.navbar-top {
  width: calc(100vw - 8px);
  display: flex;
  padding: 0;
  margin: 0;
  font-family: 'IBM Plex Serif', serif;
  background-color: #f9fcff;
}
.top-block {
  display: flex;
  width: fit-content;
  font-size: 12px;
  background-color: #f9fcff;
  margin: 0 0 0 auto;
}
.top-btn {
  float: right;
  padding: 7px 15px 7px 0;
  color: #203156;
  border: none;
  cursor: pointer;
  background-color: #f9fcff;
  text-decoration: none;
  font-family: 'IBM Plex Serif', serif;
  font-weight: bold;
}
.top-btn:hover {
  background-color: #d2d7e5;
}
.nav-str {
  position: sticky;
  padding: 0;
  margin: 0;
  top: 0;
}
.navigate-block {
  display: flex;
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
  font-family: 'IBM Plex Serif', serif;
}
.nav-block:hover {
  background-color: #436591;
}
</style>