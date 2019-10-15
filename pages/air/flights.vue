<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item,index) in flightsData.flights"
          :key="index"
          :data="item"
          v-if="flightsData.flights"
        />
        <div class="tips"
         v-if="flightsData.flights.length==0 && loading==false">
            <span>您搜索的城市暂未开通该航班哦 o(╥﹏╥)o </span>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
export default {
  data() {
    return {
      flightsData: {
          flights:[]
      },
      loading: true
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  async mounted() {
    const res = await this.$axios({
      url: "/airs",
      params: this.$route.query
    });
    if (res.status == 200) {
      this.flightsData = res.data;
    //   console.log(this.flightsData.flights);
      this.loading = false;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.tips{
    height: 500px;
    text-align: center;
    line-height: 500px;
}
</style>