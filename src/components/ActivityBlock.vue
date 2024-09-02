<script setup>
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import {useI18n} from 'vue-i18n';
const { t } = useI18n({useScope: 'global'});
</script>

<template>
<!--  Блок для вывода мероприятий на текущий месяц-->
  <p class="section-title">{{ t('events.currMonth') }}</p>
  <div class="activ-list">
    <div v-for="event in currentMonthEvents" :key="event.id" class="activ-wrapper" >
      <div class="image">
        <img :src="event.photo" @error="handleImageError" class="activity-image">
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
<!--  Блок для вывода всех мероприятий-->
  <p class="section-title">{{ t('events.all') }}</p>
  <div class="activ-list">
    <div v-for="item in nonCurrentMonthEvents" :key="item.id" class="activ-wrapper">
      <div class="image">
        <img :src="item.photo" @error="handleImageError" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px" class="activity-image">
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
        <textarea id="content" v-model="newEvent.event" required style="height: 200px; width: 500px; resize: none; text-align: left" class="input-group-text"></textarea><br>

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

  <p v-if="message" class="alert">{{ message }}</p>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity: [],
      showEdit: false,
      newEvent: {
        title: '',
        content: '',
        date: '',
        image: null
      },
      selectedEventId: null,
      admin: true,
      message: '',
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
  mounted() {
    this.fetchEvents();
  },
  methods: {
    // Метод для загрузки мероприятий
    fetchEvents() {
      axios.get('http://localhost:8084/events/getAll')
          .then(response => {
            this.activity = response.data; // Обновление данных мероприятий
          })
          .catch(error => console.error('Ошибка при загрузке мероприятий:', error));
    },
    // Метод для возврата пути изображения по умолчанию
    handleImageError(event) {
      event.target.src = require('@/assets/эмблема.jpg');
    },
    // Метод открытия отдельной страницы с конкретным меропритием
    openActivity(id) {
      this.$router.push({ name: 'activity-details', params: { id } });
    },
    // Метод открытия диалога для редактирования мероприятия
    openEditDialog(event) {
      this.selectedEventId = event.id;
      this.newEvent = {...event};
      this.showEdit = true;
    },
    // Метод редактирования мероприятия
    submitFormEvents() {
      axios.put('http://localhost:8084/events/update', this.newEvent)
          .then(response => {
            this.fetchEvents();
            this.showEdit = false;
          })
      this.showEdit = false;
    },
    // Метод для получения ссылки на изображение
    handleFileChange(event) {
      const file = event.target.files[0];
      this.newEvent.photo = URL.createObjectURL(file);
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