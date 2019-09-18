//封装所有频道相关请求

import instance from "@/utils/repuest.js";

function channelReq() {
  return instance({
    url: "v1_0/user/channels",
    method: "GET"
  });
}

//暴露
export { channelReq };
