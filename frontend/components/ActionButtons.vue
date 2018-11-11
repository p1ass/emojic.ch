<template>
  <div>
    <div class="buttons">
      <vs-button 
        :icon-after="true" 
        type="relief" 
        size="large"
        color="#e74c3c"
        class="button"
        @click="uploadImage">ふがに変換する！</vs-button>
      <vs-button 
        :icon-after="true" 
        type="relief"
        icon="share"
        size="large"
        class="button">Twitterで共有する！</vs-button>
    </div>
    <a 
      v-show="converted_image != ''" 
      :href = "converted_image" 
      target="_blank">
      <img 
        :src="converted_image"
        height="300px"
        class="converted-image">
    </a>
  </div>
</template>

<script>
import UploadAPI from '@/libs/upload'
import { mapActions } from 'vuex'

export default {
  name: 'Buttons',

  data() {
    return {
      converted_image: ''
    }
  },

  computed: {
    ...mapActions('result', ['updateImageAction'])
  },

  destroyed() {
    revokeObjectURL(this.converted_image)
  },

  methods: {
    async selectImage() {
      return new Promise(resolve => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = event => {
          resolve(event.target.files[0])
        }
        input.click()
      })
    },

    async uploadImage() {
      const file = await this.selectImage()
      this.openLoading()
      // API Gatewayにアップロードして変換後の画像を受け取る
      await this.$store.dispatch('result/updateImageAction', file)
      this.closeLoading()
    },

    openLoading() {
      this.$vs.loading({
        type: 'radius',
        background: 'rgba(249, 202, 36, 0.8)',
        color: 'rgb(255, 255, 255)'
      })
    },

    closeLoading() {
      this.$vs.loading.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global.scss';

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}

.button {
  @include button;
}
</style>
