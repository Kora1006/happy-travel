<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 发布内容 -->
      <el-col :span="18">
        <CreatePost/>
      </el-col>
      <!-- 草稿箱 -->
      <el-col :span="5">
        <PostDraft/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CreatePost from "@/components/post/createPost";
import PostDraft from "@/components/post/postDraft";
export default {
  data() {
    return {
      post: {}
    };
  },
  components: {
    CreatePost,
    PostDraft
  },

};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;

  margin: 20px auto;
}
</style>