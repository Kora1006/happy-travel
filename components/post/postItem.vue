<template>
  <div class="content-wrap">
    <div class="content-item-3" v-if="postData.images && postData.images.length>1">
      <h3>{{postData.title}}</h3>
      <div class="content">{{postData.summary}}</div>
      <el-row type="flex" justify="space-between" class="content-img-3">
        <img
          v-for="(item,index) in postData.images"
          :key="index"
          :src="item"
          onerror="this.src='/pic_sea.jpeg'"
          v-if="index<=2"
        />
      </el-row>
      <div class="post-info">
        <div class="info-left">
          <i class="el-icon-location-outline"></i>
          <span>{{postData.cityName}}</span> by
          <img
            :src="$axios.defaults.baseURL+`${postData.account.defaultAvatar}`"
            class="user-img"
            onerror="this.src='/pic_sea.jpeg'"
          />
          <span style="color:#ffa500;">{{postData.account.nickname}}</span>
          <i class="el-icon-view"></i>
          {{postData.watch}}
        </div>
        <span class="info-right">54赞</span>
      </div>
    </div>
    <div class="content-item-1" v-if="postData.images.length<=1">
      <el-row type="flex" justify="space-between">
        <el-col :span="8">
          <img
            :src="`${postData.images[0]}`"
            class="content-img-1"
            onerror="this.src='/pic_sea.jpeg'"
          />
        </el-col>
        <el-col :span="16">
          <h3>{{postData.title}}</h3>
          <div class="content">{{postData.summary}}</div>
          <div class="post-info">
            <div class="info-left">
              <i class="el-icon-location-outline"></i>
              <span>{{postData.cityName}}</span> by
              <img
               :src="$axios.defaults.baseURL+`${postData.account.defaultAvatar}`"
                class="user-img"
                onerror="this.src='/static/avatar.jpg'"
              />
              <span style="color:#ffa500;">{{postData.account.nickname}}</span>
              <i class="el-icon-view"></i>
              {{postData.watch}}
            </div>
            <span class="info-right">54赞</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    postData: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  > div {
    border-bottom: 1px solid #eeeeee;
  }
  h3 {
    font-weight: normal;
    padding: 10px 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3:hover {
    color: #ffa500;
  }
  .content {
    height: 60px;
    color: #666;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content-img-3 {
    width: 100%;
    img {
      display: inline-block;
      width: 220px;
      height: 150px;
      object-fit: cover;
    }
  }

  .user-img {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .post-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    padding: 10px 0px;
  }
  .info-right {
    font-size: 16px;
    color: #ffa500;
  }
}
.content-img-1 {
  width: 100%;
  padding: 10px 10px 0px 0px;
  box-sizing: border-box;
  width: 220px;
  height: 150px;
  object-fit: cover;
}
</style>