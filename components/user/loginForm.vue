<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password"  v-model="form.password"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button class="submit" type="primary" @click="handleLoginSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { async } from 'q';
export default {
  data() {
    return {
      // 提交数据
      form: {
          username:'',
          password:''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" }
        ],
          password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
        // 对获取到的数据进行校验
         this.$refs['form'].validate(async(valid) => {
          if (valid) {
           let res = await this.$axios({
               url:'/accounts/login',
               method:'POST',
               data:this.form
           })
           console.log(res)
         
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