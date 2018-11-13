<template>
  <div>
    <div class="flex">
      <image-card 
        :src="top_image.src" 
        :title="top_image.title" />
    </div>

    <action-buttons/>
    <script src="//adm.shinobi.jp/s/f6872b8e65e9c91ca74d88b2b620bcde"/>
    <div class="flex">
      <div 
        v-for="example in example_images" 
        :key="example.title"
      >
        <image-card 
          :src="example.src" 
          :title="example.title"
        />
      </div>
    </div>

    <action-buttons/>
    <script src="//adm.shinobi.jp/s/f6872b8e65e9c91ca74d88b2b620bcde"/>
  </div>
</template>

<script>
import ImageCard from '~/components/ImageCard'
import ActionButtons from '~/components/ActionButtons'
import { mapState } from 'vuex'

export default {
  components: {
    ImageCard,
    ActionButtons
  },
  data() {
    return {
      top_image: {
        // 最初は直接叩かないと上手く行かない
        src: this.$store.state.result.result_src,
        title: 'あなたの顔を絵文字😄に変換!?'
      },

      example_images: [
        {
          src: '/images/multi_faces.jpg',
          title: '複数の顔も認識してくれます😁'
        },
        { src: '/images/random.jpg', title: '選ばれる絵文字はランダム😜' },
        { src: '/images/yokogao.jpg', title: '横顔は認識しづらいよ😩' }
      ]
    }
  },

  head() {
    return {
      script: [
        {
          src:
            'https://cdn.rawgit.com/blueimp/JavaScript-Load-Image/v2.6.2/js/load-image.all.min.js'
        }
      ]
    }
  },

  computed: {
    ...mapState('result', ['result_src'])
  },

  watch: {
    result_src() {
      this.top_image.src = this.result_src
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}
</style>
