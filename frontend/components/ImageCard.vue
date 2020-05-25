<template>
  <vs-card :fixed-height="true" class="cardx">
    <div slot="header">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div slot="media">
      <img :src="src" class="card-image" />
    </div>
    <div />
  </vs-card>
</template>

<script>
export default {
  name: 'ExampleImage',
  props: {
    title: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.cardx {
  margin: 20px 5px;
  text-align: center;
  width: 90vw;
  box-shadow: 0 0px 25px 5px rgba(0, 0, 0, 0.1);
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
