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
          <button class="top-btn">{{ t('buttons.login') }}</button>
          <button class="top-btn">{{ t('buttons.registr') }}</button>
        </div>
      </div>
      <div class="navbar">
        <div :class="['nav-block']" @click="handleClick(t('blocks.about'))">{{ t('blocks.about')}}</div>
        <div :class="['nav-block']" @click="handleClick(t('blocks.activity'))">{{ t('blocks.activity')}}</div>
        <div :class="['nav-block']" @click="handleClick(t('blocks.news'))">{{ t('blocks.news')}}</div>
        <div :class="['nav-block']" @click="handleClick(t('blocks.mylib'))">{{ t('blocks.mylib')}}</div>
        <div :class="['nav-block']" @click="handleClick(t('blocks.search'))">{{ t('blocks.search')}}</div>
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
    handleClick(block){
      switch (block) {
        case 'about':
          this.about = true;
          break;
        case 'activity':
          this.activity = true;
          this.$emit('update-activity', this.activity);
          console.log(this.activity);
          break;
        case 'news':
          this.news = true;
          break;
        case 'mylib':
          this.mylib = true;
          break;
        case 'search':
          this.search = true;
          break;
        default:
          this.about = false;
          this.activity = false;
          this.news = false;
          this.mylib = false;
          this.search = false;
          break;
      }
    },
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
}
.nav-block:hover {
  background-color: #436591;
}
</style>