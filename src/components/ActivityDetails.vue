<template>
  <div v-if="activityItem" class="activity-details">
    <h1 class="activity-title">{{ activityItem.title }}</h1>
    <p class="activity-date">{{ activityItem.date }}</p>
    <img :src="activityItem.image" alt="Activity Image" class="activity-image">
    <p class="activity-content" v-html="activityItem.content"></p>
  </div>
</template>

<script>
import image1 from '@/assets/activity1.png';
import image2 from '@/assets/activity2.png';
import image3 from '@/assets/эмблема.jpg';

export default {
  data() {
    return {
      activityItem: null
    };
  },
  created() {
    const activityId = this.$route.params.id;
    this.fetchActivityItem(activityId);
  },
  methods: {
    fetchActivityItem(id) {
      const data = [
        {
          id: 1,
          title: 'Центральная Азия-2024: Интернет и информационно-библиотечные ресурсы в науке, образовании, культуре и бизнесе',
          date: '2024-05-15',
          image: image1,
          content: 'XVII Международная конференция ”Центральная Азия-2024: Интернет и информационно-библиотечные ресурсы в науке, образовании, культуре и бизнесе “ начнет свою работу 16-18 мая в Джизаке, а также 14-15 мая в Самарканде на тему” Форум международного содружества: сотрудничество и инновации".<br><br>' +
              'В этой конференции, которая проводится с 1997 года в сфере информационно-библиотечной деятельности, принимают участие около 400 библиотекарей, работающих в нашей республике.<br><br>' +
              '♦️ В международной конференции планируется участие коллег из зарубежных стран: США, Турции, России, Азербайджана, Белоруссии, Казахстана, Кыргызстана, Таджикистана и других, представителей крупных издательских и информационных компаний.<br><br>' +
              '♦️ Рабочие языки конференции: узбекский, русский и английский'
        },
        {
          id: 2,
          title: '10 мая - День рождения выдающегося узбекского писателя Гафура Гуляма',
          date: '2024-06-01',
          image: image2,
          content: 'Гафур Гулам (родился 10 мая 1903 г., умер 10 июля 1966 г.) - Великий узбекский писатель и поэт. <br><br>' +
              ' В девять лет остался без отца, в пятнадцать лет — без матери. Гафур Гулам сначала учился в старой школе, затем в русско-туземной школе. <br><br>' +
              'В автобиографической повести "Озорник" (1936) ярко описаны детство автора и жизнь Ташкента в начале века.<br><br>',
        },
        {
          id: 3,
          title: 'Мероприятие 3',
          date: '2024-07-20',
          image: image3,
          content: 'Полное описание события 3'
        }
      ];

      this.activityItem = data.find(item => item.id === parseInt(id));
    }
  }
};
</script>

<style scoped>
.activity-details {
  max-width: 800px;
  margin: 20px auto;
  text-align: left;
  padding-bottom: 40px;
}

.activity-title {
  font-size: 26px;
  font-weight: bold;
  font-family: 'Roboto Light';
}

.activity-date {
  font-size: 16px;
}

.activity-image {
  max-height: 500px;
  padding-bottom: 16px;
}

.activity-content {
  font-size: 18px;
}

/* Медиа-запросы для мобильной адаптации */
@media (max-width: 600px) {
  .activity-details {
    max-width: 95%;
    padding: 10px;
  }

  .activity-image {
    height: 300px;
    max-width: 400px;
    object-fit: cover;
  }

  .activity-title {
    font-size: 22px;
  }

  .activity-content {
    font-size: 16px;
  }
}
</style>
