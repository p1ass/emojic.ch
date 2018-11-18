<template>
  <div>
    <div class="flex">
      <image-card 
        :src="top_image.src" 
        :title="top_image.title" />
    </div>
    <action-buttons/>
    <p class="flex attention">サーバーに画像を保存しません！</p>
    <p class="flex attention">画像は長押しで保存してね！</p>
    <!-- admax -->
    <div class="flex ad">
      <!-- admax -->
      <div 
        class="admax-switch" 
        data-admax-id="cfb331b4c77e13981a1eaa3ee499f3d3" 
        style="display:inline-block;"/>
      <script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "cfb331b4c77e13981a1eaa3ee499f3d3", type: "switch"});</script>
      <script 
        type="text/javascript" 
        charset="utf-8" 
        src="//adm.shinobi.jp/st/t.js" 
      />
      <!-- admax -->
    </div>
    <!-- admax -->

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
    <!-- admax -->
    <div class="flex ad">
      <div 
        class="admax-switch" 
        data-admax-id="62ffd20c34051861edc5b68c6a4dca84" 
        style="display:inline-block;"/>
      <script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "62ffd20c34051861edc5b68c6a4dca84", type: "switch"});</script>
      <script 
        type="text/javascript" 
        charset="utf-8" 
        src="//adm.shinobi.jp/st/t.js" 
      />
    </div>
    <!-- admax -->
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

.ad {
  margin: 10px 0;
}

.attention {
  color: rgb(130, 130, 130);
}
</style>
