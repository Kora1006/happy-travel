<template>
  <el-row type="flex" class="container" justify="space-between">
    <!-- 右侧推荐城市 -->
    <el-col class="post-aside">
      <PostAside />
    </el-col>
    <!-- 左侧搜索栏和攻略列表 -->
    <el-col class="post-content">
      <PostSearch />
      <PostItem
        v-for="(item,index) in postDataList"
        :key="index"
        :postData="item"
        v-show="postDataList"
      />
      <div class="tips" v-if="postDataList.length ==0">
        <i class="el-icon-warning-outline"></i>
        <p>该城市还未有攻略哦，快去添加吧(*^▽^*)</p>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5,10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </el-col>
    <div v-show="false">{{changeData}}</div>
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
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    // 获取数据
    getPostData(start, limit) {
      this.$axios({
        url: "/posts",
        params: {
          city: this.$route.query.city,
          _start: start,
          _limit: limit
        }
      }).then(res => {
        let { data } = res.data;
        console.log(data);

        this.postDataList = data;
      });
    },
    // 更换每页显示条数
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
    },
    // 更换页码
    handleCurrentChange(value) {
      this.pageIndex = value;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts",
      params: {
        city: this.$route.query.city
      }
    }).then(res => {
      this.total = res.data.total;
      let start = (this.pageIndex - 1) * this.pageSize;
      let limit = this.pageSize;
      this.getPostData(start, limit);
    });
  },
  computed: {
    changeData() {
      let start = (this.pageIndex - 1) * this.pageSize;
      let limit = this.pageSize;
      this.getPostData(start, limit);
      return;
    }
  },
  watch: {
    $route() {
      this.$axios({
        url: "/posts",
        params: {
          city: this.$route.query.city
        }
      }).then(res => {
        this.total = res.data.total;
        this.getPostData();
      });
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
.tips {
  margin: 50px auto;
  text-align: center;
  color: #ddd;
  font-size: 50px;
  p {
    font-size: 20px;
    color: #999;
  }
}
</style>