<script setup>
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import { useRouter } from 'vue-router';
</script>

<template>
  <p class="section-title">Мероприятия на текущий месяц</p>
  <div class="activ-list">
    <div v-for="event in currentMonthEvents" :key="event.id" class="activ-wrapper" >
      <div class="image">
        <img :src="event.image" class="activity-image">
      </div>
      <div class="activ-name">
        <div style="height: max-content" class="content">
          <p style="font-weight: 530; font-size: 16px; text-align: left" @click="openActivity(event.id)">{{ event.title }}</p>
          <p style="color: #5c7d9d; font-size: 14px; text-align: right;" class="date">{{ event.date }}
            <i v-if="admin" class="material-icons" style="cursor: pointer; margin:0 8px" @click="openEditDialog(event)">edit</i>
          </p>
        </div>
      </div>
    </div>
  </div>
  <p class="section-title">Все мероприятия</p>
  <div class="activ-list">
    <div v-for="item in nonCurrentMonthEvents" :key="item.id" class="activ-wrapper">
      <div class="image">
        <img :src="item.image" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px" class="activity-image">
      </div>
      <div class="activ-name">
        <div style="height: max-content" class="content">
          <p style="font-weight: 530; font-size: 16px; text-align: left" @click="openActivity(item.id)">{{ item.title }}</p>
          <p style="color: #5c7d9d; font-size: 14px; text-align: right" class="date">{{ item.date }}
            <i v-if="admin" class="material-icons" style="cursor: pointer; margin:0 8px" @click="openEditDialog(item)">edit</i>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно редактирования-->
    <div v-if="showEdit" class="modal">
      <form @submit.prevent="submitFormEvents">
        <label for="title">Заголовок:</label><br>
        <input type="text" id="title" v-model="newEvent.title" required style="width: 500px; overflow-y: auto; text-align: left" class="input-group-text"><br>

        <label for="content">Текст мероприятия:</label><br>
        <textarea id="content" v-model="newEvent.content" required style="height: 200px; width: 500px; resize: none; text-align: left" class="input-group-text"></textarea><br>

        <label for="date">Дата:</label><br>
        <input type="date" id="date" v-model="newEvent.date" required class="input-group-text"><br>

        <label for="photo">Фото:</label><br>
        <input type="file" id="photo" accept="image/*" @change="handleFileChange" class="input-photo"><br>

        <div class="buttons">
          <button @click="showEdit = false" class="button">Отмена</button>
          <button type="submit" class="buttonSave">Сохранить изменения</button>
        </div>
      </form>
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
          image: 'img/activity1.4449c52b.png',
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
          title: 'Неделя чтения с 21.06 по 28.06',
          date: '2024-06-27',
          image: emblem3,
          content: 'Полное описание события 3'
        },
        {
          id: 4,
          title: '15 июня Управлением информации и массовых коммуникаций города Ташкента будет проведен семинар "Девиз книголюбов"',
          date: '2024-06-15',
          image: emblem4,
          content: 'Полное описание события 3'
        }
      ],

      showEdit: false,
      newEvent: {
        title: '',
        content: '',
        date: '',
        image: null
      },
      selectedEventId: null,
      admin: true,
    };
  },
  computed: {
    currentMonthEvents() {
      const currentMonth = new Date().getMonth() + 1;
      return this.activity.filter(event => {
        const eventMonth = new Date(event.date).getMonth() + 1;
        return eventMonth === currentMonth;
      });
    },
    nonCurrentMonthEvents() {
      const currentMonth = new Date().getMonth() + 1;
      return this.activity.filter(event => {
        const eventMonth = new Date(event.date).getMonth() + 1;
        return eventMonth !== currentMonth;
      });
    }
  },
  methods: {
    openActivity(id) {
      this.$router.push({ name: 'activity-details', params: { id } });
    },
    openEditDialog(event) {
      this.selectedEventId = event.id;
      this.newEvent = {...event}; // Предзаполнение данных
      this.showEdit = true;
    },
    submitFormEvents() {
      // Обработка сохранения данных
      console.log('Saving data:', this.newEvent);
      const index = this.activity.findIndex(event => event.id === this.selectedEventId);
      if (index !== -1) {
        // Обновляем существующий элемент в массиве
        this.activity[index] = {...this.activity[index], ...this.newEvent};
      } else {
        console.log("No matching event found to update");
      }
      this.showEdit = false;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.newEvent.image = URL.createObjectURL(file);
    }
  }
};
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 2px solid #ccc;
    z-index: 1000;
    display: block;
    max-width: 600px;
    height: max-content;
    text-align: left;
    border-radius: 8px;
    box-shadow: #939fab;
  }
  .button {
    background-color: #9db9d3;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 16px 8px 4px 0;
    cursor: pointer;
  }
  .buttonSave {
    background-color: #182542;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    margin: 16px 0 4px 0;
    cursor: pointer;
  }
  label {
    font-size: 18px;
  }
  .buttons {
    display: inline-block;
    float: right;
  }
  input {
    #file-upload-button {
      background-color: #9db9d3 !important;
      color: #fff !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 8px 16px !important;
    }
  }
  .section-title {
    font-size: 24px;
    color: #203156;
    margin: 20px 40px 10px;
    text-align: left;
    font-family: 'IBM Plex Serif', serif;
    font-weight: 600;
  }
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
    object-fit: cover;
    height: 10vw;
    width: 10vw;
    min-width: 100px;
    min-height: 100px
  }
</style>