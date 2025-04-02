const state = {
    socket: null,
    isConnected: false
  }
  
  const mutations = {
    SET_SOCKET(state, socket) {
      state.socket = socket
    },
    SET_CONNECTED(state, status) {
      state.isConnected = status
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations
  }