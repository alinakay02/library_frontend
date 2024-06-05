<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="contact-info">
        <p><i class="material-icons">location_on</i> Учтепинский район, МФУ Чопонота, ул. Боги захал, дом 5-а </p>
        <p><i class="material-icons">email</i> <a href="mailto:akm_uchtepatuman@mail.ru">akm_uchtepatuman@mail.ru</a></p>
        <p><i class="material-icons">phone</i> +998 (55) 501-05-52</p>
      </div>
      <div class="social-media">
        <ul>
          <li><a href="https://youtu.be/rpXjxfpFH8E" target="_blank"><i class="material-icons">smart_display</i> YouTube </a></li>
          <li><a href="https://t.me/akm_uchtepa" target="_blank"><i class="material-icons">send</i> Telegram </a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
@media (max-width: 768px) {
  .social-media ul {
    display: block;
  }
  .social-media li {
    margin: 5px 0;
  }
}
.footer {
  background: #203156;
  color: #939fab;
  padding: 10px;
  text-align: center;
  min-height: 152px;
  font-family: 'IBM Plex Serif', serif;
}
.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-info {
  margin-bottom: 10px;
  text-align: center;
}
.contact-info p {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-info a {
  color: #939fab;
  text-decoration: none;
}
.contact-info i {
  font-size: 16px;
  margin-right: 4px;
  vertical-align: middle;
}
.social-media ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.social-media li {
  margin: 2px 10px;
}
.social-media a {
  color: #939fab;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.social-media i {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
