<template>
  <div class="container">
      <el-row type="flex" justify="space-between">
          <!-- 发布内容 -->
          <el-col :span="18">
              <CreatePost/>
          </el-col>
        <!-- 草稿箱 -->
          <el-col :span="5"></el-col>
      </el-row>

  </div>
</template>

<script>
import CreatePost from '@/components/post/createPost'
export default {
components:{
    CreatePost
}
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;

  margin: 20px auto;
}
</style>