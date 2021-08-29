<template>
  <el-container class="layout">
    <el-aside width="auto">
      <!-- 侧边栏 -->
      <home-aside
        class="aside"
        v-model="isCollapse"
      ></home-aside>
    </el-aside>

    <el-container>
      <el-header class="header">
        <!-- 右边头部 -->
        <homeHeader
          v-model="isCollapse"
          @changecollapse='changeCollapse'
        ></homeHeader>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view :key='$route.fullPath' />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import homeAside from './aside/aside'
import homeHeader from './header/header'
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: false
    }
  },
  components: {
    homeAside,
    homeHeader
  },
  methods: {
    changeCollapse(value) {
      this.isCollapse = value
    }
  }
}
</script>
<style lang="less" scoped>
.layout {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .aside {
    background-color: #d3dce6;
    .aside-menu {
      height: 100%;
    }
  }

  .el-aside {
    background: #002033;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    div {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
    }
  }

  .main {
    background-color: #e9eef3;
  }
}
</style>