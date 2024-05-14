<template>
  <div v-if="newsItem" class="news-details">
    <span class="news-title">{{ newsItem.title }}</span>
    <p class="news-date">{{ newsItem.date }}</p>
    <img :src="newsItem.image" alt="News Image" class="news-image">
    <p class="news-content">{{ newsItem.content }}</p>
  </div>
</template>

<script>
import image1 from '@/assets/эмблема.jpg';
import image2 from '@/assets/эмблема.jpg';
import image3 from '@/assets/эмблема.jpg';

export default {
  data() {
    return {
      newsItem: null
    };
  },
  created() {
    const newsId = this.$route.params.id;
    this.fetchNewsItem(newsId);
  },
  methods: {
    fetchNewsItem(id) {
      const data = [
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
      ];

      this.newsItem = data.find(item => item.id === parseInt(id));
    }
  }
};
</script>

<style scoped>
.news-details {
  max-width: 800px;
  margin: 20px auto;
  text-align: left;
  padding-bottom: 40px;
}

.news-title {
  font-size: 26px;
  font-weight: bold;
  font-family: 'Roboto Light';
}

.news-date {
  font-size: 16px;
}

.news-image {
  max-height: 500px;
  padding-bottom: 16px;
}

.news-content {
  font-size: 18px;
}

/* Медиа-запросы для мобильной адаптации */
@media (max-width: 600px) {
  .news-details {
    max-width: 95%;
    padding: 10px;
  }

  .news-image {
    height: 300px;
    max-width: 400px;
    width: 100%;
    object-fit: cover;
  }

  .news-title {
    font-size: 22px;
  }

  .news-content {
    font-size: 16px;
  }
}
</style>
