//封装所有用户相关的网络请求

import instance from "@/utils/repuest.js";

//登录接口
function useLogin({ mobile, code }) {
  return instance({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile: mobile,
      code: code
    }
  });
}

//暴露
export { useLogin };
