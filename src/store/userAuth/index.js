import actions from './actions.js';
import mutations from './getters.js';
import getters from './mutations.js';




export default {
    state(){
        return {
           userId:null,
           token:null,
           tokenExpiration:null,
        }
     },
  actions,
  mutations,
  getters
}