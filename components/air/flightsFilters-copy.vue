<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}}-{{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filters.airport.value"
          placeholder="起飞机场"
          @change="handleAirport"
        >
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filters.company.value"
          placeholder="航空公司"
          @change="handleCompany"
        >
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="filters.airSize.value"
          placeholder="机型"
          @change="handleAirSize"
        >
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFlitersCancel">撤销</el-button>
    </div>
    <span v-show="false">{{ handleFliters}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        airport: { name: "org_airport_name", value: "" }, // 机场
        flightTimes: { name: "dep_time", value: "" }, // 出发时间
        company: { name: "airline_name", value: "" }, // 航空公司
        airSize: { name: "plane_size", value: "" } // 机型大小
      },
      flightTimes: "",
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    handleFliters() {
      let arr = [];
      this.data.flights.forEach(item => {
        let valid = true;
        Object.keys(this.filters).forEach(v => {
          // 即该属性无值
          if (!this.filters[v].value) return;
          else if (v === "flightTimes") {
            const arr2 = this.filters[v].value.split(",");
            let start = item[this.filters[v].name].split(":")[0];
            if (start < +arr2[0] || start > +arr2[1]) {
              valid = false;
            }
          }
          // 符合筛选条件的
          else if (item[this.filters[v].name] !== this.filters[v].value) {
            valid = false;
          }
        });

        if (valid) {
          arr.push(item);
        }
      });

      this.$emit("setDataList", arr);
    }
  },
  methods: {
    // 多选的时候触发
    // handleFliters() {
    //   let arr = [];
    //   this.data.flights.forEach(item => {
    //     let valid = true;
    //     Object.keys(this.filters).forEach(v => {
    //       // 即该属性无值
    //       if (!this.filters[v].value) return;
    //       else if (v === "flightTimes") {
    //         const arr2 = this.filters[v].value.split(",");
    //         let start = item[this.filters[v].name].split(":")[0];
    //         if (start < +arr2[0] || start > +arr2[1]) {
    //           valid = false;
    //         }
    //       }
    //       // 符合筛选条件的
    //       else if (item[this.filters[v].name] !== this.filters[v].value) {
    //         valid = false;
    //       }
    //     });

    //     if (valid) {
    //       arr.push(item);
    //     }
    //   });

    //   this.$emit("setDataList", arr);
    // },

    // 选择机场时候触发
    handleAirport(value) {
      this.filters.airport.value = value;

      // this.handleFliters();
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      this.filters.flightTimes.value = value;

      // this.handleFliters();
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      this.filters.company.value = value;

      // this.handleFliters();
    },

    // 选择机型时候触发
    handleAirSize(value) {
      this.filters.airSize.value = value;

      // this.handleFliters();
    },

    // 撤销条件时候触发
    handleFlitersCancel() {
      this.filters.airSize.value = "";
      this.filters.company.value = "";
      this.filters.airport.value = "";

      this.$emit("setDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>