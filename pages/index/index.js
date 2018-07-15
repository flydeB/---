//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:"",
    url:app.data.url,
    hidden: true,//加载中
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list()
  },
  // 获取酒店列表
  list:function(){
    var that = this;
    wx.request({
      url: encodeURI(app.data.url + 'api/hotel.ashx?type=slist'),
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success:function(e){
        console.log(e)
        that.setData({
          list: e.data.result ,
          hidden:false
        })
        console.log(that.data.list)
      }
    })
  },
  // 跳转到首页
  shouye:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  my: function () {
    wx.redirectTo({
      url: '../my/my',
    })
  },

  // 跳转到酒店详情
  xiang:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "indexData/indexData?id=" + e.currentTarget.id,
    })
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