export default {
  async requestAction(context,payload){

    
      const newRequest = {
          email:payload.email,
          message:payload.message
      }

     const response = await fetch(`https://vue-manage.firebaseio.com/requests/${payload.id}.json`,
     {
         method:'POST',
         body:JSON.stringify(newRequest),
     })

     if(!response.ok){
      const error = new Error(responseData.message || 'There was an error')
      throw error
  }

     const responseData = await response.json();
     newRequest.id = responseData.name;

    context.commit('addRequest', newRequest)
  },

  async loadRequests(context){
    const coachId = context.rootGetters.userId

    const token = context.rootGetters.token

    const response = await fetch(`https://vue-manage.firebaseio.com/requests/${coachId}.json?auth=${token}`);
    if(!response.ok){
      const error = new Error(responseData.message || 'There was an error')
      throw error
  }

     const responseData = await response.json();

    const requests = [];

    for(const key in responseData){
      const request = {
        id:key,
        idCoach:coachId,
        email:responseData[key].email,
        message:responseData[key].message
      }
      requests.push(request)
    }

    

     context.commit('loadRequest', requests)
  }
}