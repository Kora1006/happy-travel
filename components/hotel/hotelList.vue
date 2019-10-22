<template>
  <div class="hotel_list">
      <div class="list_fliter">
      <el-row type="flex" class="fliter_top">
          <!-- 价格 -->
        <el-col :span="8">        
          <el-row>
             <span>选择价格：</span>
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
             <el-select multiple placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value2"
                :label="item.label1"
                :value="item.value2">
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
             <el-select v-model="value3" multiple placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value2"
                :label="item.label1"
                :value="item.value2">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

        <!-- 酒店设施 -->
        <el-col :span="8">
         <el-row>
            <span>酒店设施 ：</span>
             <el-select v-model="value3" multiple placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value2"
                :label="item.label1"
                :value="item.value2">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>
        <!-- 酒店品牌 -->
        <el-col :span="8">
          <el-row>
            <span>酒店品牌 ：</span>
             <el-select v-model="value3" multiple placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value2"
                :label="item.label1"
                :value="item.value2">
              </el-option>
            </el-select>          
          </el-row>
        </el-col>

      </el-row>
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
          label: '2000-3000'
        }],
        value1: '',

        options1: [{
          value2: '选项1',
          label1: '黄金糕'
        }, {
          value2: '选项2',
          label1: '双皮奶'
        }, {
          value2: '选项3',
          label1: '蚵仔煎'
        }, {
          value2: '选项4',
          label1: '龙须面'
        }, {
          value2: '选项5',
          label1: '北京烤鸭'
        }],
        value3: [],

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
      }
    },
     methods: {
      
    },
    mounted(){
      this.$axios({
        url:"/hotels/options"
      }).then(res=>{
        console.log(res,9999999)
      })
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
    }
</style>