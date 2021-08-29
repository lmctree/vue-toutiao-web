<template>
  <div class="fans">
    <Echarts></Echarts>
  </div>
</template>
<script>
import Echarts from '../../components/chars/Echarts.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    Echarts
  }
}
</script>
<style lang="less" scoped>
.fans {
  height: 100%;
}
</style>