<template>
  <div class="container">
    <el-row type="flex" align="middle" justify="center" class="main">
      <div class="form-wrap">
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active:currentTab === index}"
            v-for="(item,index) in tabs"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <LoginForm v-if="currentTab === 0" />
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm";
export default {
  data() {
    return {
      tabs: ["登录", "注册"],
      currentTab: 0
    };
  },
  components: {
    LoginForm
  }
};
</script>

<style lang="less" scoped>
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;

  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .form-wrap {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>