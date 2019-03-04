// pages/detail/detail.js
let data = require('../../datas/list-data.js');
let appData = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 参数中存的是另一个页面传过来的数据
    console.log('接收到列表页面传递过来的数据：', options);
    let index = options.index;
    this.setData({
      detailObj: data.list_data[index],
      index
    })

    // 获取缓存数据
    let storageData = wx.getStorageSync('isCollected');
    if (!storageData) {
      // 如果没有缓存, 则存入一个空对象
      wx.setStorageSync('isCollected', {});
    }
    if (storageData[index]) {
      // 如果收藏缓存的当前页面的对应值为 true 时, 则更新收藏数据.
      this.setData({
        isCollected: true
      })
    }

    appData.data.bgAudioManager.onPlay(() => {
      console.log('开始播放');
      if (appData.data.isMusicPlay && appData.data.musicPageIndex === index) {
        console.log('开始播放: 当前播放');
        this.setData({
          isMusicPlay: true
        })
      }
    });
    appData.data.bgAudioManager.onPause(() => {
      console.log('暂停播放');
      this.setData({
        isMusicPlay: false
      })
    });
  },
  /**
   * 处理收藏功能的点击事件
   */
  handleCollection() {
    // 每次点击收藏时更新数据
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });
    // 每次更新收藏数据时弹出提示.
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
    // 将是否收藏保存到本地缓存, 缓存到本地的数据可以在调试器的Storage界面中查看。
    // 这里将其保存为 {'isCollected': {'0': true, '1': false,...}} 的形式
    wx.getStorage({
      key: 'isCollected',
      success: (storageData) => {
        // 注意：这里可能会出错, 因为如果开始没有缓存数据的话, storageData 为 null，
        // 所以需要在 onLoad 方法中判断是否缓存过，没有缓存的话, 需要存储一个空对象{}.
        console.log('获取到的缓存值：', storageData);
        let {index} = this.data; // 对象的解构写法
        let obj = storageData.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success() {
            console.log('缓存成功');
          }
        })
      },
    })
  },
  /**
   * 处理音乐播放事件
   */
  handleMusicPlay() {
    // 更新页面播放状态
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });

    // 播放或暂停音乐
    // 注意：我测试的时候只有在真机上才能播放出音乐, 在模拟器上一闪而没.
    // const bgAudioManager = wx.getBackgroundAudioManager();
    if (isMusicPlay) {
      let { dataUrl, title, coverImgUrl } = this.data.detailObj.music;
      appData.data.bgAudioManager.title = title;
      appData.data.bgAudioManager.src = dataUrl;
      
      console.log('src:', appData.data.bgAudioManager.src);
      // bgAudioManager.play();
      appData.data.isMusicPlay = true;
      appData.data.musicPageIndex = this.data.index;
    } else {
      appData.data.bgAudioManager.pause();
      appData.data.isMusicPlay = false;
      appData.data.musicPageIndex = this.data.index;
    }
  },
  /**
   * 处理分享事件
   */
  bandleShare() {
    // 个人开发没有这些权限，需要企业的才能有这些功能
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享到qq空间', '分享到微博'
      ],
      success: (data) => {
        console.log('分享', data);
        console.log('选择的item下标为：', data.tapIndex);
      }
    })
  }
})