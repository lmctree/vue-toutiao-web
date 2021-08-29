<template>
  <div class="error">
    <img
      src="~@/assets/images/404.png"
      alt=""
    >
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.error {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>