<template>
  <div>
    <div class="flex">
      <image-card 
        :src="top_image.src" 
        :title="top_image.title" />
    </div>

    <action-buttons/>

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
        title: 'ほげをふがにしちゃいます！'
      },

      example_images: [
        { src: '/images/yoshi.jpg', title: 'ほげふが1' },
        { src: '/images/yoshi.jpg', title: 'ほげふが2' },
        { src: '/images/yoshi.jpg', title: 'ほげふが3' },
        { src: '/images/yoshi.jpg', title: 'ほげふが4' }
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
