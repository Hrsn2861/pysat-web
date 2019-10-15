import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  token: '',
  user: null,

  // view-related
  sidebar: {
    opened: !+localStorage.getItem('sidebarStatus')
  },
  device: 'desktop'

}

export default new Vuex.Store({

  state,
  mutations,
  actions,
  getters
})
