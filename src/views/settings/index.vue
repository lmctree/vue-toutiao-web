<template>
  <div class="settings">
    <el-card
      shadow="always"
      class="box-card"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-col
        :span="12"
        :offset="0"
      >
        <el-form
          :model="userProfile"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="编号">
            {{ userProfile.id }}
          </el-form-item>
          <el-form-item label="手机">
            {{ userProfile.mobile }}
          </el-form-item>

          <el-form-item
            label="媒体名称"
            prop="desc"
          >
            <el-input v-model="userProfile.name"></el-input>
          </el-form-item>

          <el-form-item
            label="媒体介绍"
            prop="desc"
          >
            <el-input
              type="textarea"
              v-model="userProfile.intro"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="邮箱"
            prop="desc"
          >
            <el-input v-model="userProfile.email"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type='primary'
              @click="updateUserprofile"
              :loading="updateProfileLoading"
            >保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
        :span="6"
        :offset="2"
      >
        <label for="file">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="userProfile.photo"
          ></el-avatar>
          <p>点击修改头像</p>
        </label>
        <input
          id="file"
          type="file"
          ref="file"
          hidden
          @change="onFileChange"
        >
      </el-col>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        >
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUserProfile, editUserProfile, updateUserPhoto } from '@/api/user'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import EventBus from '@/utils/EventBus'
export default {
  data() {
    return {
      userProfile: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: ""
      },
      updateProfileLoading: false,
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null, // 裁切器示例
      updatePhotoLoading: false // 更新用户头像 loading 状态
    }
  },
  methods: {
    async getUserProfile() {
      const res = await getUserProfile()
      this.userProfile = res.data.data
    },
    async updateUserprofile() {
      this.updateProfileLoading = true
      const { name, intro, email } = this.userProfile
      await editUserProfile({
        name, intro, email
      })
      EventBus.$emit('setUser', this.userProfile)
      this.$message({
        message: '保存设置成功',
        type: 'success'
      })
      this.updateProfileLoading = false
    },
    onFileChange() {
      // 处于图片预览
      const file = this.$refs.file

      const blobData = window.URL.createObjectURL(file.files[0])

      this.previewImage = blobData

      // 展示弹出层，预览用户选择的图片
      this.dialogVisible = true

      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = ''
    },

    onDialogOpened() {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img 必须是可见状态才能正常完成初始化
      //       因为我们这里要在对话框里面初始化裁切器
      //       所以务必要在对话框完全打开的状态去进行初始化。
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']

      // 第1次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器：
      //    方式一：裁切器.replace 方法
      //    方式二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false

        // 当你移动裁切器的时候会触发调用 crop 方法
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
    },

    onDialogClosed() {
      // 对话框关闭，销毁裁切器
      // this.cropper.destroy()
    },

    onUpdatePhoto() {
      // 让确定按钮开始 loading
      this.updatePhotoLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像请求提交 fd
        updateUserPhoto(fd).then(res => {
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图展示

          // 直接把裁切结果的文件对象转为 blob 数据本地预览
          this.userProfile.photo = window.URL.createObjectURL(file)

          // 关闭确定按钮的 loading
          this.updatePhotoLoading = false

          this.$message({
            type: 'success',
            message: '更新头像成功'
          })

          // 更新顶部登录用户的信息
          EventBus.$emit('setUser', this.userProfile)

          // 把服务端返回的图片进行展示有点慢
          // this.user.photo = res.data.data.photo
        })
      })
    }
  },
  created() {
    this.getUserProfile()
  }
}
</script>
<style lang="less" scoped>
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>