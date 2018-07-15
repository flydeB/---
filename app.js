//app.js
App({
  data:{
    url:"https://ms.dedde.cn/",
    userid:""
  },
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // var userid = wx.getStorageSync('userid')
    // this.setData({
    //   userid
    // })
  },
  globalData: {
    userInfo: null
  }
})