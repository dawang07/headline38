<template>
  <div class="home">
    <!-- 顶部 -->
    <van-nav-bar title="首页" />

    <!-- 频道区 (标签页)-->
    <van-tabs v-model="tabActive">
      <div class="moreIcon">
        <van-icon name="wap-nav" slot="nav-right" @click="moreChannel" />
      </div>
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="item.pullLoading" @refresh="onRefresh(item)">
          <!-- 内容列表 -->
          <van-list
            v-model="item.drapLoading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="article in item.article" :key="article.art_id" :title="article.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 更多频道弹开层 -->

    <!-- 频道弹开层 -->
    <channel v-model="show"></channel>
  </div>
</template>

<script>
name = "homename";
import { channelReq } from "@/api/channel.js";
import { getArticle } from "@/api/article";
import channel from "@/views/home/channel";
export default {
  //使用组件
  components: {
    channel
  },
  data() {
    return {
      tabActive: 0, //频道绑定数据
      //上拉刷新
      // drapLoading: false,
      // //上拉加载完毕
      // finished: false,
      // //内容信息数据
      contentList: [],
      // //下拉刷新
      // pullLoading: false,
      //控制更多频道弹出层是否显示
      show: false,
      //频道数据列表
      channelList: []
    };
  },
  methods: {
    //页面一加载触发
    async onLoad() {
      //获取数据
      //获取当前激活频道的对象
      let channel = this.channelList[this.tabActive];

      //当前激活频道的id
      let channel_id = channel.id;
      //第一次进入方法,直接获取当前时间的数据
      if (channel.pre_timestamp == 0) {
        let res = await getArticle({
          channel_id: channel_id,
          timestamp: Date.now(), //当前时间戳
          with_top: 1 //1 表示可以置顶
        });
        // console.log(res);
        //将数据添加到当前频道中
        channel.article = res.results;
        //记录时间
        channel.pre_timestamp = res.pre_timestamp;
      } else {
        //第二次进入方法,直接请求一页数据
        let res = await getArticle({
          channel_id: channel_id,
          timestamp: Date.now(), //当前时间戳
          with_top: 1 //1 表示可以置顶
        });
        // console.log(res);
        //将数据添加到当前频道中
        channel.article = [...channel.article, ...res.results];
        //记录时间
        channel.pre_timestamp = res.pre_timestamp;
      }
      channel.drapLoading = false;
    },
    //下拉刷新事件
    onRefresh(item) {
      //获取当前激活频道
      let activationChannel = this.channelList[this.tabActive];
      //重置所有属性
      activationChannel.article = [];
      activationChannel.drapLoading = false;
      activationChannel.pullLoading = false;
      activationChannel.finished = false;
      activationChannel.pre_timestamp = 0;
      this.onLoad();
    },
    //点击更多频道图标事件
    moreChannel() {
      this.show = true;
    },
    //获取频道列表数据
    async getChannelList() {
      //获取token
      let { use } = this.$store.state;
      // 判断用户有没有登录
      if (use) {
        //发送请求
        let res = await channelReq();
        this.channelList = res.channels;
      } else {
        //判断有没有缓存频道数据
        let channel = JSON.parse(window.localStorage.getItem("channel"));
        if (channel) {
          this.channelList = channel;
        } else {
          let res = await channelReq();
          this.channelList = res.channels;
        }
      }
      // console.log(this.channelList);
      // 调用方法,添加额外属性
      this.addChannelAttribute();
    },
    //将所有频道添加属性
    addChannelAttribute() {
      this.channelList.forEach(item => {
        //添加文章
        this.$set(item, "article", []);
        //添加上拉
        this.$set(item, "drapLoading", false);
        //添加下拉
        this.$set(item, "pullLoading", false);
        //添加完成状态
        this.$set(item, "finished", false);
        //添加时间戳
        this.$set(item, "pre_timestamp", 0);
      });
    }
  },
  mounted() {
    this.getChannelList();
  }
};
</script>

<style lang = 'less' scoped>
.home {
  margin: 90px 0 50px;
}
.van-nav-bar {
  background-color: blue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .van-nav-bar__title {
    color: #fff;
  }
}

/* 修改当前组件下的另一个组件 */
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  z-index: 100;
  width: 90%;
}

.home /deep/ .moreIcon {
  position: fixed;
  top: 55px;
  right: 10px;
  z-index: 200;
}
</style>