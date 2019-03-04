Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    isShow: true, // 是否显示用户授权按钮
  },
  /**
   * 跳转到 list 页面
   */
  goListPage() {
    // 只能跳转到有 tabBar 的页面.
    wx.switchTab({
      url: '/pages/list/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad ');
    this.getUserInfo();
  },
  /**
   * 获取用户信息
   */
  getUserInfo() {
    wx.getSetting({
      success: (data) => {
        console.log('用户授权结果：', data);
        // 如果属性名为特殊写法，需要用下面的方法调用.
        if (data.authSetting['scope.userInfo']) {
          // 用户授权成功
          this.setData({
            isShow: false
          })
        } else {
          // 用户授权失败
          this.setData({
            isShow: true
          })
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        console.log(data);
        // 因为上面用了箭头函数，所以这里可以使用 this 去调用 setData() 方法
        // 更新页面数据
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail() {
        console.log('获取用户信息失败');
      }
    })
  },

  /**
   * 用户是否授权的回调
   */
  getBindUserInfo(data) {
    if (data.detail.rawData) {
      console.log('用户点击允许授权：', data);
      // 判断允许授权后, 再次获取用户信息
      this.getUserInfo();
    } else {
      console.log('用户点击拒绝授权：', data);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady ');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow ');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})