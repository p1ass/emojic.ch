<template>
  <div>

    <div class="buttons">
      
      <label class="button select-image vs-button vs-button-relief large">
        <div >
          写真を選ぶ！
          <input 
            id="file" 
            type="file" 
            accept="image/*"
            class=""
            @change="setImage"
          >
        </div>
      </label>

      <vs-button 
        id="input-button" 
        :icon-after="true" 
        :disabled="!isSelected"
        type="relief"
        size="large"
        color="#e74c3c"
        class="button"
        @click="uploadImage"
      >
        絵文字に変換😊
      </vs-button>

      <vs-button 
        :icon-after="true" 
        type="relief"
        icon="share"
        size="large"
        class="button"
        href="http://twitter.com/share?url=https://emojic.ch&text=こんな顔になりました😄&hashtags=えもじっく"
        target="_blank">Twitterで共有する！</vs-button>
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
      converted_image: '',
      image: undefined
    }
  },

  computed: {
    ...mapActions('result', ['updateImageAction']),

    isSelected() {
      if (this.image == undefined) {
        return false
      } else {
        return true
      }
    }
  },

  destroyed() {
    revokeObjectURL(this.converted_image)
  },

  methods: {
    setImage(e) {
      // inputからファイルを選ぶ
      e.preventDefault()
      this.image = e.target.files[0]
      console.log(file)
    },

    async uploadImage() {
      this.openLoading()
      // API Gatewayにアップロードして変換後の画像を受け取る
      try {
        await this.$store.dispatch('result/updateImageAction', this.image)
      } catch (e) {
        if (e.message.slice(0, 1) == '4') {
          this.$vs.dialog({
            color: 'danger',
            title: `対応していない画像が選ばれました`,
            text: 'えもじっくはPNG、JPEG形式の画像に対応しています。',
            acceptText: '閉じる',
            close: () => {}
          })
        } else if (e.message.slice(0, 1) == '5') {
          this.$vs.dialog({
            color: 'danger',
            title: `予期せぬエラーが発生しました。`,
            text: 'しばらく経ってからもう一度お試しください。',
            acceptText: '閉じる'
          })
        }
      }
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

// inputボタンだけ独自にスタイルを設定
.select-image {
  background-color: green;
  box-shadow: darken($color: green, $amount: 10) 0px 3px 0px 0px;
  text-align: center;
  cursor: pointer;
}
input {
  display: none;
}
</style>
