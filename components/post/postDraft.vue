<template>
  <div class="draft-wrap">
    <h3 style="color:#ffa500;">
      草稿箱
      <i class="el-icon-box"></i>
    </h3>
    <p style="font-size:12px;color:#999;">共计{{postList.length}}篇</p>
    <el-row
      type="flex"
      class="post-item"
      v-for="(item,index) in postList"
      :key="index"
      v-if="postList.length"
    >
      <el-col :span="18">
        <div class="post-title" @click="handleEditPost(index)">
          <i class="el-icon-edit"></i>
          {{item.title}}
        </div>
        <span style="color:#999;font-size:13px">{{item.timer}}</span>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" @click="handleRemove(index)">移除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: []
    };
  },
  methods: {
    //   获取草稿箱内容
    getPostData() {
      const posts = this.$store.state.post.postDraftList;
      this.postList = posts;
    },
    // 移除文章
    handleRemove(index) {
      this.$store.commit("post/removePostData", index);
      this.getPostData();
    },
    // 编辑草稿箱文档
    handleEditPost(index) {
 
      this.$router.push('/post/create?index='+index)
    }
  },
  mounted() {
    this.getPostData();
  },
  watch: {
    $store() {
      this.getPostData();
    }
  }
};
</script>

<style lang="less" scoped>
.draft-wrap {
  border: 1px solid #cccccc;
  box-shadow: 1px 1px #eee;
  padding: 10px;
}
.post-item {
  margin: 10px 0px;
  .post-title {
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/deep/ .el-button {
  font-size: 13px;
  padding: 10px;
}
</style>