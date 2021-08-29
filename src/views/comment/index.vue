<template>
  <div class="comment">
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- card body -->
      <el-table
        :data="comments.results"
        style="width: 100%; font-size:14px;"
        size="mini"
        v-loading="loading"
      >
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
        >
        </el-table-column>
        <el-table-column
          prop="comment_status"
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.comment_status"
              type="success"
            >
              正常
            </el-tag>
            <el-tag
              v-else
              type="danger"
            >
              关闭
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              :type="scope.row.comment_status?'danger':'success'"
              @click="putCommentsStatus(scope.row)"
              size='small'
            >{{scope.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        style="margin-top: 20px; text-align: right;"
        :total="comments.total_count"
        :current-page.sync="page"
        :page-size="per_page"
        :disabled="loading"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </el-card>

  </div>
</template>
<script>
import { getArticles, putCommentsStatus } from '@/api/article'
export default {
  data() {
    return {
      page: 1,
      per_page: 15,
      loading: true,
      comments: {}
    }
  },
  methods: {
    async getArticlesComment(page = 1) {
      this.loading = true
      const res = await getArticles({
        page,
        per_page: this.per_page,
        response_type: 'comment'
      })
      this.comments = res.data.data
      this.loading = false
    },
    putCommentsStatus(results) {
      const changeValue = results.comment_status
        ? "亲，您是否要关闭当前文章评论功能，如果关闭读者将无法对这篇文章进行评论。"
        : "亲，您是否要打开当前文章评论功能。"
      this.$confirm(`${changeValue}`, '温馨提示', {
        type: 'warning'
      })
        .then(async () => {
          const res = await putCommentsStatus({
            id: results.id.toString(),
            status: !results.comment_status
          })
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.comments.results.forEach(item => {
            if (item.id.toString() === res.data.data.article_id.toString()) {
              item.comment_status = !item.comment_status
            }
          })
        })
        .catch(() => {
          this.$message({
            message: '取消操作',
            type: 'info'
          })
        })
    },
    onCurrentChange() {
      this.getArticlesComment(this.page)
    }
  },
  created() {
    this.getArticlesComment()
  }
}
</script>
<style lang="less" scoped>
</style>