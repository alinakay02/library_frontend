<template>
  <p class="section-title">Новости</p>
  <div class="news-list">
    <div v-for="item in news" :key="item.id" class="news-wrapper" @click="openNews(item.id)">
      <div class="image">
        <img :src="item.image" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px">
      </div>
      <div class="news-name">
        <div style="height: max-content" class="content">
          <p style="font-weight: 530; font-size: 16px; text-align: left">{{ item.title }}</p>
          <p style="color: #5c7d9d; font-size: 14px; text-align: right" class="date">{{ item.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/эмблема.jpg';
import image2 from '@/assets/эмблема.jpg';
import image3 from '@/assets/эмблема.jpg';

export default {
  data() {
    return {
      news: [
        {
          id: 1,
          title: 'Новость 1: Важное событие в мире технологий',
          date: '2024-05-15',
          image: image1,
          content: 'Полное описание новости 1'
        },
        {
          id: 2,
          title: 'Новость 2: Обновления в законодательстве',
          date: '2024-06-01',
          image: image2,
          content: 'Полное описание новости 2'
        },
        {
          id: 3,
          title: 'Новость 3: Новые достижения в науке',
          date: '2024-07-20',
          image: image3,
          content: 'Полное описание новости 3'
        },
        {
          id: 4,
          title: 'Новость 4: Важное объявление',
          date: '2024-08-10',
          image: image3,
          content: 'Полное описание новости 4'
        }
      ]
    };
  },
  methods: {
    openNews(id) {
      this.$router.push({ name: 'news-details', params: { id } });
    }
  }
};
</script>

<style scoped>
.section-title {
  font-size: 24px;
  color: #203156;
  margin: 20px 40px 10px;
  text-align: left;
  font-family: 'IBM Plex Serif', serif;
  font-weight: 600;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 20px;
}

.news-wrapper {
  margin: 20px;
  box-shadow: 1px 1px 2px #9db9d3;
  border-radius: 8px;
  width: 40vw;
  max-width: 900px;
  min-width: 350px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
}

.news-wrapper:hover {
  box-shadow: 1px 1px 4px #5c7d9d;
  transform: translateY(-10px);
}

.news-name {
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
}
</style>