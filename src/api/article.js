// 封装获取文章列表数据

import instance from "@/utils/repuest.js";

function getArticle({ channel_id, timestamp, with_top }) {
  return instance({
    url: "v1_1/articles",
    method: "GET",
    params: {
      channel_id: channel_id, //频道id
      timestamp: timestamp, //时间戳
      with_top: with_top //是否置顶
    }
  });
}

//暴露
export { getArticle };
