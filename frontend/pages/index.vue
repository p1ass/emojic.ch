<template>
  <div>
    <div class="flex">
      <image-card 
        :src="result_src" 
        title="あなたの顔に自動でスタンプ😄" />
    </div>
    <action-buttons/>
    <p class="flex attention">画像は長押しで保存してね</p>

    <div class="flex ad">
      <div 
        v-if="is_mobile"
        class="admax-ads" 
        data-admax-id="0583263027895ecbac9c67f7788a5a74" 
        style="display:inline-block;width:320px;height:50px;"/>
      <script type="text/javascript">(admaxads = window.admaxads || []).push({admax_id: "0583263027895ecbac9c67f7788a5a74", type: "banner"});</script>
      <script 
        type="text/javascript" 
        charset="utf-8" 
        src="//adm.shinobi.jp/st/t.js" 
        async/>
    </div>

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
  </div>
</template>

<script>
import ImageCard from '~/components/ImageCard'
import ActionButtons from '~/components/ActionButtons'
import { mapState } from 'vuex'
import isMobile from 'ismobilejs'
export default {
  components: {
    ImageCard,
    ActionButtons
  },
  data() {
    return {
      example_images: [
        {
          src: '/images/multi_faces.jpg',
          title: '複数の顔も認識してくれます😁'
        },
        { src: '/images/random.jpg', title: '選ばれる絵文字はランダム😜' },
        { src: '/images/cat.jpg', title: '動物の顔は認識できないよ😹' }
      ],
      is_mobile: isMobile.any
    }
  },

  computed: {
    ...mapState('result', ['result_src'])
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
