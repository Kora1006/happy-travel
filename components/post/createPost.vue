<template>
  <div class="content-wrap">
      <h2>发表新攻略</h2>
      <p>分享你的个人游记，让更多人看到哦！</p>
      <el-input v-model="input" placeholder="请输入标题"></el-input>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.content-wrap{
    h2{
        font-size: 22px;
        font-weight: 400;
        margin-bottom: 10px;
    }
    p{
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
    }
}
</style>