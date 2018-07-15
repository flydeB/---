// pages/yd/yd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fjname:"",//房间名
    kai: "",//开始时间
    jie: "",//结束时间
    nums: 1,//房间数
    names: "",//用户名
    phones: "",//用户号码
    jdid: "",//酒店号码
    fjid: "",//房间号码
    money: "",//房间费用
    moneys:"",
    userid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = wx.getStorageSync('userid')
    console.log(userid)
    var jdid = options.RoomJiuDianID;//酒店id
    var fjid = options.fjid;//房间id
    var starttime = options.starttime;//入住时间
    var stoptime = options.stoptime;//离店时间
    var roomname = options.RoomName//房间
    var money = options.money//房间费用
    this.setData({
      fjname: roomname,
      kai: starttime,
      jie: stoptime,
      jdid: jdid,
      fjid: fjid,
      money:money,
      moneys: money,
      userid: userid
    })
  },
  // 获取房间数
  num:function(e){
    console.log(e.detail.value)
    if (e.detail.value == "" || e.detail.value == 0){
      wx.showToast({
        title: '房间数不能小于1',
        icon: "none"
      })
    }
    
    var money = parseInt(this.data.moneys) * e.detail.value
    this.setData({
      nums: e.detail.value,
      money: money
    })
    console.log(money)
  },
  // 判断房间数是否为空
  one:function(e){
    if (e.detail.value == "" || e.detail.value == 0){
      this.setData({
        nums: 1
      })
      this.setData({
        money: this.data.moneys
      })
    }
  },
   // 获取姓名
  name: function (e) {
    this.setData({
      names: e.detail.value
    })
  },
   // 获取电话
  phone: function (e) {
    this.setData({
      phones: e.detail.value
    })
  },
  // 是否是手机号
  isMobileNumber:function (str){
    const reg = new RegExp("^1[3|4|5|7|8]\\d{9}$");
    return reg.test(str);
  },
  over:function(){
    var that = this;
    console.log(
      "开始时间" + this.data.kai, "结束时间" + this.data.jie, "openid" + app.data.userid, "房间数" + this.data.nums, "用户名" + this.data.names, "用户号码" + this.data.phones, "酒店id" + this.data.jdid, "房间id" + this.data.fjid
      )

    if (that.data.nums == "" || that.data.nums == 0) {
      console.log(1)
      that.setData({
        nums: 1
      })
    }else if (this.data.names == ""){
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
    } else if (!that.isMobileNumber(this.data.phones)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: "none"
      })
    } else{
      wx.request({
        url: app.data.url + 'api/hotel.ashx?type=syd&jdid=酒店id&fjid=房间id&openid=openid&starttime=入住时间&stoptime=离店时间&fangjian=房间数量&username=姓名&userphone=手机号码',
        data:{
          jdid: that.data.jdid,//酒店id
          fjid: that.data.fjid,//房间id
          openid: that.data.userid,//openid
          starttime: that.data.kai,//入住时间
          stoptime: that.data.jie,//离店时间
          fangjian: that.data.nums,//房间数量
          username: that.data.names,//姓名
          userphone: that.data.phones//手机号码
        },
        success:function(e){
          console.log(e)
          if(e.data == 3){
            wx.showToast({
              title: '预订成功',
              icon: "none"
            })
           
          } else if (e.data == 0){
            wx.showToast({
              title: '时间错误，请重新选择',
              icon: "none"
            })
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },1000)
          }
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