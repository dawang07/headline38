import axios from "axios";
//引入store
import store from "@/store";

const instance = axios.create({
  //设置基地址
  baseURL: " http://ttapi.research.itcast.cn/app/"
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

//请求拦截
instance.interceptors.request.use(
  function(config) {
    //请求成功

    //判断用户是否是登录
    let use = store.state.use;
    if (use && use.token) {
      //设置请求头 添加token
      config.headers.Authorization = `Bearer ${use.token}`;
      
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//响应拦截
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // 响应成功
    return response.data.data || response.data;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

//暴露
export default instance;
