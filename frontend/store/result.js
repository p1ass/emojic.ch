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
    const blob = await UploadAPI.uploadImage(file)
    console.log(blob)

    // Data URLを作成
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = event => {
        resolve(event.target.result)
      }

      reader.readAsDataURL(blob)
    }).then(result => {
      commit('setResultSrc', result)
    })
  }
}
