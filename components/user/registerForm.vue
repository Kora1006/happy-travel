<template>
  <el-form :model="registForm" ref="registForm" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="registForm.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="请输入验证码" v-model="registForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="昵称" v-model="registForm.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="registForm.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPass">
      <el-input placeholder="确认密码" type="password" v-model="registForm.checkPass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { async } from 'q';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 必须设置回调函数，否则该验证一直在执行导致整表无法校验
        callback();
      }
    };
    return {
      registForm: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    async handleSendCaptcha() {
      if (!this.registForm.username) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (this.registForm.username.length !== 11) {
        this.$message.error("手机号必须为11位");
        return;
      }

      const res = await this.$store.dispatch('user/sendCaptcha',this.registForm.username)
      if (res.status === 200) {
        const { code } = res.data;
        this.$message.success(`验证码为${code}`);
      }
    },
    handleRegSubmit() {
      const { checkPass, ...props } = this.registForm;

      // console.log(this.$refs.registForm);
      this.$refs.registForm.validate(async valid => {
        if (valid) {
          const res = await this.$store.dispatch("user/register", props);
         
          if (res.status == 200) {
               console.log(this.$store.state)
            this.$message.success("登录成功");
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>