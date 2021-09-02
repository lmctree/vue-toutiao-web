
<template>
  <div
    id="container"
    class="bmap"
  ></div>
</template>

<script>
export default {
  name: 'BmapDemo',
  mounted() {
    /* eslint-disable no-undef */
    var map = new BMapGL.Map('container')
    // map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 18);
    // 创建地址解析器实例
    var myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint('岳麓区八家湾小区', function (point) {
      if (point) {
        console.log(point)
        // map.centerAndZoom(point, 18);
        // map.addOverlay(new BMapGL.Marker(point, { title: '岳麓区八家湾小区' }))

        map.centerAndZoom(point, 18)
        map.enableScrollWheelZoom(true)
        var opts = {
          position: new BMapGL.Point(112.88826478862994, 28.209027960097444), // 指定文本标注所在的地理位置
          offset: new BMapGL.Size(30, -30) // 设置文本偏移量
        }
        // 创建文本标注对象
        var label = new BMapGL.Label('岳麓区八家湾小区 GL版本', opts)
        // 自定义文本标注样式
        label.setStyle({
          color: 'blue',
          borderRadius: '5px',
          borderColor: '#ccc',
          padding: '10px',
          fontSize: '16px',
          height: '30px',
          lineHeight: '30px',
          fontFamily: '微软雅黑'
        })
        map.addOverlay(label)
      } else {
        alert('您选择的地址没有解析到结果！')
      }
    }, '长沙市')
  },
  methods: {}
}
</script>

<style scoped lang="less">
.bmap {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>
