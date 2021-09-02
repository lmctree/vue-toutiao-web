<template>
  <div class="fans">
    <Echarts></Echarts>
    <Fans></Fans>
  </div>
</template>
<script>
import Echarts from '../../components/chars/Echarts.vue'
import Fans from '@/components/map'
export default {
  data() {
    return {

    }
  },
  components: {
    Echarts,
    Fans
  }
}
</script>
<style lang="less" scoped>
.fans {
  height: 100%;
}
</style>