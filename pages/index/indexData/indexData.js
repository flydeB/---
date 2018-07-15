// pages/index/indexData/indexData.js
const app = getApp()
var util = require('../../../utils/util.js')
var Data = require("../../../utils/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:1,
    xiang:false,
    list:"",//酒店房间
    lists:"",//酒店详情
    url:app.data.url,
    hidden:true,//加载中
    ding:"",//获取预定房间的信息
    luen:false,//控制点击房间图片的轮播出现
    images:"",//点击图片的轮播图片路径

    // 获取开始时间
    date: '',
    tomorrow: '',
    userInfo: {}

    
  },
  act:function(e){
    console.log(e.currentTarget.dataset.num)
    var num = e.currentTarget.dataset.num;
    this.setData({
      act:num
    })
  },
  // 预订
  ding:function(e){
    var userid = wx.getStorageSync('userid')
    if (userid == ''){
      wx.showModal({
        title: '警告',
        content: '您未登录，无法预订房间',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      this.setData({
        xiang: true,
        ding: this.data.list[e.currentTarget.id]
      })
    }
   
    console.log(this.data.ding)
    console.log(this.data.ding.ID)
    console.log(this.data.ding.RoomJiuDianID)
   
  },
  // 跳转预定页面
  yd:function(e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../../yd/yd?fjid=' + that.data.ding.ID + '&RoomJiuDianID=' + that.data.ding.RoomJiuDianID + '&starttime=' + that.data.date + '&stoptime=' + that.data.tomorrow + '&RoomName=' + that.data.ding.RoomName + '&money=' + that.data.ding.RoomPrice,
      // url: '../../yd/yd?fjid=' +  + '&RoomJiuDianID' + e.currentTarget.dataset.jdid + '&starttime' + this.data.date + '&stoptime' + this.data.tomorrow,
    })
  },
  none:function(){
    this.setData({
      xiang: false
    })
  },
  show:function(e){
    this.setData({
      xiang: true
    })
  },
  // 点击图片出现轮播
  image:function(e){
    var img;
    console.log(e.currentTarget.id)
    img = this.data.list[e.currentTarget.id].RoomContent.split('alt');
    var re = /src=\"([^\"]*?)\"/i;
    var num = [];
    for (var i = 0; i < img.length; i++) {
      if (re.test(img[i])) {
        var arr = img[i].match(re);
        num.push(arr[1])
      } else {
        console.log("my")
      }
    }
    this.setData({
      images:num,
      luen:true
    })
    console.log(this.data.images)
  },
  //点击图片的轮播消失
  luenHide:function(){
    this.setData({
      images: '',
      luen: false
    })
  },
  // 点击日期组件确定事件 开始时间
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    console.log(startDate);
    console.log(endDate);
    wx.navigateTo({
      url: '../../calender/index?startDate=' + startDate + "&endDate=" + endDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.request({
      url: app.data.url + 'api/hotel.ashx?type=sdetail&sid=',
      data: {
        sid: options.id
      },
      success:function(e){
        var img = [];
        img = e.data.jdresult.jdcontent.split('alt');
        var re = /src=\"([^\"]*?)\"/i;
        var num = [];
        for(var i = 0;i < img.length; i ++){
          if (re.test(img[i])){
            var arr = img[i].match(re);
            num.push(arr[1]) 
          }else{
            console.log("my")
          }
          
          
        }
        e.data.jdresult.jdcontent = num
        that.setData({
          list:e.data.fjresult,
          lists:e.data.jdresult,
          hidden:false
        })
        console.log(that.data.list)
        console.log(that.data.lists)
      }
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
    this.setData({
      xiang: false
    })
    var startDate = this.data.startDate;
    var endDate = this.data.endDate;
    console.log(startDate);
    console.log(endDate);
    var date = Data.formatDate(new Date(), "yyyy-MM-dd");
    var tomorrow1 = new Date();
    tomorrow1.setDate((new Date()).getDate() + 1);
    var tomorrow = Data.formatDate(new Date(tomorrow1), "yyyy-MM-dd");
    if (startDate == null) {
      startDate = date;
      endDate = tomorrow;
    }
    this.setData({
        date: startDate,
        tomorrow: endDate
      });
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