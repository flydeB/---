// pages/my/q/q.js
const app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = wx.getStorageSync('userid')
    console.log(userid)
    if (userid == "") {
      wx.showModal({
        title: '警告',
        content: '您未登录，无法查看',
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    } else {
    wx.request({
      url: app.data.url + 'api/hotel.ashx?type=myyhj&openid=',
      data:{
        openid: userid
      },
      success: function (e) {
        console.log(e.data.result)
        for (var i = 0; i < e.data.result.length; i++) {
          console.log(e.data.result[i].YouHuiQuanStopTime)
          var sj = e.data.result[i].YouHuiQuanStopTime.slice(6, e.data.result[i].YouHuiQuanStopTime.length - 2);
          sj = new Date(parseInt(sj))
          var num = util.formatTimes(sj)
          e.data.result[i].YouHuiQuanStopTime = num
        }

        that.setData({
          list: e.data.result
        })
      }
    })
    }
  },

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