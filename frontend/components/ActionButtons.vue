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
        @click="convertImage"
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
    },

    convertImage() {
      this.openLoading()

      // 画像のリサイズ
      // https://www.bokukoko.info/entry/2016/03/28/JavaScript_で画像をリサイズする方法
      const MIN_SIZE = 1000
      let canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const reader = new FileReader()
      const vm = this
      const type = this.image.type

      reader.onload = function(e) {
        let image = new Image()
        image.src = e.target.result

        image.crossOrigin = 'Anonymous'
        image.onload = async function(event) {
          let dstWidth, dstHeight
          if (this.width > this.height) {
            dstWidth = MIN_SIZE
            dstHeight = (this.height * MIN_SIZE) / this.width
          } else {
            dstHeight = MIN_SIZE
            dstWidth = (this.width * MIN_SIZE) / this.height
          }
          canvas.width = dstWidth
          canvas.height = dstHeight
          ctx.drawImage(
            this,
            0,
            0,
            this.width,
            this.height,
            0,
            0,
            dstWidth,
            dstHeight
          )

          const blob = vm.canvasToBlob(canvas)
          await vm.uploadImage(blob)
        }
      }
      reader.readAsDataURL(this.image)
    },

    canvasToBlob(canvas) {
      // 必ずJPEGでBlobに変換する
      var type = 'image/jpeg'
      // canvas から DataURL で画像を出力
      var dataurl = canvas.toDataURL(type)
      // DataURL のデータ部分を抜き出し、Base64からバイナリに変換
      var bin = atob(dataurl.split(',')[1])
      // 空の Uint8Array ビューを作る
      var buffer = new Uint8Array(bin.length)
      // Uint8Array ビューに 1 バイトずつ値を埋める
      for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }
      // Uint8Array ビューのバッファーを抜き出し、それを元に Blob を作る
      return new Blob([buffer.buffer], { type: type })
    },

    async uploadImage(blob) {
      // API Gatewayにアップロードして変換後の画像を受け取る
      try {
        await this.$store.dispatch('result/updateImageAction', blob)
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
