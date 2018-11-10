<template>
  <section class="container">
    <logo-title/>
    <example-image/>
    
    <div class="buttons">
      <vs-button 
        type="relief" 
        icon="arrow_upward"
        size="large"
        color="success"
        class="button">顔文字に変換する！</vs-button>
      <vs-button 
        type="relief" 
        icon="share"
        size="large"
        class="button">Twitterで共有する！</vs-button>
    </div>
  </section>
</template>

<script>
import LogoTitle from '~/components/LogoTitle'
import ExampleImage from '~/components/ExampleImage'

export default {
  components: {
    LogoTitle,
    ExampleImage
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}

.button {
  margin: 10px 20px;
}
</style>
