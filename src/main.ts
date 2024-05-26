import InputView from '@/InputView.vue';
import ResultView from '@/ResultView.vue';
import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue'

const router = createRouter(
    {
        history : createWebHistory(),
        routes : [
            {path : '/', component : InputView},
            {path : '/results', component : ResultView},
        ],
    }
);

window.addEventListener("pageshow", () => {
    createApp(App).use(router).mount('#app');
});