import Vue from 'vue'
import Vuex from 'vuex'
import UploadAPI from '@/libs/upload'

Vue.use(Vuex)

export const state = () => ({
  result_src: '/images/main.jpg'
})

export const mutations = {
  setResultSrc(state, payload) {
    state.result_src = payload
  }
}

export const actions = {
  async updateImageAction({ commit }, file) {
    const binary_image = await UploadAPI.uploadImage(file)
    console.log(binary_image)
    const src = URL.createObjectURL(binary_image)
    commit('setResultSrc', src)
  }
}
