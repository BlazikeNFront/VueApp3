export default {
    
    async login(context,payload){       
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP07JFyIVmk-8p8DkJYSXVx19r3ujvi24',{
        method:'POST',
        body:JSON.stringify({
            email:payload.email,
            password:payload.password,
            returnSecureToken:true,
        })
    });

    const responseData = await response.json();
    console.log(responseData)
    if(!response.ok){ 

        const newErr = new Error(responseData.message || 'Failed to authenticate')
        throw newErr
     }

     context.commit('setUser',{
         token:responseData.idToken,
         userId:responseData.localId,
         tokenExpiration:responseData.tokenExpiration
     })

    },
   async signUp(context,payload){

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP07JFyIVmk-8p8DkJYSXVx19r3ujvi24',{
        method:'POST',
        body:JSON.stringify({
            email:payload.email,
            password:payload.password,
            returnSecureToken:true,
        })
    });

    const responseData = await response.json();
    console.log(responseData)
    if(!response.ok){ 

        const newErr = new Error(responseData.message || 'Failed to authenticate')
        throw newErr
     }

     context.commit('setUser',{
         token:responseData.idToken,
         userId:responseData.localId,
         tokenExpiration:responseData.tokenExpiration
     })


        
    },
}