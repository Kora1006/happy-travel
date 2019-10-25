<template>
    <div class="hotel_list">
        <!-- 条件筛选 -->
        <HotelFilters @setHotelData="setHotelData" />

        <!-- 酒店列表 -->
        <div class="hotels">
            <!-- 数据加载图片 -->
            <img src="/loading.gif" alt v-if="dataList.length===0" class="loading" />
            <div class="hotels_item" v-for="(item,index) in dataList" :key="index">
                <el-row>
                    <el-col :span="8">
                        <nuxt-link :to="`/hotel/${item.id}`">
                            <img
                                :src="`${item.photos}`"
                                :alt="`${item.name}`"
                                style="width:310px;height:210px"
                            />
                        </nuxt-link>
                    </el-col>
                    <el-col :span="10">
                        <h3 style="font-size:24px;font-weight: normal;">
                            <nuxt-link :to="`/hotel/detail?id=${item.id}`">{{item.name}}</nuxt-link>
                        </h3>
                        <span style="color:#9ea3b1">{{item.alias}}</span>&nbsp;
                        <span
                            style="font-size:12px;color:#ff9900;font-weight:600"
                        >({{item.creation_time}})</span>&nbsp;
                        <!-- 星级 -->
                        <span v-if="item.hotellevel" :title="`${item.hotellevel.name}级`">
                            <i
                                class="iconfont iconhuangguan"
                                v-for="num in item.hotellevel.level"
                                :key="num"
                                style="color:#ff9900"
                            ></i>&nbsp;
                            <span style="color:#9ea3b1">{{item.hoteltype.name}}</span>
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
                                <span
                                    class="height-light"
                                    style="color: rgb(255, 153, 0);"
                                >{{item.all_remarks}}</span>
                                条评价
                            </el-col>
                            <el-col :span="7">
                                <span
                                    class="height-light"
                                    style="color: rgb(255, 153, 0);"
                                >{{item.visits_total}}</span>
                                篇游记
                            </el-col>
                        </div>
                        <div class="location-row" style="margin-top:50px">
                            <i class="iconfont iconlocation icon_style" style="color:#00a6ff"></i>
                            <span style="color:#666">位于: {{item.address}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://www.meituan.com/jiudian/4878340/">
                            <div
                                v-for="(item,index) in item.products"
                                :key="index"
                                class="hotel_products"
                            >
                                <span>{{item.name}}</span>
                                <span class="hotel_price">
                                    <span style="color: #f90;font-size: larger;">￥{{item.price}}</span>起
                                    <i data-v-0a769ebc class="el-icon-arrow-right"></i>
                                </span>
                            </div>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!-- 分页 -->
        <div style="margin-top:20px;margin-left:250px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[3,6, 9, 12]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="hotelsList.length"
                class="pagination"
            ></el-pagination>
        </div>

        <!-- 加载 -->
    </div>
</template>

<script>
import HotelFilters from "@/components/hotel/hotelFilters";
export default {
    components: {
        HotelFilters
    },
    data() {
        return {
            //酒店列表
            hotelsList: [],

            //分页
            dataList: [],
            pageSize: 3,
            pageIndex: 1,
            total: 0
            //加载
        };
    },
    methods: {
        //切换页数
        handleSizeChange(value) {
            //切换条数
            this.pageSize = value;
            this.dataList = this.hotelsList.slice(0, this.pageSize);
        },
        handleCurrentChange(value) {
            //修改当前页
            this.pageIndex = value;
            //修改酒店列表
            this.dataList = this.hotelsList.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
        },
        //子组件传进来的筛选条件
        setHotelData(arr) {
            this.hotelsList = arr;
            this.total = this.hotelsList.length;
            this.pageIndex = 1;
            //修改酒店列表
            this.dataList = this.hotelsList.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
        },

        axios1(newVal) {
            this.$axios({
               url: "/hotels",
               params: newVal
            }).then(res => {
                const data1 = res.data.data;
                this.hotelsList = data1;
                
                //第一页数据
                this.dataList = this.hotelsList.slice(0, this.pageSize);
            });
        }
    },

    // 监听 组件实例属性
    watch: {
        // 监听 url 中 city 数据的变化重新请求数据
        "$route.query.city": function(newVal, oldVal) {
            
            let obj= {}
            obj.city = newVal
            this.axios1(obj); // 请求 导航与搜索的文章数据/
        }
    },

    async mounted() {
        //获取酒店选项
        const res = await this.$axios({
            url: "/hotels/options"
        });
        // console.log(res,9999999)
        const { data } = res.data;
        this.assets = data.assets;
        this.brands = data.brands;
        this.levels = data.levels;
        this.types = data.types;
       
        //获取酒店列表
        const hotelList = await this.$axios({
            url: "/hotels?_limit=121",
            params: this.$route.query
        });
        // console.log(hotelList,888888888888)
        const data1 = hotelList.data.data;
        this.hotelsList = data1;
        //第一页数据
        this.dataList = this.hotelsList.slice(0, this.pageSize);
    }
};
</script>

<style scoped lang="less">
.hotel_list {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 20px;
    .hotels {
        // 数据加载图片样式
        .loading {
            display: block;
            margin: 0 auto;
        }
        .hotels_item {
            padding: 25px 0;
            border-bottom: 1px solid #eeeeee;
            .hotel_products {
                padding: 20px 10px;
                display: flex;
                justify-content: space-between;
                align-content: center;
                border-bottom: 1px solid #eeeeee;
                .hotel_price {
                    margin-right: 15px;
                }
            }
        }
    }
}
</style>