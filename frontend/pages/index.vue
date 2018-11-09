<template>
  <section class="container">
    <div class = "title">
      タイトル
    </div>
    <vs-button 
      type="relief" 
      icon="arrow_upward"
      size="large">顔文字に変換する！</vs-button>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  background-color: antiquewhite;
  width: 600px;
  height: 200px;
  margin-bottom: 20px;
}
</style>
