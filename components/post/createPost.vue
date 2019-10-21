<template>
  <div class="content-wrap">
    <h2>发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦！</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <VueEditor :config="config" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  data() {
    return {
        // 存储文章内容
        form:{
            title:"",
            content:"",
            city:""
        },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.default.baseURL+"/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess:(res, insert)=> {
            insert(this.$axios.default.baseURL + res.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.default.baseURL+"/upload",
          name: "files",
          uploadSuccess:(res, insert)=> {
            insert(this.$axios.default.baseURL+ res.data.url);
          }
        }
      }
    };
  },

  components: {
    VueEditor
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  h2 {
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
}
</style>