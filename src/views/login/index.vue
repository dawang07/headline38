<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="登录" />

    <!-- 输入框 -->
    <!-- 手机号码输入框 -->
    <van-cell-group>
      <van-field v-model="mobile" label="手机号" right-icon="question-o" placeholder="请输入手机号" />
      <!-- 验证码输入框 -->
      <van-field v-model="code" label="验证码" placeholder="请输入验证码" />
    </van-cell-group>

    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      code: ""
    };
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