<template>
  <div>
    <div class="cmt-wrapper">
      <a name="post"></a>
      <h4 class="cmt-title">评论</h4>
      <!---->

      <span data-v-741ea8d8 class="replyTag el-tag el-tag--info" v-if="postflg">
        回复 @{{huifunickname}}
        <i class="el-tag__close el-icon-close" @click="guanbi"></i>
      </span>

      <div class="cmt-input">
        <div class="el-textarea">
          <textarea
            autocomplete="off"
            placeholder="说点什么吧..."
            class="el-textarea__inner"
            style="resize: none; min-height: 32px;"
            v-model="value"
            autofocus="auto"
          ></textarea>
        </div>
      </div>
      <div class="cmt-input-ctrls el-row is-justify-space-between el-row--flex">
        <div class="cmt-pics">
          <!-- 这个是图片上传 -->

          <!-- 这个是图片上传 -->
          <el-upload
            name="files"
            :action="`${$axios.defaults.baseURL}/upload`"
          
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleRight"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>

          <!-- 图片上传结束 -->
        </div>
        <div>
          <button
            type="button"
            class="el-button cmt-submit el-button--primary el-button--mini"
            @click="btn"
          >
            <!---->
            <!---->
            <span>提交</span>
          </button>
        </div>
      </div>
      <!-- 这个是评论开始的地放 -->
      <!---->
      <div class="cmt-list" v-for="(item,index) in list" :key="index">
        <div class="cmt-item">
          <div class="cmt-info">
            <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
            {{item.account.nickname}}
            <i>{{item.created_at}}</i>
            <span>{{item.level}}</span>
          </div>
          <div class="cmt-content">
            <div class="cmt-floor">
              <div class="cmt-content">
                <cmfInfo v-if="item.parent" :item="item.parent" @sonhuifu="sonhuifu" />
              </div>
            </div>
            <div class="cmt-new">
              <div class="newpinglun" ref="new">
                <div class="imgs">
                  <img
                    v-if="item.pics[0].url"
                    v-for="(ite,inde) in item.pics"
                    :key="inde"
                    :src="`${$axios.defaults.baseURL}${ite.url}`"
                  />
                </div>
                <p class="cmt-message">{{item.content}}</p>
                <div class="cmt-ctrl">
                  <a href="#post" ref="new" @click="huifu(item.id,item.follow.id)">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
    </div>
  </div>
</template>

<script>
import cmfInfo from "./cmt-info";
export default {
  props: ["list", "id", "indexsize"],
  data() {
    return {
      header: {},
      postflg: false,
      auto: false,
      data: [],
      flg: false,

      huifunickname: "", //输入框上面的回复栏
      dialogImageUrl: "", //这个是图片框
      dialogVisible: false, //这个是图片框
      disabled: false, //这个是图片框
      visible: false, //这个是评论框上面的

      value: "", //内容
      pics: [], //图片数组
      follow: "" //回复的id
    };
  },

  components: {
    cmfInfo
  },
  methods: {
    handleRemove(file, fileList) {
      this.pics = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRight(response, file, fileList) {
      fileList.forEach(v => {
        this.pics.push(v.response[0]);
      });

      console.log("这个是成功后的图片地址", this.pics);
    },
    huifu(id, nickname) {
      this.huifunickname = nickname;
      (this.postflg = true), (this.follow = id);
    },
    sonhuifu(id,nickname) {
      
      (this.huifunickname = nickname),
        (this.postflg = true),
        (this.follow = id);
    },
    guanbi() {
      this.postflg = !this.postflg;
      (this.huifunickname = ""), (this.follow = "");
    },
    //点击按钮的时候的ajax
    btn() {
      const data = {
        content: this.value,
        pics: this.pics,
        post: this.id,
        follow: this.follow
      };
      console.log("这个是长传图片的", data);
      const header = `Bearer ${this.$store.state.user.userInfo.token}`;
      this.header = {
        Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
      };
      this.$axios({
        url: "/comments",
        method: "post",
        data,
        headers: {
          Authorization: header
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "提交成功") {
          this.$message.success(message);
          this.value = "";
          this.follow = "";
          this.$refs.upload.clearFiles();
          this.dialogImageUrl = "";

          //发送评论ajax
          const id = this.$route.query.id;
          const param = {
            post: id,
            _limit: 10,
            _start: this.indexsize
          };
          this.$axios({
            url: `/posts/comments?`,
            params: param
          }).then(res => {
            this.total = res.data.total;
            const { data } = res.data;

            console.log("这个评论页list", data);
            this.list = data;
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.cmt-info {
  font-size: 14px;
  color: #999;
  img {
    height: 16px;
    width: 16px;
  }
}
.cmt-list {
  border: 1px solid #999;
}

.cmt-item {
  margin: 15px;
}

.cmt-input-ctrls {
  margin-bottom: 20px;
}
.cmt-input-ctrls {
  margin: 10px 0;
}
.cmt-ctrl {
  display: block;
  text-align: right;
  height: 25px;
}
.cmt-new {
  a {
    display: none;
  }
}
.cmt-new:hover {
  a {
    
    display: block;
  }
}
</style>