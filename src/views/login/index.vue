<template>
  <div class="login">
    <!-- 顶部 -->
    <van-nav-bar title="登录" />

    <!-- 输入框 -->
    <!-- 手机号码输入框 -->
    <van-cell-group>
      <van-field
        v-model="mobile"
        required
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        v-validate="'required'"
        name="mobile"
        :error-message=" errors.first('mobile') "
      />
      <!-- 验证码输入框 -->
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
        required
        v-validate="'required'"
        name="code"
        :error-message=" errors.first('code') "
      />
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button type="info" size="large" @click="verify">登录</van-button>
    </div>
  </div>
</template>

<script>
//引入封装好的axios请求
import { useLogin } from "@/api/user.js";

export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810"
    };
  },
  mounted() {
    this.setRulrs();
  },
  methods: {
    //点击登录按钮事件
    async verify() {
      //点击验证规则
      let valid = await this.$validator.validate();
      if (valid) {
        console.log("验证通过");

        try {
          //发送请求
          let res = await useLogin({
            mobile: this.mobile,
            code: this.code
          });

          console.log(res);
         
          // 把token保存到store
          this.$store.commit("setUse", res);
          //页面跳转
          this.$router.push("/home");
        } catch (error) {
          console.log("出错了");
        }
      }
    },
    //自定义提示信息
    setRulrs() {
      const dict = {
        // 自定义规则
        custom: {
          // 定义 mobile 的规则:mobile 规则的名称
          mobile: {
            required: "请输入手机号" // 重写的规则提示
          },
          code: {
            required: "请输入验证码"
          }
        }
      };
      // 使用 规则
      this.$validator.localize("zh_CN", dict);
    }
  }
};
</script>

<style lang = 'less' scoped>
.van-nav-bar {
  background-color: blue;

  .van-nav-bar__title {
    color: #fff;
  }
}

.login-btn {
  margin: 10px;

  .van-button {
    border-radius: 5px;
  }
}
</style>