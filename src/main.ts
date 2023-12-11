import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router/router'; // 导入路由配置

const app = createApp(App);
const pinia = createPinia();

app.use(router); // 使用 Vue Router
app.use(pinia); // 使用 Vue Router
app.mount('#app');
