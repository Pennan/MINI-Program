// pages/movies/movies.js
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
let appData = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    moviesArr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 该请求为 http 的, 但是小程序域名仅支持 https, 将会报错, 
    // 可以通过开发者工具的详情菜单，设置勾选不校验合法域名, 但是控制台仍会弹出警告.
    // 因为此处为 http 请求, 而且设置了不校验合法域名, 只能在开发工具中测试到有数据,
    // 但是在真机上是不能请求到数据的.
    wx.request({
      url: MOVIE_URL,
      success: (data) => {
        console.log('网络请求获取到的数据：', data);
        // 更新页面数据
        this.setData({
          moviesArr: data.data.subjects
        });
        // 将数据保存到全局中去, 以便在电影详情也中可以获取到想要的数据.
        appData.data.moviesArr = data.data.subjects;
      }
    })
  }
})