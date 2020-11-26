export default {
    addRequest(state,payload){
        state.requests.push(payload)
    },
    loadRequest(state,payload){
        state.requests = payload
    }
}