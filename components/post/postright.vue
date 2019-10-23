<template>
  <div class="right">
    <h4 class="aside-title" data-v-741ea8d8>相关攻略</h4>

    <div class="box1" v-for="(item,index) in list" :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <div class="box">
          <img :src="item.images[0]" alt />
          <div class="boxpost">
            <h4>{{item.title}}</h4>
            <span>
              <i>阅读:{{item.watch}}</i>
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    const id = this.$route.query.id;

    this.$axios({
      url: `/posts/recommend?id=${id}`
    }).then(res => {
      const { data } = res.data;
      console.log("这个是推荐文章", data);
      this.list = data;
    });
  }
};
</script>

<style scoped lang="less">
.right {
  width: 280px;
  > h4 {
    font-size: 28px;
    padding: 15px 0px;
    font-weight: 400;
  }
}
.box {
  display: flex;
  padding: 25px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 80px;
  img {
    display: block;
    width: 100px;
  }
  .boxpost {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 15px;
    h4 {
      height: 45px;
      display: block;
      font-size: 16px;
      font-weight: 400;
      overflow: hidden; //超出隐藏
      text-overflow: ellipsis; //超出文本设置为...

      -webkit-line-clamp: 2; //设置div1的文本为2行
    }
    span {
      font-size: 16px;
      color: #ccc;
      i {
        margin-left: 10px;
      }
    }
  }
}
</style>