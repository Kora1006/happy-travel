@@ -0,0 +1,217 @@
<template>
    <div class="main">

        <!-- 面包屑 -->
        <div class="bread">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
            
            </el-breadcrumb>
        </div>

        <!-- 选择搜索框 -->
        <div class="search">
            <el-row :gutter="20">
                <!-- 搜索框 -->
                <el-col :span="5">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入目的地"
                       >
                    </el-autocomplete>
                </el-col>

                <!-- 入住日期 -->
                <el-col :span="9">
                    <div class="block">                       
                        <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="入住日期"
                        end-placeholder="离店日期">
                        </el-date-picker>
                    </div>
                </el-col>

                <!-- 选择人数 -->
                <el-col :span="6">
                    <el-input
                        placeholder="请选择入住人数"
                        suffix-icon="el-icon-setting"
                        v-model="input"                      
                        @click="click_P"
                        v-popover:popover2>
                    </el-input>
                </el-col>

                <!-- 查看价格 -->
                <el-col :span="4">                
                   
                        <el-button type="primary" @click="getPrice">查看价格</el-button>
                     
                </el-col>
            </el-row>

            <!-- 请选择入住人数 -->
            <el-popover
                ref="popover2"
                style="width: 300px; transform-origin: center top; z-index: 2047; ">
                
                <span style="margin-right:5px;">每间 :</span>

                <el-select v-model="value1" placeholder="成人" style="width: 85px">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>

                <el-select v-model="value2" placeholder="儿童" style="width: 85px">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
                
                    <el-button type="primary" class="sure_P" @click="handleSure">确定</el-button>
              
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
   
    data() {
      return {
        //输入框
        restaurants: [],
        state: '',
        timeout:  null,

        //选择日期
         value: '',

        //选择人数
        input:'',
        isShow: false, //显示和隐藏人员显示框
        options1: [
        {
          //选择成人
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
       
      ],
      value1: "",
      value2: "",
      options2: [
        {
          //选择儿童
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        },
     
      ]
      };
    },
    methods: {
      loadAll() {
        return [
            { "value": "湛江" },
            { "value": "珠海" },
            { "value": "广州" },
            { "value": "广元" },
            { "value": "北京" },
            { "value": "南京" },
            { "value": "上海" },
            { "value": "长沙" },
            { "value": "成都" },
            { "value": "杭州" },
            { "value": "北海" },
            { "value": "桂林" },
            
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }, 
      
        //查看价格
        getPrice(){
            console.log(this.data)
        },

        //选择人数
        click_P(){
            this.isShow = !this.isShow;
        },

        //确定人数
        handleSure(){
            this.input = +this.value1 + +this.value2
        }
    },

    mounted() {
      this.restaurants = this.loadAll();
    }
  }

</script>

<style scoped lang="less">
    .main{
        width: 1000px;
        margin: 0 auto;
    }

    .bread{
        margin:20px 0;
    }

    .search{
        margin-bottom: 20px;
    }

    .sure_p{
        float: right;
        height: 30px;
        line-height: 8px;
    }
</style>