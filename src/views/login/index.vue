<template>
  <div class="login">
    <div class="loginbox">
      <el-form
        class="formcontainer"
        :model="form"
        ref="form"
        :rules="rules"
        :inline="false"
        size="normal"
      >
        <img
          src="~@/assets/images/logo_index.png"
          alt=""
        >
        <el-form-item prop='mobile'>
          <el-input v-model="form.mobile">
            <i
              slot="prefix"
              class="iconfont icon-phone"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model="form.code">
            <i
              slot="prefix"
              class="iconfont icon-yanzhengma"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item
          class="tl"
          prop='agree'
        >
          <el-checkbox
            v-model="form.agree"
            label="我已阅读并同意用户协议和隐私条款"
            :indeterminate="false"
          ></el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="width:100%"
            :loading="loginloading"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        // 自定义校验规则
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                // 验证通过
                callback()
              } else {
                // 验证失败
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      },
      loginloading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        this.loginloading = true
        if (valid) {
          this.$store.dispatch("login", this.form)
        } else {
          this.$message({
            type: 'info',
            message: '验证不通过'
          })
        }
        setTimeout(() => {
          this.loginloading = false
        }, 1000)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: url("~@/assets/images/login_bg.jpg");
  background-color: grey;
  background-size: cover;

  .loginbox {
    width: 400px;
    height: 340px;
    background-color: #fff;
    text-align: center;

    img {
      width: 50%;
      margin: 20px auto;
    }
  }
  .formcontainer {
    width: 75%;

    .tl {
      text-align: left;
    }
  }
}

.login,
.loginbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>