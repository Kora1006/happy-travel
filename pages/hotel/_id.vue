<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{hotel.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotel.breadcrumb}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 酒店详情 -->
    <div class="hotel-detil">
      <h2>
        {{hotel.name}}
        <i
          v-if="hotel.hotellevel.level!==0"
          class="iconfont iconhuangguan"
          v-for="(item,index) in hotel.hotellevel.level"
          :key="index"
        ></i>
        <span v-else style="color:#999;font-size:14px">暂无评分</span>
      </h2>
      <p style="font-size:12px;color:#999">{{hotel.alias}}</p>
      <p style="font-size:14px">
        <i class="el-icon-map-location"></i>
        {{hotel.address}}
      </p>
    </div>

    <!-- 酒店环境图 -->
    <el-row type="flex" justify="space-between" style="margin-bottom:20px">
      <!-- 大图 -->
      <el-col :span="14" class="b-img">
        <img :src="$axios.defaults.baseURL+bigImg.url" onerror="this.src='/pic_sea.jpeg'" />
      </el-col>
      <!-- 小图 -->
      <el-col :span="8" class="s-img">
        <img
          v-for="(item,index) in smallImg"
          :key="index"
          :src="$axios.defaults.baseURL+item.url"
          @click="handleChangeImg(item)"
          onerror="this.src='/pic_sea.jpeg'"
        />
      </el-col>
    </el-row>

    <!-- 价位列表 -->
    <el-table :data="hotel.products" style="width: 100%;margin-bottom:20px">
      <el-table-column prop="name" label="价格来源" width="300" align="center"></el-table-column>
      <el-table-column prop="bestType" label="酒店房型" width="300" align="center"></el-table-column>
      <el-table-column prop="price" align="center" label="最低价格/每晚">
        <template slot-scope="scope">
          <nuxt-link to="https://hotels.ctrip.com/hotel">
            <span class="hotel-price">
              ￥{{scope.row.price}} 起
              <i class="el-icon-arrow-right"></i>
            </span>
          </nuxt-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 地图 -->
    <div class="map"></div>

    <!-- 酒店基本信息 -->
    <div class="hotel-info">
      <div class="base-info">
        <span class="info-title">基本信息</span>
        <span>入住时间：14:00之后</span>
        <span>离店时间：12:00之前</span>
        <span>{{hotel.creation_time?hotel.creation_time:'2010年开业'}}/{{hotel.renovat_time?hotel.renovat_time:'2015年装修'}}</span>
        <span>酒店规模：{{hotel.roomCount}}间客房</span>
      </div>
      <div class="hotel-function">
        <span class="info-title">主要设施</span>
        <span>外币兑换服务</span>
        <span>电梯</span>
        <span>洗衣服务</span>
        <span>热水壶</span>
        <span>24小时热水</span>
      </div>
      <div>
        <span class="info-title">联系酒店</span>
        <span>
          <i class="el-icon-school" style="color:#f90"></i>
          &nbsp;{{hotel.traffic?hotel.traffic:hotel.address}}
        </span>
        <span style="margin-left:10px">
          <i class="el-icon-phone-outline" style="color:#f90"></i>
          &nbsp;{{hotel.phone?hotel.phone:'该店家暂无联系方式'}}
        </span>
      </div>
      <div>
        <span class="info-title">品牌信息</span>
        <span class="hotel-brand" v-if="hotel.hotelbrand">{{hotel.hotelbrand.name}}</span>
        <span v-if="!hotel.hotelbrand">自主品牌</span>
      </div>
    </div>

    <!-- 用户评论 -->
    <div class="guest-comment"> 
      <h3>{{hotel.all_remarks?hotel.all_remarks:0}}条真实用户评论</h3>
      <el-row type="flex" justify="space-between">
        <el-col>
          <p>总评数：{{hotel.all_remarks?hotel.all_remarks:0}}</p>
          <p>好评数：{{hotel.good_remarks?hotel.good_remarks:0}}</p>
          <p>差评数：{{hotel.bad_remarks?hotel.bad_remarks:0}}</p>
        </el-col>
        <el-col class="hotel-star">
          <div class="recommen-icon">推荐</div>
          <div class="star">
            <el-rate
              v-model="hotel.stars"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="hotel.stars+'分'"
            ></el-rate>
          </div>
        </el-col>
        <el-col class="grace">
          <el-progress
            type="circle"
            :percentage="Number(`${hotel.scores.environment?hotel.scores.environment*10:0}`)"
            color="#f90"
            :width="70"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <span class="type">环境</span>
          <span class="value">{{hotel.scores.environment?hotel.scores.environment+'分':'0分'}}</span>
        </el-col>
        <el-col class="grace">
          <el-progress
            type="circle"
            :percentage="Number(`${hotel.scores.product?hotel.scores.product*10:0}`)"
            color="#f90"
            :width="70"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <span class="type">产品</span>
          <span class="value">{{hotel.scores.product?hotel.scores.product+'分':'0分'}}</span>
        </el-col>
        <el-col class="grace">
          <el-progress
            type="circle"
            :percentage="Number(`${hotel.scores.service?hotel.scores.service*10:0}`)"
            color="#f90"
            :width="70"
            :show-text="false"
            :stroke-width="2"
          ></el-progress>
          <span class="type">服务</span>
          <span class="value">{{hotel.scores.service?hotel.scores.service+'分':'0分'}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotel: {
        scores: {},
        hotellevel: {},
        hotelbrand: {}
      },
      // 存放大图
      bigImg: {
        name: ""
      },
      // 存放图片列表
      smallImg: []
    };
  },
  async mounted() {
    let { id } = this.$route.params;
    let hid = Number(id.split(".")[0]);
    // 获取酒店详细信息
    let res = await this.$axios({
      url: "/hotels?id=" + hid
    });
    this.hotel = res.data.data[0];
    this.smallImg = [...res.data.data[0].pics];
    this.bigImg = { ...this.smallImg[0] };
    // 修复无level
    if (!this.hotel.hotellevel) {
      this.hotel.hotellevel = 0;
    }
    // 获取酒店评论信息
    let comment = await this.$axios({
      url: "/hotels/comments",
      params: {
        hotel: hid
      }
    });
    console.log(this.hotel);
  },
  methods: {
    // 切换大小图
    handleChangeImg(item) {
      this.bigImg = item;
      // console.log(this.bigImg);
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .bread {
    margin: 20px 0;
  }
  .hotel-detil {
    margin-bottom: 20px;
    h2 {
      font-weight: normal;
      i {
        color: #ff9900;
      }
    }
  }
  .b-img {
    img {
      display: inline-block;
      width: 640px;
      height: 360px;
      object-fit: cover;
    }
  }
  .s-img {
    img {
      display: inline-block;
      width: 160px;
      height: 110px;
      margin-bottom: 10px;
      object-fit: cover;
    }
    img:nth-child(2n-1) {
      margin-right: 5px;
    }
  }
  .hotel-star {
    position: relative;
    .recommen-icon {
      position: absolute;
      left: 20px;
      width: 70px;
      height: 70px;
      border: 2px solid #fa3;
      border-radius: 50%;
      font-size: 25px;
      color: #fa3;
      text-align: center;
      line-height: 70px;
      opacity: 0.25;
      transform: rotate(-30deg);
    }
    .star {
      margin-top: 25px;
    }
  }
  .grace {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 30px;
    span {
      font-size: 16px;
      color: #ff9900;
    }
    .type {
      position: absolute;
      left: 20px;
      top: 20px;
    }
    .value {
      position: absolute;
      top: 38px;
      left: 20px;
    }
  }
}
.hotel-info {
  margin-bottom: 30px;
  > div {
    height: 60px;
    line-height: 70px;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
  }
  .info-title {
    margin: 0px 150px 0px 20px;
  }
}
.guest-comment {
  margin: 20px 0px;
  h3 {
    margin-bottom: 10px;
  }
}
.hotel-function {
  span:nth-child(n + 2) {
    padding: 4px 10px;
    background-color: #ddd;
    border-radius: 5px;
  }
}
.base-info {
  span:nth-child(n + 2) {
    padding: 0 10px;
  }
}
/deep/ .el-progress-circle__track {
  stroke: rgb(255, 255, 255);
}
.hotel-price {
  color: #fa3;
  font-weight: 700;
}
.hotel-brand{
  padding: 5px 10px;
  background-color: #fa3;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
}
</style>