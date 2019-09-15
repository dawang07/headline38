// 对token操作的封装

// 定义键
const Author_key = "use";

//存储数据
function setAuthor(value) {
  window.localStorage.setItem(Author_key, JSON.stringify(value));
}

//获取数据
function getAuthor() {
  return window.localStorage.getItem(Author_key)
    ? JSON.parse(window.localStorage.getItem(Author_key))
    : null;
}

//清楚数据
function removeAuthor() {
  window.localStorage.removeItem(Author_key);
}

//暴露
export { setAuthor, getAuthor, removeAuthor };
