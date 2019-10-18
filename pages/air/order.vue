<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :orderData="orderData" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :orderInfo=" orderInfo" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
import OrderAside from "@/components/air/orderAside";
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data() {
    return {
      orderData: {
        insurances: []
      },
      orderInfo: {
        // 默认值
        seat_infos: {},
        air: {}
      }
    };
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `/airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      if (res.status === 200) {
        const { data } = res;
        this.orderData = data;
        this.orderInfo = data;
        console.log(this.orderInfo)
      }
    });
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>