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
      <img 
        :src="src" 
        class = "card-image"
      >
    </div>
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
  width: 90vw;
}

@media (min-width: 600px) {
  .cardx {
    width: 600px;
  }
}

h3 {
  font-weight: normal;
}
</style>
