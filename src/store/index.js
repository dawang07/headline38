import Vue from "vue";
import Vuex from "vuex";

import * as author from "@/utils/author.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    use: author.getAuthor()
  },
  mutations: {
    // 设置use
    setUse(state, use) {
      author.setAuthor(use);
    }
  },
  actions: {}
});
