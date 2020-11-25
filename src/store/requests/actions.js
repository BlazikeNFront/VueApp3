export default {
  requestAction(context,payload){
      const newRequest = {
          id:new Date().toISOString(),
          idCoach:payload.id,
          email:payload.email,
          message:payload.message
      }
    context.commit('addRequest', newRequest)
  }
}