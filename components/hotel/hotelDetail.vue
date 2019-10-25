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
                        @select="handleCitySelect"
                        @blur="handleCityBlur"
                        placeholder="请输入目的地"
                    ></el-autocomplete>
                </el-col>

                <!-- 入住日期 -->
                <el-col :span="9">
                    <div class="block">
                        <el-date-picker
                            v-model="value"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="入住日期"
                            end-placeholder="离店日期"
                        ></el-date-picker>
                    </div>
                </el-col>

                <!-- 选择人数 -->
                <el-col :span="6">
                    <el-input
                        placeholder="请选择入住人数"
                        suffix-icon="el-icon-user-solid"
                        v-model="input"
                        @click="click_P"
                        v-popover:popover2
                    ></el-input>
                </el-col>

                <!-- 查看价格 -->
                <el-col :span="4">
                    <el-button type="primary" @click="getPrice">查看价格</el-button>
                </el-col>
            </el-row>

            <!-- 请选择入住人数 -->
            <el-popover
                ref="popover2"
                style="width: 300px; transform-origin: center top; z-index: 2047; "
            >
                <div style="margin-bottom:10px">
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
                </div>

                <div>
                    <span>温馨提示：禁止携带宠物入住，谢谢！</span>
                </div>
            </el-popover>
        </div>

        <!-- 攻略与地图 -->
        <div class="map">
            <el-row>
                <!-- 攻略模块 -->
                <el-col :span="14">
                    <!-- 区域 -->
                    <div class="district" ref="show6">
                        <el-col :span="3">
                            <span>区域 :</span>
                        </el-col>
                        <el-col :span="20">
                            <div id="district-rg" ref="show">
                                <span>
                                    <i class="el-icon-location-outline place"></i>
                                    <span class="all">全部</span>
                                    &nbsp;&nbsp;
                                    <span
                                        v-for="(item,index) in citys"
                                        :key="index"
                                        class="district-item"
                                    >
                                        <a
                                            href="https://you.ctrip.com/place/Nanjing9.html"
                                            class="item-name"
                                        >{{item.name}}</a>&nbsp;&nbsp;
                                    </span>
                                </span>
                            </div>

                            <a href="#" @click="click_down" class="pack_up" v-if="!isShow2">
                                <i class="el-icon-arrow-down pack_down"></i>等43个区域
                            </a>
                            <a href="#" @click="click_down" class="pack_up" v-if="isShow2">
                                <i class="el-icon-arrow-up pack_down"></i>等43个区域
                            </a>
                        </el-col>
                    </div>

                    <!-- 攻略 -->
                    <div class="strategy">
                        <el-col :span="3">
                            <span>攻略 :</span>
                        </el-col>

                        <el-col :span="20">
                            <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
                        </el-col>
                    </div>

                    <!-- 均价 -->
                    <div class="price">
                        <el-col :span="3">
                            <span>
                                均价
                                <i class="el-icon-question question"></i>&nbsp;&nbsp;&nbsp; :
                            </span>
                        </el-col>
                        <el-tooltip effect="dark" content="等级评定是针对房价,设施和服务等各方面水平的综合评估">
                            <el-col :span="20">
                                <span>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>&nbsp;¥288
                                    &nbsp;&nbsp;&nbsp;
                                    <i
                                        class="iconfont iconhuangguan"
                                    ></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>&nbsp;¥498
                                    &nbsp;&nbsp;&nbsp;
                                    <i
                                        class="iconfont iconhuangguan"
                                    ></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>&nbsp;¥688
                                </span>
                            </el-col>
                        </el-tooltip>
                    </div>
                </el-col>

                <!-- 地图模块 -->
                <el-col :span="10">
                    <!-- 数据加载图片 -->
                    <img src="/loading.gif" alt v-if="citys.length===0" class="loading" />
                    <div v-if="citys.length!=0">
                        <div id="container"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //输入框
            restaurants: [],
            state: "南京",
            timeout: null,

            //城市景点推荐
            citys: [],

            //选择日期
            value: "",

            //显示隐藏城市景点
            isShow2: false,

            arr: [],

            //选择人数
            input: "",
            value1: "",
            value2: "",
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
                }
            ],
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
                }
            ]
        };
    },
    methods: {
        loadAll() {
            return [
                { value: "南京" },
                { value: "成都" },
                { value: "厦门" },
                { value: "杭州" },
                { value: "深圳" },
                { value: "上海" },
                { value: "北京" },
            ];
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString
                ? restaurants.filter(this.createStateFilter(queryString))
                : restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 800 * Math.random());
        },
        createStateFilter(queryString) {
            return state => {
                return (
                    state.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleCitySelect(state) {
          this.state = state.value;
          let this2= this
          setTimeout(() => {
            this2.Mpa(this.state);
            this2.jiant(this.state);
          }, 200);
        },

        // 城市输入框失去焦点时候触发
        handleCityBlur() {
          this.state = this.restaurants[0] ? this.restaurants[0].value : "";
          this.jiant(this.state);
        },

        //查看价格
        getPrice() {
          this.jiant(this.state)
        },

        //选择人数
        click_P() {
            this.isShow = !this.isShow;
        },

        //确定人数
        handleSure() {
            this.input = +this.value1 + +this.value2;
        },

        //显示城市景点
        click_down() {
            this.isShow2 = !this.isShow2;
        },

        // 区域的多余部分展示和隐藏
        click_down() {
            this.isShow2 = !this.isShow2;
            if (this.isShow2) {
                this.$refs.show.style.height = "140px";
                this.$refs.show6.style.height = "170px";
            } else {
                this.$refs.show.style.height = "40px";
                this.$refs.show6.style.height = "70px";
            }
        },

        jiant(city) {
            //城市景点
            if (city == "南京") {
                this.$router.push(`/hotel?city=74`); 
                this.state = city;
                return;
            }
            if (city == "成都") {
                this.$router.push(`/hotel?city=239`); 
                this.state = city;
                return;
            }
            if (city == "厦门") {
                this.$router.push(`/hotel?city=115`); 
                this.state = city;
                return;
            }
            if (city == "杭州") {
                this.$router.push(`/hotel?city=87`); 
                this.state = city;
                return;
            }
            if (city == "深圳") {
                this.$router.push(`/hotel?city=199`);
                this.state = city;
                return;
            }
            if (city == "上海") {
                this.$router.push(`/hotel?city=8`); 
                this.state = city;
                return;
            } else {
                this.$router.push(`/hotel`); 
            }
        },

        Mpa(state) {
            this.$axios({
                url: `https://restapi.amap.com/v3/place/text?key=8b4a6006aeb378fe58a9dc5b66f5f9dd&keywords=酒店&types=&city=${state}&children=1&offset=10&page=1&extensions=all`
            }).then(res => {
                //截取10条搜索回来的数据
                const searchData = res.data.pois;
                searchData.map(v => {
                    v.location = v.location.split(",");
                });
                //根据type搜索类型返回对应的数据
                this.arr = [...searchData];
                let this1 = this;
                //地图加载
                window.onLoad = function() {
                    var map = new AMap.Map("container", {
                        zoom: 11, //级别
                        center: [
                            +this1.arr[7].location[0],
                            +this1.arr[7].location[1]
                        ] //中心点坐标
                    });

                    // 多个点实例组成的数组
                    for (let i = 1; i < this1.arr.length - 1; i++) {
                        var markerContent = `<div class="custom-content-marker">
                        <img src="https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png" width="30" >
                        <div class="close-btn" onclick="clearMarker()" style="position:absolute;top:7px;right:11px;color: #fff;">${i}</div></div>`;
                        var marker = new AMap.Marker({
                            position: new AMap.LngLat(
                                +this1.arr[i].location[0],
                                +this1.arr[i].location[1]
                            ),
                            title: this1.arr[i].name,
                            // 将 html 传给 content
                            content: markerContent,
                            // 以 icon 的 [center bottom] 为原点
                            offset: new AMap.Pixel(-13, -30)
                        });
                        map.add([marker]);
                    }
                };

                //连接地图
                var url =
                    "https://webapi.amap.com/maps?v=1.4.15&key=a68bc8339009bf16b324cd00f678bae8&callback=onLoad";
                var jsapi = document.createElement("script");
                jsapi.charset = "utf-8";
                jsapi.src = url;
                document.head.appendChild(jsapi);
            });
        }
    },

    mounted() {
        this.jiant(this.$route.query.city);
        //搜索框加载
        this.restaurants = this.loadAll();
        //城市景点
        this.$axios({
            url: "/cities?name=南京"
        }).then(res => {
            const { data } = res.data;
            this.citys = data[0].scenics;
        });
        // 加载地图
        this.Mpa(this.state);
    }
};
</script>

<style scoped lang="less">
.main {
    width: 1000px;
    margin: 0 auto;
    //攻略样式
}

.bread {
    margin: 20px 0;
}

.search {
    margin-bottom: 20px;
}

.sure_p {
    float: right;
    height: 30px;
    line-height: 8px;
}

//地图样式
.map {
    margin-bottom: 20px;
}
#container {
    display: block;
    margin: 0 auto;
    width: 400px;
    height: 280px;
}
//区域样式
.district {
    height: 70px;
    font-size: 14px;
    #district-rg {
        height: 40px;
        overflow: hidden;
        .place {
            // color: #ffc863;
            color: #0099ff;
            font-size: 20px;
        }
        .all {
            color: #999;
            background-color: #eee;
            border-radius: 5px;
        }
        .district-item a:hover {
            color: #0099ff;
        }
    }

    .pack_up {
        color: #0099ff;
    }
    .pack_down {
        color: #0099ff;
    }
}

//攻略样式
.strategy {
    font-size: 14px;
    height: 70px;
}

//均价样式
.price {
    position: relative;
    font-size: 14px;
    .question {
        display: block;
        position: absolute;
        top: -3px;
        left: 32px;
        color: #0099ff;
        font-size: 15px;
    }
    .iconhuangguan {
        color: #ffc863;
    }
}
</style>