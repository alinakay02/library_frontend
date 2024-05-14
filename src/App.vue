<template>
  <div class="main-content">
    <NavPanel class="NavPanel" />
    <router-view></router-view>
  </div>

  <footer class="custom-footer"><FooterComponent></FooterComponent></footer>
</template>

<script>
import NavPanel from './components/Nav.vue'
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: {
    NavPanel,
    FooterComponent
  },
  data() {
    return {
      activity: false
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f9fcff;
}
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* Цвет самой прокрутки */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
}

/* Указывает, что нужно скрыть полосу прокрутки */
body {
  margin: 0;
  scrollbar-width: thin; /* Для Firefox */
  -ms-overflow-style: none; /* Для Internet Explorer и Edge */
}

/* Скрытие полосы прокрутки */
::-webkit-scrollbar-thumb {
  display: none; /* Для WebKit (Chrome, Safari, Opera) */
}
.NavPanel {
  position: sticky;
  top: 0;
}
.main-content {
  min-height: calc(100vh - 130px);
}
.custom-footer {
  position: relative;
  bottom: 0;
}
</style>
