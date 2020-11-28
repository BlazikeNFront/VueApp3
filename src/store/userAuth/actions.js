let timer;
export default {
   
      async authenticate(context,payload){
        const mode = payload.mode;
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDP07JFyIVmk-8p8DkJYSXVx19r3ujvi24';

        if(mode === 'signup'){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDP07JFyIVmk-8p8DkJYSXVx19r3ujvi24'
        }

        const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:payload.email,
            password:payload.password,
            returnSecureToken:true,
        })
    });

    const responseData = await response.json();
    
    if(!response.ok){ 

        const newErr = new Error(responseData.message || 'Failed to authenticate')
        throw newErr
     }
      const expiresIn = +responseData.expiresIn * 1000; 
      
 
    

   

     const expirationDate = new Date().getTime() + expiresIn;
    
     localStorage.setItem('token',responseData.idToken);
     localStorage.setItem('userId',responseData.localId);
     localStorage.setItem('expirationToken',expirationDate);

     timer = setTimeout( function(){
         context.dispatch('autoLogout');
        
     },expiresIn);
 
     context.commit('setUser',{
         token:responseData.idToken,
         userId:responseData.localId,
         
         
     })

    }, 
    
    async login(context,payload){       

       return context.dispatch('authenticate', {
            ...payload,
            mode:'login'
        })

       

    },
   async signUp(context,payload){

  
   return context.dispatch('authenticate', {
        ...payload,
        mode:'signup'
    })

        
    },

    logoutReset(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationToken');

        clearTimeout(timer)
        context.commit('logout',{
            token:null,
            userId:null,
            
        })
        
    },

    tryLogin(context){
      const token =  localStorage.getItem('token');
      const userId =  localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('expirationToken');

      const expiresIn = +tokenExpiration - new Date().getTime();
        
      if(expiresIn < 0){
      
        return;
      }

      timer = setTimeout( function(){
        context.dispatch('autoLogout')
    },expiresIn);

  

      if(token && userId){
          context.commit('setUser',{
              token:token,
              userId:userId,
              tokenExpiration:null,
          })
      }
    },

    autoLogout(context){
        context.dispatch('logoutReset');
        context.commit('didlogout')
    }

    
}