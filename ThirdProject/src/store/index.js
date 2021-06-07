import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menu.js'

Vue.use(Vuex).use(menus)

export default new Vuex.Store({
	state: {
		token: ''
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
			localStorage.setItem("token", token)
		},
	},
	actions: {
		
	},
	modules: {
		menus
	}
})
// export default store