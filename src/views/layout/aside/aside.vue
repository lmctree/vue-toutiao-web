<template>
  <el-menu
    :default-active="$route.path"
    class="nav-menu el-menu-vertical-demo"
    background-color="rgb(0, 32, 51)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="value"
    router
  >
    <!-- logo -->
    <div :class="{'minLogo': value,'logo': true}"></div>
    <!-- 侧边导航栏 -->
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-publish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont icon-custom-comment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-s-grid"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Aside',
  props: ['value'],
  data() {
    return {

    }
  },
  created() {
  }
}
</script>
<style lang="less">
.nav-menu {
  border-right: 0;
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: url("~@/assets/images/logo_admin.png") no-repeat 50%/140px;
    background-position-x: 15px;
  }

  .minLogo {
    background: url("~@/assets/images/logo.png") no-repeat 50%/140px;
    background-size: 36px;
    background-position-x: 15px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>