<template>
  <div class="container">
    <!-- 右侧推荐城市 -->
    <div class="post-aside">
      <PostAside />
    </div>
    <!-- 左侧搜索栏和攻略列表 -->
    <div class="post-content">
      <PostSearch />
    </div>
  </div>
</template>

<script>
import PostAside from "@/components/post/postAside";
import PostSearch from "@/components/post/postSearch";
export default {
  components: {
    PostAside,
    PostSearch
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 1000px;
  height: 1000px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.post-aside {
  position: absolute;
  top: 0;
  left: 0;

}
.post-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 730px;
}
</style>