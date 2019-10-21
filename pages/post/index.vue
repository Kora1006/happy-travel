<template>
  <el-row type="flex" class="container" justify="space-between">
    <!-- 右侧推荐城市 -->
    <el-col class="post-aside">
      <PostAside />
    </el-col>
    <!-- 左侧搜索栏和攻略列表 -->
    <el-col class="post-content">
      <PostSearch />
      <PostItem v-for="(item,index) in postList" :key="index" :postData="item" />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5,10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="postDataList.length"
        class="pagination"
      ></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import PostAside from "@/components/post/postAside";
import PostSearch from "@/components/post/postSearch";
import PostItem from "@/components/post/postItem";
export default {
  components: {
    PostAside,
    PostSearch,
    PostItem
  },
  data() {
    return {
      postDataList: [],
      pageSize: 5,
      pageIndex: 1
    };
  },
  methods: {
    // 获取数据
    async getPostData() {
      const res = await this.$axios({
        url: "/posts",
        params: {
          city: this.$route.query.city
        }
      });
      if (res.status == 200) {
        const { data } = res.data;
        this.postDataList = data;
        console.log(data)
      }
    },
    // 更换每页显示条数
    handleSizeChange(value) {
      this.pageSize = value;
    },
    // 更换页码
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
  },
  mounted() {
    this.getPostData();
  },
  computed: {
    postList() {
      let posts = this.postDataList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
      return posts;
    }
  },
  watch: {
    $route() {
      this.getPostData();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;

  margin: 20px auto;
}
.post-aside {
  width: 30%;
}
.post-content {
  width: 70%;
}
.pagination {
  text-align: center;
  margin: 10px;
}
</style>