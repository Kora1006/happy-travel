<template>
    <div>
            <!-- 酒店详情组件 -->
        <div>
            <HotelDetail/>
        </div>

        <!-- 酒店列表组件 -->
        <div>
            <HotelList/>
<<<<<<< HEAD
        </div>
        
=======
        </div>       
>>>>>>> 847b7dfa57ee563d17847cbd5c146efb51aa5f16
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
<<<<<<< HEAD
          
=======
           
>>>>>>> 847b7dfa57ee563d17847cbd5c146efb51aa5f16
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
<<<<<<< HEAD
        
=======
       
    
>>>>>>> 847b7dfa57ee563d17847cbd5c146efb51aa5f16
    }
}
</script>

<style>

</style>