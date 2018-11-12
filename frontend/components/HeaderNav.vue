<template>
  <header>
    <h1>えもじっく😋</h1>
  </header>
</template>

<script>
export default {
  name: 'HeaderNav'
}
</script>

<style lang="scss" scoped>
header {
  background-color: $main_color;
  height: 80px;
  margin-bottom: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-weight: 500;
  text-align: center;
  color: white;
  font-size: 40px;
}

@media (max-width: 600px) {
  header {
    height: 60px;
  }
  h1 {
    font-size: 32px;
  }
}
</style>
