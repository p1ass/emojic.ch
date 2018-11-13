<template>
  <div>

    <div class="buttons">
      
      <label class="button select-image vs-button vs-button-relief large">
        <div >
          1. 写真をえらぶ！
          <input 
            :value="filePpath"
            type="file"
            accept="image/*"
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
        @click="startUploading"
      >2. 絵文字に変換！</vs-button>

      <vs-button 
        :icon-after="true" 
        type="relief"
        size="large"
        class="button"
        href="http://twitter.com/share?url=https://emojic.ch&hashtags=えもじっく"
        target="_blank">3. Twitterで共有！</vs-button>
    </div>
  </div>
</template>

<script>
import UploadAPI from '@/libs/upload'
import { mapActions } from 'vuex'

export default {
  name: 'Buttons',

  data() {
    return {
      image: undefined,
      isSelected: false,
      filePpath: ''
    }
  },
  computed: {
    ...mapActions('result', ['updateImageAction'])
  },

  watch: {
    image() {
      if (this.image == undefined) {
        this.isSelected = false
      } else {
        this.isSelected = true
      }
    }
  },

  methods: {
    // inputからファイルを選ぶ
    setImage(e) {
      this.filePath = ''
      e.preventDefault()
      this.image = e.target.files[0]
    },

    startUploading() {
      // 画像が選ばれているか確認
      if (this.image.type != 'image/jpeg' && this.image.type != 'image/png') {
        this.$vs.dialog({
          color: 'danger',
          title: `対応していない画像が選ばれました`,
          text: 'えもじっくはPNG、JPEG形式の画像に対応しています。',
          acceptText: '閉じる'
        })
        return
      }
      try {
        this.openLoading()
        this.convertImage()
      } catch (e) {
        this.closeLoading()
      }
    },

    // iPhoneの画像の向きを調整
    // http://blog.yuhiisk.com/archive/2018/05/27/iphone-rotate-image-bug.html
    convertImage() {
      new Promise((resolve, reject) => {
        loadImage.parseMetaData(this.image, data => {
          const options = {
            canvas: true
          }
          if (data.exif) {
            options.orientation = data.exif.get('Orientation')
          }
          loadImage(
            this.image,
            canvas => {
              var dataUri = canvas.toDataURL('image/jpeg')
              // 画像を作成
              let img = new Image()
              img.src = dataUri
              resolve(img)
            },
            options
          )
        })
      }).then(result => {
        this.resizeImage(result)
      })
    },

    // 画像のリサイズ
    // https://www.bokukoko.info/entry/2016/03/28/JavaScript_で画像をリサイズする方法
    resizeImage(image) {
      const MIN_SIZE = 1000
      let canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const reader = new FileReader()
      const vm = this

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
    },

    canvasToBlob(canvas) {
      // 必ずJPEGでBlobに変換する
      var type = 'image/jpeg'

      var dataurl = canvas.toDataURL(type)
      var bin = atob(dataurl.split(',')[1])
      var buffer = new Uint8Array(bin.length)
      for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i)
      }

      return new Blob([buffer.buffer], { type: type })
    },

    // API Gatewayにアップロードして変換後の画像を受け取る
    async uploadImage(blob) {
      try {
        await this.$store.dispatch('result/updateImageAction', blob)
        this.notifySuccess()
      } catch (e) {
        if (e.message.slice(0, 1) == '4') {
          this.$vs.dialog({
            color: 'danger',
            title: `対応していない画像が選ばれました`,
            text: 'えもじっくはPNG、JPEG形式の画像に対応しています。',
            acceptText: '閉じる'
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
      this.image = undefined
    },

    notifySuccess() {
      this.$vs.notify({
        title: '変換に成功しました',
        text: '長押しで画像を保存してTwitterでつぶやこう！',
        color: 'success',
        position: 'top-right',
        time: 4000
      })
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
  background-color: #059133;
  box-shadow: darken($color: #059133, $amount: 10) 0px 3px 0px 0px;
  text-align: center;
  cursor: pointer;
}
input {
  display: none;
}
</style>
