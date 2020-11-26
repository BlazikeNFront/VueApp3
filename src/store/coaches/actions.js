
export default {
   async registerCoach(context,data){

        const coachID  =context.rootGetters.userId;

        const coachData = {
            firstName:data.first,
            lastName:data.last ,
            areas:data.areas,
            description:data.desc,
            hourlyRate:data.rate,
        }

       const response = await fetch(`https://vue-manage.firebaseio.com/coaches/${coachID}.json`,
       {
           method:'PUT',
           body:JSON.stringify(coachData),
       })

       const responseData = await response.json();
       if(!response.ok){
           const error = new Error(responseData.message || 'There was an error')
           throw error
       }
        


        context.commit('registerCoach',{
            ...coachData,
            id:coachID
        })
    },

    async loadCoaches(context){
       
      const response = await (await fetch(`https://vue-manage.firebaseio.com/coaches.json`)).json();
      
      if(!response.ok){
          //throw error
      }
      
   
      
      const coaches = [];

      for( let key in response){
        
          const coach = {
            id:key,
            firstName:response[key].firstName,
            lastName:response[key].lastName ,
            areas:response[key].areas,
            description:response[key].description,
            hourlyRate:response[key].hourlyRate,
          };
          coaches.push(coach);
      }
      
      context.commit('loadCoach',coaches)
      
    }
}