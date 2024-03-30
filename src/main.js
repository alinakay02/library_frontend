import { createApp } from 'vue'
import App from './App.vue'

import {languages} from "@/i18n";
import {defaultlocale} from "@/i18n";
import {createI18n, useI18n} from "vue-i18n";
import router from "@/router";
import ClickOutside from "vue-click-outside";


const localeStoregeLang = localStorage.getItem('lang');

const messages = Object.assign(languages);
const i18n = createI18n({
    legacy: false,
    locale: localeStoregeLang || defaultlocale,
    fallbackLocale: 'ru',
    messages
    })

const app = createApp(App);

// Регистрируем плагины
app.use(router);
app.use(i18n);

// Регистрируем глобальную директиву v-click-outside
app.directive('v-click-outside', ClickOutside);

// Монтируем приложение
app.mount('#app');
