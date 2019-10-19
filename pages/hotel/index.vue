<template>
  <div>
    <!-- 高德地图 -->
    <div id="map-wrap"></div> 
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("map-wrap");
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=f1357cd6a96013e9d92c0c450811e88d&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    this.$axios({
      url:'/cities',
      params:{
        name:'上海'
      }

    }).then(res=>{
      console.log(res)
    })
  }
};
</script>

<style lang="less" scoped>
#map-wrap {width:300px; height: 180px; }  
</style>