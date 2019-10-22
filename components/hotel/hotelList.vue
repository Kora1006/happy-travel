<template>
  <div class="hotel_list">
    <!-- 条件筛选 -->
    <div class="list_fliter">
      <el-row type="flex" class="fliter_top">
          <!-- 价格 -->
        <el-col :span="8">        
          <el-row>
             <span>选择价格 ：</span>
              <el-select v-model="value1" clearable placeholder="请选择价格范围">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-row>
        </el-col>

        <!-- 住宿等级 -->
        <el-col :span="8">
          <el-row>
            <span>住宿等级 ：</span>
             <el-select v-model="levelsValue" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in levels"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

         <!-- 主题地标 -->
        <el-col :span="8">
          <el-row>
            <span>主题地标 ：</span>
             <el-select v-model="value4" multiple placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value3"
                :label="item.label2"
                :value="item.value3">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

      </el-row>

      <el-row type="flex" class="fliter_bottom">
        <!-- 住宿类型 -->
        <el-col :span="8">
         <el-row>
            <span>住宿类型 ：</span>
             <el-select v-model="typesValue" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in types"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

        <!-- 酒店设施 -->
        <el-col :span="8">
         <el-row>
            <span>酒店设施 ：</span>
             <el-select v-model="assetsValue" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in assets"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>
        <!-- 酒店品牌 -->
        <el-col :span="8">
          <el-row>
            <span>酒店品牌 ：</span>
             <el-select v-model="brandsValue" multiple placeholder="请选择">
              <el-option
                v-for="(item,index) in brands"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

      </el-row>
    </div>

    <!-- 酒店列表 -->
    <div class="hotels">

        <div class="hotels_item" v-for="(item,index) in hotelsList" :key="index">
        <el-row>
          <el-col :span="8">
            <img :src="`${item.photos}`" :alt="`${item.name}`" style="width:310px;height:210px">
          </el-col>
          <el-col :span="10">
            <h3 style="font-size:24px">
              <nuxt-link to="#">{{item.name}}</nuxt-link>
            </h3>
            <span>{{item.alias}}</span>&nbsp;
            <span style="font-size:12px;color:#ff9900;">({{item.creation_time}})</span>&nbsp;
            <!-- 星级 -->
            <span v-if="item.hotellevel" :title="`${item.hotellevel.name}级`">
                <i
                  class="iconfont iconhuangguan"
                  v-for="num in item.hotellevel.level"
                  :key="num"
                  style="color:#ff9900"
                ></i>&nbsp;
                {{item.hoteltype.name}}
              </span>
             <div style="margin-top:15px;">
                <el-col :span="10">
                  <el-rate
                    v-model="item.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </el-col>
                <el-col :span="7">
                  <span class="height-light" style="color: rgb(255, 153, 0);">{{item.all_remarks}}</span>
                  条评价
                </el-col>
                <el-col :span="7">
                  <span class="height-light" style="color: rgb(255, 153, 0);">{{item.visits_total}}</span>
                  篇游记
                </el-col>
              </div>
              <div class="location-row" style="margin-top:50px">
                <i class="iconfont iconlocation icon_style" style="color:#00a6ff"></i>
                位于: {{item.address}}
              </div>
          </el-col>
          <el-col :span="6">
              <div v-for="(item,index) in item.products" :key="index" class="hotel_products">
                  <span>{{item.name}}</span>
                  <span class="hotel_price">
                  <span style="color: #f90;font-size: larger;">￥{{item.price}}</span>起
                  <i data-v-0a769ebc class="el-icon-arrow-right"></i>
                  </span>
              </div>
          </el-col>
        </el-row>
        </div>

    </div>

  </div>
</template>

<script>
export default {
    data(){
      return{
          options: [{
          value: '选项1',
          label: '0-500'
        }, {
          value: '选项2',
          label: '500-1000'
        }, {
          value: '选项3',
          label: '1000-1500'
        }, {
          value: '选项4',
          label: '1500-2000'
        }, {
          value: '选项5',
          label: '2000以上'
        }],
        value1: '',

        assets:[],
        assetsValue:[],
        brands:[],
        brandsValue:[],
        levels:[],
        levelsValue:[],
        types:[],
        typesValue:[],

         options2: [{
          value3: '选项1',
          label2: '游乐园'
        }, {
          value3: '选项2',
          label2: '地铁站'
        }, {
          value3: '选项3',
          label2: '商业区'
        }, {
          value3: '选项4',
          label2: '机场/火车站'
        }, {
          value3: '选项5',
          label2: '医院'
        }],
        value4: [],
        //酒店列表
        hotelsList:[],
      }
    },
     methods: {
      
    },
      async mounted(){
        //获取酒店选项
        const res = await this.$axios({
            url:"/hotels/options"
        })
            console.log(res,9999999)
            const {data} = res.data
            this.assets = data.assets
            this.brands = data.brands
            this.levels = data.levels
            this.types = data.types
            
        //获取酒店列表
        const hotelList = await this.$axios({
              url:"/hotels",
              params:this.$route.query
        })
              console.log(hotelList,888888888888)
              const data1 = hotelList.data.data
              this.hotelsList = data1 
              console.log(this.hotelsList,999999)



    }
}
</script>

<style scoped lang="less">
    .hotel_list{
        width: 1000px;
        margin: 0 auto;
        margin-bottom: 20px;
        .list_fliter{
            .fliter_top{
                margin-bottom: 20px;
            }
        }
        .hotels{
          
          .hotels_item{
            padding: 25px 0;
            border-bottom: 1px solid #eeeeee;
            .hotel_products{
              padding: 20px 10px;
              display: flex;
              justify-content: space-between;
              align-content: center;
              border-bottom: 1px solid #eeeeee;
              .hotel_price{
                margin-right: 15px;
              }
            }
          }
        }      
    }
</style>