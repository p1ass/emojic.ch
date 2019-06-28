<template>
  <footer>
    <a href="#">
      <h1>えもじっく😋</h1>
    </a>
  </footer>
</template>

<script>
export default {
  name: 'FooterNav'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

footer {
  background-color: $main_color;
  height: 60px;
  margin-bottom: 0px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-weight: 500;
  text-align: center;
  color: white;
  font-size: 20px;
}

@media (max-width: 600px) {
  footer {
    height: 40px;
  }
  h1 {
    font-size: 22px;
  }
}
</style>
