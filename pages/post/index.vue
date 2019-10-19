<template>
  <div class="container">
    <!-- 右侧推荐城市 -->
    <div class="post-aside">
      <PostAside/>
    </div>
    <!-- 左侧搜索栏和攻略列表 -->
    <div class="post-content">
      
    </div>
  </div>
</template>

<script>
import PostAside from '@/components/post/postAside'
export default {
  components:{
    PostAside
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
</style>