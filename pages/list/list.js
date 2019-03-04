// pages/list/list.js
// 获取该 js 中暴露出来的对象.
let data = require('../../datas/list-data.js');
console.log(data);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [] 
  },
  /**
   * 跳转进入详情页
   */
  goDetailPage(event) {
    console.log('获取到结构传入的数据', event);
    // 注意非冒泡事件的参数在 currentTarget 中, 而冒泡事件的参数在 target 中.
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      // 这里只能传递字符串, 不能传递对象, 因为传过去的数据都会被 toString() 一下.
      // 所以我们数据已有的数据可以保存到 app.js 中, 既在一次赋值以后，
      // 在其他任何位置都能获取到.
      url: '/pages/detail/detail?index=' + index,
    })
  },
  /**
   * 通过点击轮播图跳转到详情页
   */
  swiperGoDetail(event) {
    console.log(event);
    // 注意和 goDetailPage 方法获取 index 时的区别.
    // 注意非冒泡事件的参数在 currentTarget 中, 而冒泡事件的参数在 target 中.
    let index = event.target.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/detail?index=' + index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将数据保存到当前页面实例的 listArr 属性数据中.
    this.setData({
      listArr: data.list_data
    })
  }
})