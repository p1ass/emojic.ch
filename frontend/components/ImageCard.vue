<template>
  <vs-card 
    :actionable="true" 
    class="cardx">
    <div slot="header">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div slot="media">
      <a 
        :href="src" 
        :src="src"
        target="_blank">
        <img 
          :src="src"
          class = "card-image"
        >
    </a></div>
    <div/>  
  </vs-card>
</template>

<script>
export default {
  name: 'ExampleImage',
  props: {
    title: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.cardx {
  margin: 20px auto;
  text-align: center;
  width: 90vw;
}

@media (min-width: 600px) {
  .cardx {
    width: 540px;
  }
}

h3 {
  font-size: 19px;
  font-weight: normal;
}
</style>
