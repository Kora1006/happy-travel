<template>
  <div class="search-form">
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active:index === current}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px" v-if="current === 0">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 类似于input方法，每次输入框值发生变化时候回触发 -->
        <!-- select：选中下拉列表中的值的时候触发的触发  -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          :trigger-on-focus="false"
          @select="handleDepartSelect"
          @blur="handleBlur('depart')"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <!-- fetch-suggestions: 类似于input方法，每次输入框值发生变化时候回触发 -->
        <!-- select：选中下拉列表中的值的时候触发的触发  -->
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索出发城市"
          :trigger-on-focus="false"
          @select="handleDestSelect"
          @blur="handleBlur('dest')"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="选择日期"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      current: 0,
      tabs: [
        { name: "单程", icon: "iconfont icondancheng" },
        { name: "往返", icon: "iconfont iconshuangxiang" }
      ],
      form: {
        departCity: "", // 出发城市
        departCode: "", // 出发城市代码
        destCity: "", // 到达城市
        destCode: "", // 到达城市代码
        departDate: "" // 日期字符串
      },
      newData: []
    };
  },
  methods: {
    handleSearchTab(index) {
      this.current = index;
    },
    // 选择返程
    handleSearchTab(index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    // 出发城市输入框值发生变化时候会触发
    // value：输入框的值
    // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
    // 数组中的元素必须是一个对象，对象中必须要有value属性
    queryDepartSearch(value, cb) {
      // console.log(value)
      if (!value) {
        cd({});
        return;
      }
      //    当输入框的内容不为空时请求
      this.$axios({
        url: "/airs/city?name=" + value
      }).then(res => {
        const { data } = res.data;
        this.newData = data.map(e => {
          e.value = e.name.replace("市", "");
          return e;
        });
        cb(this.newData);
      });
    },
    // 选择出发城市
    handleDepartSelect(value) {
      // value为被选中的项目
      // console.log(value)
      this.form.departCity = value.value;
      this.form.departCode = value.sort;
    },
    // 到达城市输入框变化
    queryDestSearch(value, cb) {
      // console.log(value)
      // 重复调用出发城市的函数
      this.queryDepartSearch(value, cb);
    },
    // 选择到达城市
    handleDestSelect(value) {
      // value为被选中的项目
      // console.log(value)
      this.form.destCity = value.value;
      this.form.destCode = value.sort;
    },

    // 当输入框失去焦点时默认选取第一项
    handleBlur(place) {
      // 即无选择项（表示已经写好）
      if (this.newData.length === 0) return;
      this.form[place + "City"] = this.newData[0].value;
      this.form[place + "Code"] = this.newData[0].sort;
      this.newData = [];
    },
    // 更换出发和到达城市
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCode = destCode;
      this.form.departCity = destCity;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    // 更换日期的格式
    handleDate(value) {
      // console.log(value)
      this.form.departDate = moment(value).format("YYYY-MM-DD");
      //   console.log(this.form.departDate);
    },
    // 搜索机票
    handleSubmit() {
      // console.log(this.form)
      // 先对获取的数据进行验证
      const rules = {
        departCity: {
          message: "请输入出发城市",
          value: this.form.departCity
        },
        destCity: {
          message: "请输入到达城市",
          value: this.form.destCity
        },
        departDate: {
          message: "请选择出发时间",
          value: this.form.departDate
        }
      };
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (valid == false) return;
        const { value, message } = rules[v];
        if (!value) {
          this.$message.error(message);
          valid = false;
        }
      });
      // 如果信息未输入完就不跳转
      if(!valid)return;

      // 提交数据
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
      // 将获取的数据给store
      this.$store.commit('air/setAirData',this.form)
    }
  }
};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}
.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }
  .active {
    border-top-color: orange;
    background: #fff;
  }
  i {
    margin-right: 5px;
    font-size: 18px;
    &:first-child {
      font-size: 16px;
    }
  }
}
.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;
  .el-autocomplete {
    width: 100%;
  }
}
.reverse {
  position: absolute;
  top: 35px;
  right: 15px;
  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }
  &:after {
    top: 0;
  }
  &:before {
    top: 60px;
  }
  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }
    &:after {
      top: -20px;
    }
    &:before {
      top: 20px;
    }
  }
}
</style>