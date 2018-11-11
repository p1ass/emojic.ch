<template>
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
    </vs-col>
  </vs-row>
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
  margin: 20px 0;
  text-align: center;
  // width: 400px;
}

h3 {
  font-weight: normal;
}
</style>
