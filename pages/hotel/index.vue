<template>
    <div>
            <!-- 酒店详情组件 -->
        <div>
            <HotelDetail/>
        </div>

        <!-- 酒店列表组件 -->
        <div>
            <HotelList/>
        </div>
        <el-button
            type="primary"
            @click="openFullScreen"
            v-loading.fullscreen.lock="fullscreenLoading">
            拼命加载中...
        </el-button>
    </div>
</template>

<script>
// 引入酒店详情组件
import HotelDetail from "@/components/hotel/hotelDetail"
import HotelList from "@/components/hotel/hotelList"
export default {
    //注册组件
    components:{
        HotelDetail,
        HotelList
    },
    data() {
        return {
            fullscreenLoading: false
        }
        },
    //请求酒店数据
    mounted(){
        this.$axios({
            url:"/hotels",
        }).then(res=>{
           console.log(res)
        })
    },
    methods:{
        openFullScreen() {
        // this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = true;
        }, 3000);
      },
    
    }
}
</script>

<style>

</style>