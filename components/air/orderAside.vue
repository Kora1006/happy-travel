<template>
  <div class="aside">
    <div class="air-info">
      <el-row type="flex" justify="space-between" class="info-top">
        <div>{{orderInfo.dep_date}}</div>
        <div>{{orderInfo.org_city_name}} - {{orderInfo.dst_city_name}}</div>
      </el-row>
      <el-row type="flex" justify="space-between" align="middle" class="info-step">
        <el-col :span="5" class="flight-airport">
          <strong>{{orderInfo.dep_time}}</strong>
          <span>{{orderInfo.org_airport_name}}{{orderInfo.org_airport_quay}}</span>
        </el-col>
        <el-col :span="14" class="flight-time">
          <span>---{{rankTime}}---</span>
          <span>{{orderInfo.airline_name}}{{orderInfo.flight_no}}</span>
        </el-col>
        <el-col :span="5" class="flight-airport">
          <strong>{{orderInfo.arr_time}}</strong>
          <span>{{orderInfo.dst_airport_name}}{{orderInfo.dst_airport_quay}}</span>
        </el-col>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="info-bar">
      <span>订单总价</span>
      <span>金额</span>
      <span>数量</span>
    </el-row>
    <el-row 
    type="flex" 
    justify="space-between" 
    class="info-bar"
    >
      <span>成人票</span>
      <span>￥{{orderInfo.seat_infos.par_price}}</span>
      <span>1</span>
    </el-row>
    <el-row 
    type="flex" 
    justify="space-between" 
    class="info-bar"
    v-for="(item,index) in orderInfo.insurances"
    :key="index"
    >
      <span>{{item.type}}</span>
      <span>￥{{item.price}}</span>
      <span>1</span>
    </el-row>
   
    <el-row type="flex" justify="space-between" align="middle" class="info-bar">
      <span>应付总额</span>
      <span class="price">￥3000</span>
    </el-row>
  </div>
</template>

<script>
import { computeTime } from "@/until/until";
export default {
  props: {
    orderInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    rankTime() {
      return computeTime(this.orderInfo.arr_time, this.orderInfo.dep_time);
    }
  }
};
</script>

<style scoped lang="less">
/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}

.air-info {
  padding: 15px;

  .info-top {
    margin-bottom: 10px;
    > div:last-child {
      font-size: 14px;
    }
  }

  .info-step {
    .flight-airport {
      strong {
        display: block;
        font-size: 22px;
        font-weight: normal;
      }

      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      text-align: center;
      font-size: 12px;
      color: #999;
      span {
        display: block;
      }
    }
  }
}

.info-bar {
  border-top: 1px #ddd dashed;
  padding: 10px 15px;
  font-size: 14px;
  color: #666;

  .price {
    font-size: 28px;
    color: orange;
  }
}
</style><style>
</style>