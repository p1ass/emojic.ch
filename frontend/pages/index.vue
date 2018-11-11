<template>
  <div>
    <image-card 
      :src="top_image.src" 
      :title="top_image.title" />

    <action-buttons/>

    <div 
      v-for="example in example_images" 
      :key="example.title">
      <image-card 
        :src="example.src" 
        :title="example.title"
      />
    </div>

    <action-buttons/>
  </div>
</template>

<script>
import ImageCard from '~/components/ImageCard'
import ActionButtons from '~/components/ActionButtons'

export default {
  components: {
    ImageCard,
    ActionButtons
  },

  data() {
    return {
      top_image: {
        src: '/images/yoshi.jpg',
        title: 'ほげをふがにしちゃいます！'
      },

      example_images: [
        { src: '/images/yoshi.jpg', title: 'ほげふが' },
        { src: '/images/yoshi.jpg', title: 'ほげふが' },
        { src: '/images/yoshi.jpg', title: 'ほげふが' },
        { src: '/images/yoshi.jpg', title: 'ほげふが' },
        { src: '/images/yoshi.jpg', title: 'ほげふが' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/styles/global.scss';
</style>
