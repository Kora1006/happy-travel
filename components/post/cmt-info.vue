<template>
  <div>
    
    <!-- <script src="../../node_modules/moment/moment.js"></script>
    <script src="../../node_modules/moment/moment.d.ts"></script> -->

    <div class="box" >
      <div v-if="item.parent">
        <digui :item="item.parent" />
      </div>
     <div class="new">
        <div class="top"  >
        <span>
          {{item.account.nickname}}
          <i>
            {{item.created_at}}
          </i>
        </span>
        <span class="right1">{{item.level}}</span>
      </div>
      <div class="imgs">
        
                  <img v-if="item.pics[0].url"  
                  v-for="(ite,inde) in item.pics" 
                  :key="inde" 
                  :src="`${$axios.defaults.baseURL}${item.url}`" >
                </div>
      <div class="bottom" >{{item.content}}
        <div class="newtxt">
        <a  href="#post" class="txt"    @click="huifu(item.id,item.account.nickname)">回复</a>
</div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "digui",
  props: ["item"],
  data() {
    return {
      flg: false
    };
  },
  // methods:{
  //  sss(){
  //    this.flg=!this.flg    
  //  // console.log(this.$refs.the.dataset.id)
  //  },
  // ccc(){
  //    this.flg=!this.flg
  // },
 methods:{
    huifu (id,nickname) {
      console.log(id)
      console.log(nickname)
     this.$emit("sonhuifu",id,nickname)
}
 }
  
};
</script>

<style scoped lang="less">
.box {
  border: 1px solid #999;
  background-color: #f9f9f9;
  padding: 5px;
}
.top{
  display: flex;
  justify-content: space-between;
  font-size:16px;
  color: #999; 
  margin-bottom:10px; 
}
.bottom {
  .txt{
    cursor:pointer;
    text-align: right;
  }
}
.newtxt{
  height: 25px;
}
.new {
  .txt {
   
    display: none,
  }
}
.new:hover {
  .txt {
    display: block,
  }
}

</style>