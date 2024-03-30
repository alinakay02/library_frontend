import { createRouter, createWebHashHistory } from 'vue-router';
import News from "@/components/NewsBlock.vue";
import ActivityBlock from "@/components/ActivityBlock.vue";
import AboutBlock from "@/components/AboutBlock.vue";
import MyLib from "@/components/MyLib.vue";
import SearchPage from "@/components/SearchPage.vue";
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/about', component: AboutBlock, alias: '/'},
        {path: '/news', component: News},
        {path: '/activity', component: ActivityBlock},
        {path: '/mylib', component: MyLib},
        {path: '/search', component: SearchPage},
        {path: '/signup', component: SignUp},
        {path: '/login', component: LogIn},
    ]
})

