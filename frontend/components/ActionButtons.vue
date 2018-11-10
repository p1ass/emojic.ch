<template>
  <div class="buttons">
    <vs-button 
      type="relief" 
      icon="arrow_upward"
      size="large"
      color="success"
      class="button">ふがに変換する！</vs-button>
    <vs-button 
      type="relief" 
      icon="share"
      size="large"
      class="button">Twitterで共有する！</vs-button>
  </div>
</template>

<script>
export default {
  name: 'Buttons'
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
</style>
