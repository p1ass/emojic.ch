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
  background-color: #f9ca24;
  height: 9vh;
  margin-bottom: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: normal;
    text-align: center;
    color: white;
  }
}
</style>
