// page/followlist/followlist.js
var app = getApp();
var dalao_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dalao_id: 0,
  },
  follow: function (e) {
    console.log('e', e);

    wx.navigateTo({
      url: '../follow/follow?id=' + e.currentTarget.id,
    })

  },
  initData: function () {
    var that = this;

    wx.request({
      url: 'https://cypcc.cn/miniprogram/getConcernList',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.user_id 
      },
      method: 'GET',
      //responseType: 'text',
      success(res) {
        that.setData({
          followlist: res.data.list    //res.data.list
        })
        that.setData({
          dalao_id: res.data.list.user_id    //res.data.list
        })
      },
      fail() {
        that.initData();
      },
      complete(res) {
        console.log('res: ', res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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