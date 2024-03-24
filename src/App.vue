<template>
  <NavPanel class="NavPanel" />
  <AboutBlock/>
  <div v-if="activity">
    <ActivityBlock/>
  </div>

  <footer>
    <div style="background-color: #203156; height: 90px">
    </div>
  </footer>
</template>

<script>
import NavPanel from './components/Nav.vue'
import AboutBlock from './components/AboutBlock.vue'
import ActivityBlock from "@/components/ActivityBlock.vue";
export default {
  name: 'App',
  components: {
    ActivityBlock,
    NavPanel,
    AboutBlock
  },
  data() {
    return {
      activity: false
    }
  },
  methods: {
    updateActivity(value) {
      this.activity = value;
    }
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
</style>
