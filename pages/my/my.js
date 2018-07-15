// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('image.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    console.log(1)
    var that = this;
    
    wx.getUserInfo({
      success: function(resuser) {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            
            wx.request({
              url: app.data.url + 'api/hotel.ashx?type=ulogin&code=code&name=&img=',
              data: {
                code: res.code,
                name: resuser.userInfo.nickName,
                img: resuser.userInfo.avatarUrl
              },
              success: function (e) {
                wx.setStorageSync('userid', e.data.result)
              }
            })
          }
        })
        
          wx.setStorageSync('userInfo', resuser.userInfo)
          that.setData({
            userInfo: resuser.userInfo
          })
          
          console.log(resuser)
      },
      fail: function () {
        // 调用微信弹窗接口
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法正常使用支付的功能。请在10分钟再次点击授权，或者删除小程序重新进入。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    this.setData({
      userInfo: userInfo
    })
  },
  // 跳转到首页
  shouye: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  my: function () {
    wx.redirectTo({
      url: '../my/my',
    })
  },
  ka:function(){
    wx.navigateTo({
      url: './ka/ka',
    })
  },
  ding:function(){
    wx.navigateTo({
      url: './ding/ding',
    })
  },
  zhi:function(){
    wx.navigateTo({
      url: './zhi/zhi',
    })
  },
  q: function () {
    wx.navigateTo({
      url: './q/q',
    })
  },
  yuan:function(){
    wx.navigateTo({
      url: './yuan/yuan',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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