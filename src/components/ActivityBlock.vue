<script setup>
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
</script>

<template>
<div style="display: flex; flex-wrap: wrap; justify-content: center; margin-top: 10px">
  <div class="activ-wrapper">
    <div class="image">
      <img src="../assets/эмблема.jpg" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px">
    </div>
    <div class="activ-name">
      Название мероприятия мероприятия мероприятия
    </div>
  </div>
  <div class="activ-wrapper">
    <div class="image">
      <img src="../assets/эмблема.jpg" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px">
    </div>
    <div class="activ-name">
      Название мероприятия мероприятия мероприятия
    </div>
  </div>
  <div class="activ-wrapper">
    <div class="image">
      <img src="../assets/эмблема.jpg" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px">
    </div>
    <div class="activ-name">
      <p>Название мероприятия мероприятия мероприятия</p>
    </div>
  </div>
  <div class="activ-wrapper">
    <div class="image">
      <img src="../assets/эмблема.jpg" style="height: 10vw; width: 10vw; min-width: 100px; min-height: 100px">
    </div>
    <div class="activ-name">
      <p>Название мероприятия мероприятия мероприятия</p>
    </div>
  </div>
</div>

</template>

<style scoped>

.activ-wrapper {
  display: flex;
  margin: 20px 20px;
  box-shadow: 1px 1px 2px #9db9d3;
  border-radius: 8px;
  width: 40vw;
  max-width: 900px;
  min-width: 350px;
  transition: transform 0.3s ease-in-out;
}
.activ-wrapper:hover {
  box-shadow: 1px 1px 4px #5c7d9d;
  transform: translateY(-10px);
}
.activ-name {
  height: 10vw;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
.image {
  height: 10vw;
  min-height: 100px;
  padding: 0 0 0 10px;
}
</style>