<template>
  <div>
    <div class="buttons">
      <label class="button select-image vs-component vs-button button vs-button-null vs-button-relief large">
        <div >
          写真をえらぶ！
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
        color="#ff6348"
        class="button"
        @click="startUploading"
      >絵文字に変換！</vs-button>

      <vs-button 
        :icon-after="true" 
        type="relief"
        size="large"
        class="button"
        color="#1e90ff"
        @click="openTwitter">Twitterを開く！</vs-button>
    </div>
  </div>
</template>

<script>
import UploadAPI from '@/libs/upload'
import ImageUtil from '@/libs/image'
import { mapActions } from 'vuex'
import isMobile from 'ismobilejs'

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
    openTwitter() {
      if (isMobile.any == true) {
        window.open('https://twitter.com/intent/tweet?hashtags=えもじっく')
      } else {
        window.open('https://twitter.com/')
      }
    },

    // inputからファイルを選ぶ
    setImage(e) {
      this.notifySelect()
      this.filePath = ''
      e.preventDefault()
      this.image = e.target.files[0]
    },

    async startUploading() {
      // 画像が選ばれているか確認
      if (this.image.type != 'image/jpeg' && this.image.type != 'image/png') {
        this.$vs.dialog({
          color: 'danger',
          title: `対応していない画像が選ばれました`,
          text: 'えもじっくはPNG、JPEG形式の画像に対応しています。',
          acceptText: '閉じる'
        })
        return null
      }

      try {
        this.openLoading()
        const blob_image = await ImageUtil.fixImageOrientationAndSize(
          this.image
        )

        await this.uploadImage(blob_image)
      } catch (e) {
        this.dialogUnExpectedError()
      } finally {
        this.closeLoading()
      }
    },

    // API Gatewayにアップロードして変換後の画像を受け取る
    async uploadImage(blob) {
      try {
        await this.$store.dispatch('result/updateImageAction', blob)
        this.notifySuccess()
      } catch (e) {
        if (e.message == 204) {
          this.notifyFailed()
        } else if (400 <= e.message <= 499) {
          this.dialogUnSpoortError()
        } else {
          this.dialogUnExpectedError()
        }
      }
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
    },
    notifyFailed() {
      this.$vs.notify({
        title: '顔を認識できませんでした',
        text: '別の画像を選んでみよう！',
        color: 'warning',
        position: 'top-right',
        time: 4000
      })
    },

    notifySelect() {
      this.$vs.notify({
        title: '画像を選択しました',
        text: 'さっそく絵文字に変換してみよう',
        color: 'success',
        position: 'top-right',
        time: 3000
      })
    },

    dialogUnSpoortError() {
      this.$vs.dialog({
        color: 'danger',
        title: `対応していない画像が選ばれました`,
        text: 'えもじっくはPNG、JPEG形式の画像に対応しています。',
        acceptText: '閉じる'
      })
    },
    dialogUnExpectedError() {
      this.$vs.dialog({
        color: 'danger',
        title: `予期せぬエラーが発生しました。`,
        text: 'しばらく経ってからもう一度お試しください。',
        acceptText: '閉じる'
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
  $button-color: #27ae60;
  background-color: $button-color;
  box-shadow: darken($color: $button-color, $amount: 10) 0px 3px 0px 0px;
  text-align: center;
  cursor: pointer;
}
input {
  display: none;
}
</style>
