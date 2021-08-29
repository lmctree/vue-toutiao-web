<template>
  <div>
    <div
      class="headerleft"
      @click="$emit('changecollapse', !value)"
    >
      <i :class="{
          'el-icon-s-fold': !value,
          'el-icon-s-unfold':value,
          'icon':true}">
      </i>
      <span class="text">LKT科技</span>
    </div>
    <el-dropdown>
      <div class="headerright">
        <img
          :src="userProfile.photo"
          alt=""
          class="user-icon"
        >
        <span class="user-name">{{userProfile.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native='goSettings'>个人设置</el-dropdown-item>
        <el-dropdown-item @click.native='loginOut'>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import EventBus from '@/utils/EventBus'
export default {
  props: ['value'],
  data() {
    return {
      userProfile: ''
    }
  },
  methods: {
    loginOut() {
      this.$confirm('你确定要退出登录吗', '提示')
        .then(() => {
          localStorage.removeItem('user')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            message: '已取消退出登录',
            type: 'info'
          })
        })
    },
    async getUserProfile() {
      const res = await getUserProfile()
      this.userProfile = res.data.data
    },
    goSettings() {
      this.$route.path !== '/settings' && this.$router.push('/settings')
    }
  },
  created() {
    this.getUserProfile()
    EventBus.$on('setUser', res => {
      this.userProfile.name = res.name
      this.userProfile.photo = res.photo
    })
  }
}
</script>
<style lang="less">
.headerleft {
  .icon {
    font-size: 24px;
    vertical-align: middle;
  }

  .text {
    vertical-align: middle;
  }
}

.headerright {
  display: flex;
  align-items: center;

  .user-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .user-name {
    color: #333;
    font-weight: 700;
    vertical-align: middle;
    padding-left: 5px;
  }
}
</style>