import { defineAsyncComponent } from 'vue'; 
import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

import store from  './store/index.js';

const UserAuthentication = defineAsyncComponent(()=> import('./pages/UserAuthorization.vue'))
const CoachRegistation = defineAsyncComponent(()=> import('./pages/coaches/CoachRegistration.vue'))
const NotFound = defineAsyncComponent(()=> import('./pages/NotFound.vue'))



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props:true,
      children: [
        { path: 'contact', component: ContactCoach } 
      ]
    },
    { path:'/auth',component:UserAuthentication , meta:{ requiresUnauth:true }},
    { path: '/register', component: CoachRegistation , meta:{ requiresAuth:true } },
    { path: '/requests', component: RequestsReceived , meta:{ requiresAuth:true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

 router.beforeEach(function(to,_,next){
  if(to.meta.requiresAuth && !store.getters.isAuth){
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuth) {
    next('/coaches')
  } 
    else {
      next()
    }
}) 

export default router;
