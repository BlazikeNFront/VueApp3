export default {
 
 userId(state){
           return state.userId
        },

token(state){
        return state.token
},
isAuth(state){
        return state.token
},
didAutoLoggout(state){
        return state.didLogout
}
     
}