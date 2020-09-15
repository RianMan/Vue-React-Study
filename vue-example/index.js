import app from './app.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './page/home.vue';
import Profile from './page/profile.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile }
  ]

const router = new VueRouter({
    routes, // (缩写) 相当于 routes: routes,
 
})

Vue.use(VueRouter)
new Vue({
    // 挂载元素
    el: '#app',
    router: router,
    render: h => h(app)
})
  