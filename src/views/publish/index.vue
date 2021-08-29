<template>
  <div class="publish">
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
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        ref="publish"
        :model="publish"
        :rules="publishRules"
        label-width="80px"
      >
        <el-form-item
          prop="title"
          label="标题"
        >
          <el-input v-model="publish.title"></el-input>
        </el-form-item>

        <el-form-item
          prop="content"
          label="内容"
        >
          <el-tiptap
            v-model="publish.content"
            :extensions="extensions"
            lang="zh"
            height="350"
            placeholder="请输入文章内容"
          >
          </el-tiptap>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="publish.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <div
            class="coverBox"
            v-if="publish.cover.type > 0"
          >
            <upload-cover
              :key="cover"
              v-for="(cover, index) in publish.cover.type"
              v-model="publish.cover.images[index]"
            />
          </div>

        </el-form-item>

        <el-form-item
          prop="channel_id"
          label="频道"
        >
          <el-select
            v-model="publish.channel_id"
            placeholder="请选择频道"
          >
            <el-option
              v-for='item in channels'
              :key='item.id'
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if='$route.query.id'>
          <el-button
            type="success"
            @click="onPublish(false)"
          >修改</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button
            type="primary"
            @click="onPublish(false)"
          >发表</el-button>
          <el-button
            type="default"
            @click="onPublish(true)"
          >存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getArticleChannels, addArticle, getArticleById, editArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
import UploadCover from './components/UploadCover.vue'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

export default {
  data() {
    return {
      channels: [],
      publish: {
        title: '',
        content: '',
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 1,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道' }
        ]
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          async uploadRequest(file) {
            const fd = new FormData()
            fd.append('image', file)
            const res = await uploadImage(fd)
            return res.data.data.url
          }
        }
        ),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
        new TextColor()
      ]
    }
  },
  methods: {
    async getArticleChannels() {
      const res = await getArticleChannels()
      this.channels = res.data.data.channels
    },
    onPublish(draft = false) {
      this.$refs.publish.validate(async valid => {
        if (valid) {
          if (this.$route.query.id) {
            await editArticle(this.$route.query.id, this.publish, draft)
            this.$message({
              message: '修改文章成功',
              type: 'success'
            })
            this.$router.push('/article')
          } else {
            await addArticle(this.publish, draft)
            this.$message({
              message: draft ? '存入草稿成功' : '发表文章成功',
              type: 'success'
            })
            this.$router.push('/article')
          }
        }
      })
    },
    async getArticle(id) {
      const res = await getArticleById(id)
      this.publish = res.data.data
    }
  },
  created() {
    this.getArticleChannels()
    this.$route.query.id && this.getArticle(this.$route.query.id)
  },
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  }
}
</script>
<style lang="less" scoped>
// .el-radio-group {
//   float: left;
// }
.upload-cover {
  float: left;
  margin-left: 10px;
}
.upload-cover:first-of-type {
  margin-left: 0;
}
</style>