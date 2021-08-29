<template>
  <div class="article">
    <div class="article_top">
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
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-form
          ref="form"
          label-width="80px"
        >
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select
              v-model="channelId"
              placeholder="请选择频道"
            >
              <el-option
                label="全部"
                :value="null"
              ></el-option>
              <el-option
                v-for='item in channels'
                :key='item.id'
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期">
            <el-date-picker
              v-model="chooseDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :disabled="loading"
              @click="getArticles(1)"
            >筛选</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="article_main">
      <el-card
        shadow="always"
        :body-style="{ padding: '20px' }"
      >
        <div slot="header">
          <span>
            根据筛选条件共查询到 {{totalCount}} 条结果:
          </span>
        </div>
        <el-table
          :data="articles"
          style="width: 100%; font-size:14px;"
          size="mini"
          v-loading="loading"
        >
          <el-table-column
            prop="date"
            label="封面"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 150px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="fill"
                lazy
              >
                <div
                  slot="placeholder"
                  class="image-slot"
                >
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
          >
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">
                {{ articleStatus[scope.row.status].text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-edit"
                type="primary"
                @click='$router.push("/publish?id="+scope.row.id)'
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteArticle(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          style="margin-top: 20px; text-align: right;"
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :disabled="loading"
          :current-page.sync="page"
          @current-change="onCurrentChange"
        >
        </el-pagination>
      </el-card>

    </div>
  </div>
</template>
<script>
import { getArticles, getArticleChannels, deleteArticle } from '@/api/article'
export default {
  data() {
    return {
      loading: true,
      channels: [],
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      totalCount: 0, // 总数据条数
      page: 1,
      pageSize: 10, // 每页大小
      status: null,
      channelId: null,
      chooseDate: null
    }
  },
  methods: {
    // 筛选文章
    async getArticles(page = 1) {
      this.loading = true
      const { data: { data: { results, total_count: totalCount } } } = await getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.chooseDate ? this.chooseDate[0] : null, // 开始日期
        end_pubdate: this.chooseDate ? this.chooseDate[1] : null // 截止日期
      })
      this.articles = results
      this.totalCount = totalCount
      this.loading = false
    },
    // 获取频道
    async getArticleChannels() {
      const res = await getArticleChannels()
      this.channels = res.data.data.channels
    },
    // 分页点击的时候变换
    onCurrentChange() {
      this.getArticles(this.page)
    },
    // 删除文章
    deleteArticle(target) {
      this.$confirm('你确定要删除吗', '删除提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(async () => {
          await deleteArticle(target.toString())
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          // 模拟一下删除
          this.articles.splice(this.articles.findIndex(item => item.id.toString() === target.toString()), 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  created() {
    this.getArticles(1)
    this.getArticleChannels()
  }
}
</script>
<style lang="less" scoped>
.article {
  .article_top {
    margin-bottom: 20px;

    .el-form-item:last-of-type {
      margin-bottom: 0;
    }
  }

  // .el-card__body {
  //  : 16px;
  // }
}
</style>