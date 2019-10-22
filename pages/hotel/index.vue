<template>
    <div>
        
       <div>
           <HotelDetail/>
       </div>
    </div>
</template>

<script>
// 引入酒店详情组件
import HotelDetail from "@/components/hotel/hotelDetail"
export default {
    //注册组件
    components:{
        HotelDetail
    },

    //请求酒店数据
    mounted(){
        this.$axios({
            url:"/hotels",
        }).then(res=>{
           console.log(res)
        })
    }
}
</script>

<style>

</style>