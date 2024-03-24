import { createApp } from 'vue'
import App from './App.vue'

import {languages} from "@/i18n";
import {defaultlocale} from "@/i18n";
import {createI18n, useI18n} from "vue-i18n";

const localeStoregeLang = localStorage.getItem('lang');

const messages = Object.assign(languages);
const i18n = createI18n({
    legacy: false,
    locale: localeStoregeLang || defaultlocale,
    fallbackLocale: 'ru',
    messages
    })

createApp(App,{
    setup(){
        const {t} = useI18n();
        return {t}
    }
}).use(i18n).mount('#app')
