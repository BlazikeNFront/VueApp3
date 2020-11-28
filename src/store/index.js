import { createStore } from 'vuex';
import CoachesModule from './coaches/index.js';
import RequestsModule from './requests/index.js';
import UserAuthModule from './userAuth/index.js';



const store = createStore({
   modules:{
    coaches:CoachesModule,
    requests:RequestsModule,
    userAuth:UserAuthModule,
    
   },
   


})

export default store
