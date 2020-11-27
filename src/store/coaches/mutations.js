export default {
   registerCoach(state,payload){
    state.coaches.push(payload)
   },

   loadCoach(state,payload){
      state.coaches = payload
   },

   setFetchTimestamp(state){
      state.lastFetch = new Date().getDate();
   }

}