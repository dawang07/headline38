<template>
  <div>
    <router-view></router-view>
    <!--底部 标签栏 -->
    <van-tabbar v-model="TabbarActive">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="more-o">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      TabbarActive: 0
    };
  }
};
</script>

<style>
</style>