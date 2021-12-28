// page/follow/follow.js
var app = getApp();
var dalao_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
       
  },

  
  
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {        //关注的人的页面，不是关注的人的列表
    var that = this;
    console.log(options.id);
    this.setData({
      dalao_id: options.id,
    })
    console.log(options);
    wx.request({
      url: 'https://cypcc.cn/miniprogram/getUser',                        //需要一个调出指定dalao_id对应的人的库，而不是自己已经关注的库
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        dalao_id: options.id,
        //user_id: app.globalData.user_id //此处更改为user_id
      },
      method: 'get',
      //responseType: 'text',
      success(res) {
        console.log(res.data.list)
        that.setData({
          follows: res.data.data
        })
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
      }
    })
  },

  follow:function(){
    wx.request({
      url: 'https://cypcc.cn/miniprogram/concern',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.user_id,
        dalao_id:dalao_id,
      },
      method: 'post',
      //responseType: 'text',
      success() {
        console.log('success')
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
      }
    })
  },
  cancelfollow: function () {
    wx.request({
      url: 'https://cypcc.cn/miniprogram/cancelConcern',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.user_id, 
        dalao_id: dalao_id,
      },
      method: 'post',
      //responseType: 'text',
      success() {
        console.log('success')
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
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