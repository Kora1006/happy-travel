<template>
  <div class="search-wrap">
    <el-input :placeholder="newCity" v-model="city" class="search-input">
      <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
    </el-input>
    <div class="recommend-city">
      推荐：
      <nuxt-link to="/post?city=上海">
        <span>上海</span>
      </nuxt-link>
      <nuxt-link to="/post?city=北京">
        <span>北京</span>
      </nuxt-link>
      <nuxt-link to="/post?city=广州">
        <span>广州</span>
      </nuxt-link>
    </div>
    <el-row type="flex" justify="space-between">
      <h4>推荐攻略</h4>

      <nuxt-link to="/post/create">
        <el-button type="primary" icon="el-icon-edit" class="search-btn">写游记</el-button>
      </nuxt-link>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ""
    };
  },
  methods: {
    handleSearch() {
      if(!this.city){
        this.$message.error('请输入想要搜索的城市')
        return;
      }
      this.$router.push(`/post?city=${this.city}`);
    }
  },
  mounted() {
    let cityName = this.$route.query.city;

    this.city = cityName;
    // console.log(this.city);
  },
  computed: {
    newCity() {
      const { city } = this.$route.query;
      this.city = city;
      let cityName = "";
      if (!city) {
        cityName = "请输入想去的地方,比如:'北京'";
      } else {
        cityName = city;
      }
      return cityName;
      // console.log(this.city);
    }
  }
};
</script>

<style lang="less" scoped>
.search-wrap {
  width: 100%;
  border-bottom: 1px solid #eeeeee;
}
.search-input {
  border: 3px solid #ffa500;
  .el-input__icon {
    color: #ffa500;
    font-size: 20px;
    font-weight: 700;
  }
}
/deep/ .el-input__inner {
  border: none;
}
.recommend-city {
  padding: 10px;
  font-size: 12px;
  color: #999;
  span:hover {
    color: #ffa500;
    text-decoration: underline;
  }
}
h4 {
  padding: 5px 10px 10px;
  color: #ffa500;
  font-size: 20px;
  font-weight: normal;
  border-bottom: 2px solid #ffa500;
}
.search-btn {
  margin-bottom: 5px;
}
</style>