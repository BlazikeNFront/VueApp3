export default {
    requests(state, _, _2, rootGetters){
        const coachID = rootGetters.userId;
       
       
        return state.requests.filter(request => request.idCoach === coachID)
    },
    hasRequests(_,getters){
      return  getters.requests && getters.requests.length > 0
    }
}