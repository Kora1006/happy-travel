<template>
  <div class="menu-wrap">
    <!-- 侧边菜单栏 -->
    <div class="menu-body" @mouseleave="currentTab = -1">
      <div
        class="menu-item"
        v-for="(item,index) in options"
        :key="index"
       
      >
        <div class="menu-name" :class="{active:currentTab === index}"   @mouseover="handleChangeTab(index)">
          <span>{{item.type}}</span>
          <i class="iconfont el-icon-arrow-right" style="font-size:20px"></i>
        </div>

        <div class="menu-list" v-if="currentTab === index">
          <div v-for="(value,id) in item.children" :key="id" style="padding:5px 0px">
            <nuxt-link :to="`/post?city=${value.city}`">
              <i class="num">{{id+1}}</i>
              <span style="color:#ffa500;padding:0 5px;">{{value.city}}</span>
              <span style="padding:10px 0px">{{value.desc}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐城市 -->
    <div class="menu-recommand">
      <h3>推荐城市</h3>
      <nuxt-link to="#">
        <img src="/pic_sea.jpeg" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {},
      isShow: false,
      currentTab: -1
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        const { data } = res.data;
        this.options = data;
      }
    });
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style lang="less" scoped>
.menu-body {
  position: relative;
  width: 640px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-name {
    display: flex;
    justify-content: space-between;
    width: 240px;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  .menu-list {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    width: 400px;
    box-sizing: border-box;
    padding: 10px 0px 10px 20px;
    border: 1px solid #eee;
    background-color: #fff;
    color: #999;
    .num {
      font-size: 20px;
      color: #ffa500;
      font-style: italic;
    }
    span:hover {
      text-decoration: underline;
    }
  }
}
.active {
  color: #ffa500;
}
.menu-recommand{
    width: 240px;
    h3{
        padding: 10px;
        font-size: 16px;
        font-weight: normal;
        line-height: 30px;
        border-bottom: 1px solid #eee;
    }
    img{
        margin-top: 10px;
        display: block;
        width: 100%;
    }
}
</style>