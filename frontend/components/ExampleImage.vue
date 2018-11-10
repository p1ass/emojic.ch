<template>
  <vs-card class="cardx">
    <div slot="header">
      <h3>
        人の顔を認識して絵文字にしてくれます！
      </h3>
    </div>
    <div slot="media">
      <img 
        src="@/assets/images/trump.jpg" 
      >
    </div>
    <div/>  
  </vs-card>
</template>

<script>
export default {
  name: 'ExampleImage'
}
</script>

<style lang="scss" >
@media (min-width: 600px) {
  .cardx {
    width: 600px;
  }
}

h3 {
  font-weight: normal;
}
</style>
