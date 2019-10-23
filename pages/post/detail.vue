<template>
  <div class="container">
    <div class="main">
      <div class="breadcrumb">
        <div class="el-breadcrumb">
          <nuxt-link to="/post">
            <span class="el-breadcrumb__item">
              <span class="is-link">旅游攻略 ／</span>
            </span>
          </nuxt-link>
          <span class="el-breadcrumb__item">
            <span class="el-breadcrumb__inner">攻略详情</span>
            <span class="el-breadcrumb__separator">/</span>
          </span>
        </div>
      </div>
      <h1>{{data.title}}</h1>
      <div class="post-info">
        <span>攻略：{{data.city.created_at}}</span>
        <span>阅读：{{data.city.level}}</span>
      </div>
      <!-- 内容详情 -->
      <div class="post-content" v-html="data.content"></div>
      <!-- 点赞 -->
      <div class="post-ctrl">
        <div class="el-row is-justify-center el-row--flex">
          <div class="ctrl-item">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{data.comments.length}})</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconstar1"></i>
            <p>收藏</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </div>
          <div class="ctrl-item">
            <i class="iconfont iconding"></i>
            <p>点赞({{data.like}})</p>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <Comments :list="list" :id="id" :indexsize="indexsize"/>

      <!-- 这个是分页 -->
      <el-pagination background layout="prev, pager, next"     :total="total" 
      
      @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <div class="postright">
      <Right />
    </div>
  </div>
</template>

<script>
import Comments from "@/components/post/comments";
import Right from "@/components/post/postright";
export default {
  data() {
    return {
      data: {
        city: {},
        comments: []
      },
      total:0,
      id: 0,
      list: [],         //这个是评论列表
      indexnum: 10,
      indexsize: '',   //这个是从第几条开始吗

    };
  },
  components: {
    Comments,
    Right
  },
  methods:{
    handleCurrentChange(value){
     
      this.indexsize=value*this.indexnum
      const param = {
      post: this.id,
      _limit: this.indexnum,
      _start: this.indexsize
    };
    // 获取评论页
      this.$axios({
        url: `/posts/comments?`,
        params: param
      }).then(res => {
        this.total=res.data.total
        const { data } = res.data;
        this.list = data;       
      });
    } 
  },
  
  watch: {
    $route(to, from) {
      const id = this.$route.query.id;
      this.$axios({
        url: `/posts?id=${id}`
      }).then(res => {
        console.log("这个是文章详情页", res);
        
        const { data } = res.data;
        this.data = data[0];
      });
    }
  },
  mounted() {
    //发送文章详情的axjx
    const id = this.$route.query.id;
    this.id = id;
    this.$axios({
      url: `/posts?id=${id}`
    }).then(res => {
      console.log("这个是文章详情页", res);
      const { data } = res.data;
      this.data = data[0];
    });
    //发送评论axjx
    const param = {
      post: id,
      _limit: this.indexnum,
      _start: this.indexsize
    };    
      this.$axios({
        url: `/posts/comments?`,
        params: param
      }).then(res => {
        console.log(res)
        this.total=res.data.total
        const { data } = res.data;
        
        console.log("这个评论页list", data);
        this.list = data;        
      });
    
  }
};
</script>

<style　scoped lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.main {
  width: 700px;
  /deep/ img {
    max-width: 700px !important;
  }
}
.el-breadcrumb {
  font-size: 16px;
  margin: 20px 0;
  .is-link {
    font-weight: 600;
    cursor: pointer;
  }
}
h1 {
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.post-info {
  text-align: right;
  font-size: 14px;
  color: #a3abb8;
  padding: 14px 0;
}
.post-ctrl {
  padding: 20px 0;
}
.ctrl-item {
  text-align: center;
  padding: 0 20px;

  i {
    color: orange;
    font-size: 28px;
  }
  p {
    margin-top: 10px;
    color: #999;
  }
}
.cmt-input {
  margin-bottom: 15px;
}
.el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>