<template>
  <div class="content-wrap">
    <h2>发表新攻略</h2>
    <p>分享你的个人游记，让更多人看到哦！</p>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item prop="content">
        <VueEditor :config="config" ref="vueEditor" />
      </el-form-item>
      <el-form-item label="选择城市" prop="city">
        <el-autocomplete
          v-model="form.city"
          :fetch-suggestions="queryCitySearch"
          placeholder="请搜索游玩城市"
          :trigger-on-focus="false"
          @select="handleCitySelect"
          @blur="handleBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>&nbsp;或者
        <span style="color:#ffa500;" @click="handleDraft">保存到草稿</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
import moment from "moment";

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  data() {
    return {
      // 存储文章内容
      form: {
        title: "",
        content: "",
        city: ""
      },
      newCity: [],
      //   校验表单内容
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入攻略内容", trigger: "blur" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "blur" }]
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "files",
          uploadSuccess: (res, insert) => {
            //   console.log(res)
            insert(this.$axios.defaults.baseURL + res.data[0].url);
          }
        }
      }
    };
  },

  components: {
    VueEditor
  },
  methods: {
    //   输入城市信息时触发
    queryCitySearch(value, cb) {
      //   无输入值
      if (!value) {
        cb({});
        return;
      }
      //   内容不为空时进行城市搜索
      this.$axios({
        url: "/airs/city?name=" + value
      }).then(res => {
        const { data } = res.data;
        //   console.log(data)
        this.newCity = data.map(e => {
          e.value = e.name;
          return e;
        });
        cb(this.newCity);
      });
    },
    // 选择搜索到的城市
    handleCitySelect(value) {
      //   console.log(value);
      this.form.city = value.value;
    },
    // 当输入框失去焦点时默认选取第一项
    handleBlur() {
      // 即无选择项（表示已经写好）
      if (this.newCity.length === 0) return;
      this.form.city = this.newCity[0].value;
      this.newCity = [];
    },
    // 获取富文本框的内容
    getPostContent() {
      let quill = this.$refs.vueEditor.editor;
      this.form.content = quill.root.innerHTML;
    },
    // 保存草稿
    handleDraft() {
      this.getPostContent();
      let newpost = { ...this.form };
      let timer = moment().format("YYYY-MM-DD");
      newpost.timer = timer;
      this.$store.commit("post/setPostData", newpost);
    },
    // 发布攻略
    onSubmit() {
      this.getPostContent();
      
      const {timer,...newPost}=this.form

      this.$axios({
        url: "/posts",
        method: "POST",
        data: newPost,
        headers: {
          // 这是jwt标准的token
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status == 200) {
          const { message } = res.data;
          this.$message.success(message);
          setTimeout(() => {
            this.$router.push("/post");
          }, 1500);
        }
      });
    }
  },
  watch: {
    $route() {
      if (this.$route.query) {
        const { index } = this.$route.query;
        const postList = this.$store.state.post.postDraftList;
        this.form = {...postList[index]};
        // 将文章内容赋给富文本编辑器
        this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(0,this.form.content)
      }
    }
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
  /deep/ .ql-editor{
    height: 400px;
  }
}
</style>