import Vue from 'vue'
import App from './App.vue'
import store from './store'
 
import VueRouter from 'vue-router';
import { routes } from './router/routes';
import { index } from './components/index';
import CKEditor from 'ckeditor4-vue';
import VueCookies from 'vue-cookies'

Vue.use( CKEditor );

Vue.use(VueCookies);
Vue.$cookies.config('3d');

Vue.$cookies.set('login',false);
// Router
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store:store,
  render: h => h(App)
})

 
