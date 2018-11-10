<template>
  <header>
    <h1>タイトル</h1>
  </header>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>

<style lang="scss" scoped>
header {
  background-color: #27ae60;
  height: 10vh;
  margin-bottom: 20px;
  border-bottom: 3px solid #ccc;

  h1 {
    font-weight: normal;
    text-align: center;
  }
}
</style>
