export const state = () => ({
  user: {},
  messages: [],
  users: [],
  facebookData: [],
  twitterData: [],
});

export const getters = {
  typingUsers: ({ users, user }) => users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  clearFB(state) {
    state.facebookData=[];
  },
  clearTwt(state) {
    state.twitterData=[];
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status;
  },
  setFacebook (state, info) {
    state.facebookData = info;
  },
  setTwitter (state, info) {
    state.twitterData = info;
  }

};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state;
    const payload = {
      msg,
      id: user.id,
    };

    dispatch("socketEmit", {
      action: "createMessage",
      payload,
    });
  },
  joinRoom({ dispatch, state }) {
    const { user } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user,
    });
  },
  leftRoom({ commit, dispatch }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null,
    });

    commit("clearData");
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit("setTypingStatus", typingStatus);
    const { user } = state;
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: user,
    });
  },
  async getFacebookData({dispatch, commit, state}) {
          const { user } = state;
          await this.$axios.get('/facebook')
              .then( res => {
          commit("setFacebook", res.data)    
          }); 

          var payload = {
          msg: "Automator is fetching the Facebook feed.....",
          id: user.id,
          };    
          dispatch("socketEmit", {
          action: "createMessage",
          payload: payload,    
         });        


          payload = {
          msg: "The feed:  " + JSON.stringify(state.facebookData).replace(/\"/g, " ").replace(/[{]/g,"  " ).replace(/[\[\]']+/g,'').replace(/}/g, "   "),
          id: user.id,
          };   
          setTimeout(function(){ 
          dispatch("socketEmit", {
          action: "createMessage",
          payload: payload,
    }); }, 10000) 
        commit("clearFB");  
  },

  async getTwitterData({dispatch, commit, state}) {
          const { user } = state;
          await this.$axios.get('/twitter')
              .then( res => {
          commit("setTwitter", res.data)    
          }); 

          var payload = {
          msg: "Automator is fetching the Twitter feed...",
          id: user.id,
          };    
          dispatch("socketEmit", {
          action: "createMessage",
          payload: payload,    
         }); 

          payload = {
          msg: "The feed: " + JSON.stringify(state.twitterData).replace(/\"/g, " ").replace(/[{]/g,"  " ).replace(/[\[\]']+/g,'').replace(/}/g, "   "),
          id: user.id,
          };    

          setTimeout(function(){
          dispatch("socketEmit", {
          action: "createMessage",
          payload: payload,
       }); }, 10000)  
        commit("clearTwt");  
  },

  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch("socketEmit", {
      action: "createUser",
      payload: user,
    });

    commit("setUser", { id, ...user });
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      const { id, ...userInfo } = user;
      dispatch('createUser', userInfo);
      dispatch('joinRoom');
    }
  },
};
