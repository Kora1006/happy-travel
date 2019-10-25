<template>
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
             <el-select
              v-model="levelsValue"
              multiple placeholder="请选择"
              @change="searchFilter"
             >
              <el-option
                v-for="(item,index) in levels"
                :key="index"
                :label="item.name"
                :value="item.level">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>
       
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

      </el-row>

      <el-row type="flex" class="fliter_bottom">       
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
      <span v-show="false">{{searchFilter}}</span>
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
            hotelData:[],
        }
    },

      methods:{
          searchFilter(){
               console.log(this.levelsValue,69696969)
                let arr = this.hotelData.filter(item => {                  
                    if(item.hotellevel && Number(this.levelsValue[0]) <= Number(item.hotellevel.level)){
                        return item
                    }
                })
                 if(!this.levelsValue[0]){
                  arr=this.hotelData
                }              
                this.$emit("setHotelData",arr)
          },
      
         
      },

      async mounted(){
          //获取酒店选项
          const res = await this.$axios({
              url:"/hotels/options"
          })
              // console.log(res,9999999)
              const {data} = res.data
              this.assets = data.assets
              this.brands = data.brands
              this.levels = data.levels
              this.types = data.types

              const  res1 = await this.$axios({
                  url:"/hotels?_limit=121"
              })
                  const hotelData = res1.data.data
                  this.hotelData = hotelData
                  console.log(this.levels)

      },
}
</script>

<style scoped lang="less">
    .list_fliter{
            .fliter_top{
                margin-bottom: 20px;
            }
        }
</style>