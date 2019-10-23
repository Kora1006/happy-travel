<template>
  <div>
    <div class="post-item" v-for="(item,index) in data" :key="index">
      <h4 :title="item.title" class="post-title">
        <a :href="`/post/detail?id=${item.id}`">{{item.title}}</a>
      </h4>
      <p class="post-desc">
        <a :href="`/post/detail?id=${item.id}`">
          <p v-html="item.content"></p>
        </a>
      </p>
      <!-- 当只有一张图片的时候 -->
      <div class="card-images1" v-show="item.images.length==='1'">
        <a :href="`/post/detail?id=${item.id}`" class>
          <img :src="item.images[0]" />
        </a>
      </div>
      <!-- 当有两张图片的时候 -->
      <div class="card-images2" v-show="item.images.length==='2'">
        <a :href="`/post/detail?id=${item.id}`" v-for="(ite,ind) in item.images" :key="ind">
          <img :src="ite" />
        </a>
      </div>
      <!-- 当有三张张图片的时候 -->
      <div class="card-images3" v-show="item.images.length>='3'">
        <a :href="`/post/detail?id=${item.id}`" v-for="(it,inde) in item.images" :key="inde">
          <img :src="it" v-if="inde<3" />
        </a>
      </div>

      <div class="post-info">
        <div class="post-info-left">
          <span>
            <i class="el-icon-location-outline"></i>
            {{item.cityName}}
          </span>
          <div class="post-user">
            <a href="/user/personal">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
            </a>
            <a href="/user/personal" class>地球发动机</a>
          </div>
          <span>
            <i class="el-icon-view"></i>
            {{item.watch}}
          </span>
        </div>

        <span class="post-info-right" @click="clickgood(item.id)" v-if="item.like">{{item.like}}赞</span>
        <span class="post-info-right" @click="clickgood(item.id)" v-if="item.like===null">0赞</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      val: "",
      data: []
    };
  },
  methods: {
    clickgood(id) {
      //发送ajax
      this.$axios({
        url: `/posts/like?id=${id}`,
       headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res=>{
        console.log("111")
        if(res.status==="200"){
          this.$message.success(res.data.message)
        }

      }).catch((err)=>{
        console.log(err)
        this.$message.error("您已经点过赞了哦");
      });
    }
  },

  watch: {
    $route(to, from) {
   
      if (this.$route.query.city) {
        this.$axios({
          url: `/posts?city=${this.value}`
        }).then(res => {
          const { data } = res.data;
          this.data = data;
          console.log("路由更改的时候文章列表", data);
        });
      } else {
        this.$axios({
          url: `/posts/recommend`
        }).then(res => {
          const { data } = res.data;
          this.data = data;
          console.log("文章列表", data);
        });
      }
    }
  },

  mounted() {
    console.log("这个是路由", this.$route.query.city);
    if (this.$route.query.city) {
      this.$axios({
        url: `/posts?city=${this.$route.query.city}`
      }).then(res => {
        const { data } = res.data;
        this.data = data;
        console.log("路由更改的时候文章列表", data);
      });
    } else {
      this.$axios({
        url: `/posts/recommend`
      }).then(res => {
        const { data } = res.data;
        this.data = data;
        console.log("文章列表", data);
      });
    }
  }
};
</script>

<style scoped lang="less">
.post-item {
  width: 100%;
}
.post-title {
  padding: 18px 0;
  font-size: 20px;
  font-weight: 500;
}
.post-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  height: 63px;
  overflow: hidden;
  text-overflow: ellipsis;

  -webkit-line-clamp: 3;
}
//一张图片的时候
.card-images1 {
  display: flex;
  a {
    display: block;
    width: 100%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
//二张图片的时候
.card-images2 {
  display: flex;
  a {
    display: block;
    width: 50%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
//三种以上图片的时候
.card-images3 {
  display: flex;
  a {
    display: block;
    width: 33.33%;
    height: 150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .post-info-left {
    display: flex;
    align-items: center;
    font-size: 14px;
    .post-user {
      display: flex;
      align-items: center;
      margin: 0 10px;
      color: #ffb34a;
    }
  }
  img {
    height: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .post-info-right {
    color: #ffb34a;
     cursor: pointer;
  }
}
</style>