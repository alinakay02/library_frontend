<script setup>
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import { useRouter } from 'vue-router';
</script>

<template>
  <div class="activ-list">
    <div v-for="item in activity" :key="item.id" class="activ-wrapper" @click="openActivity(item.id)">
      <div class="image">
        <img :src="item.image" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px" class="activity-image">
      </div>
      <div class="activ-name">
        <div style="height: max-content" class="content">
          <p style="font-weight: 530; font-size: 16px; text-align: left">{{ item.title }}</p>
          <p style="color: #5c7d9d; font-size: 14px; text-align: right" class="date">{{ item.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emblem1 from '@/assets/activity1.png';
import emblem2 from '@/assets/activity2.png';
import emblem3 from '@/assets/img.png';
import emblem4 from '@/assets/эмблема.jpg';
export default {
  data() {
    return {
      activity: [
        {
          id: 1,
          title: 'Центральная Азия-2024: Интернет и информационно-библиотечные ресурсы в науке, образовании, культуре и бизнесе ',
          date: '2024-05-17',
          image: emblem1,
          content: 'Полное описание события 1'
        },
        {
          id: 2,
          title: '10 мая - День рождения выдающегося узбекского писателя Гафура Гуляма',
          date: '2024-05-10',
          image: emblem2,
          content: 'Гафур Гулям (родился 10 мая 1903 г., умер 10 июля 1966 г.) - Великий узбекский писатель и поэт. \n' +
              '\n' +
              'Осиротев в девять лет от отца и в пятнадцать от матери, Гафур Гулам получил образование сначала в старой школе, а затем в русско-туземной школе. \n' +
              '\n' +
              'В автобиографической повести "шум бала" (1936) отчетливо изображено детство художника, жизнь Ташкента начала века.'
        },
        {
          id: 3,
          title: 'Неделя чтения с 27.05 по 02.06',
          date: '2024-07-20',
          image: emblem3,
          content: 'Полное описание события 3'
        },
        {
          id: 4,
          title: '27-28 мая Управлением информации и массовых коммуникаций города Ташкента будет проведен семинар "Девиз книголюбов"',
          date: '2024-07-27',
          image: emblem4,
          content: 'Полное описание события 3'
        }
      ],
      CurrMonthEvents : [
        {
          id: 1,
          title: 'Неделя чтения с 21.06 по 28.06',
          date: '2024-06-27',
          image: emblem3,
          content: 'Полное описание события 3'
        },
        {
          id: 2,
          title: '15 июня Управлением информации и массовых коммуникаций города Ташкента будет проведен семинар "Девиз книголюбов"',
          date: '2024-06-15',
          image: emblem4,
          content: 'Полное описание события 3'
        }
      ],
    };
  },
  methods: {
    openActivity(id) {
      this.$router.push({ name: 'activity-details', params: { id } });
    }
  }
};
</script>

<style scoped>
.activ-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px;
}
.activ-wrapper {
  margin: 20px;
  box-shadow: 1px 1px 2px #9db9d3;
  border-radius: 8px;
  width: 40vw;
  max-width: 900px;
  min-width: 350px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  background-color: white;
  max-height: max-content!important;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
}

.activ-wrapper:hover {
  box-shadow: 1px 1px 4px #5c7d9d;
  transform: translateY(-10px);
}

.activ-name {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.date {
  margin-top: auto;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  max-height: 500px;
  max-width: 600px;
  overflow: hidden;
  margin-bottom: 16px;
}
.activity-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>