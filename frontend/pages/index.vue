<template>
  <div>
    <vs-row 
      vs-type="flex" 
      vs-justify="center"
      class="container">

      <vs-col 
        vs-type="flex" 
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        vs-sm="8"
        vs-xs="11"
      >
        <image-card 
          :src="top_image.src" 
          :title="top_image.title" />
      </vs-col>
    </vs-row>

    <action-buttons/>

    <vs-row 
      vs-type="flex" 
      vs-justify="center"
    >
      <vs-col 
        vs-type="flex" 
        vs-justify="scenter"
        vs-w="4"
        vs-sm="8"
        vs-xs="11"
        class="examples"
      >
        <div 
          v-for="example in example_images" 
          :key="example.title">

          <image-card 
            :src="example.src" 
            :title="example.title" />
        </div>
      </vs-col>

    </vs-row>

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

.container {
  // flex-direction: column;
  text-align: center;
}

.examples {
  flex-wrap: wrap;
}
.button {
  @include button;
}
</style>
