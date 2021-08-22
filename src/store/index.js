import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		packages: []
	},
	mutations: {
		SET_PACKAGES(state, payload) {
			state.packages = payload
		}
	},
	actions: {
		async getPackages( { commit }, search) {
			const response = await axios.get(`v2/search?q=${search}`)
			console.log('response', response)
			commit('SET_PACKAGES',response.data.results)
		}
	},
	getters: {
		GET_PACKAGES: state => state.packages
	},
	modules: {
	}
})
