export default {
    setUser(state,payload){
        state.token = payload.token;
        state.userId = payload.userId;
        state.didlogout = false;
       
        
    },
    logout(state,payload){
        state.token = payload.token;
        state.userId = payload.userId;
       
        
    },

    didlogout(state){
        state.didLogout = true;
    }

}