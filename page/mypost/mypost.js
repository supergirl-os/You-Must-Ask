// page/mypost/mypost.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['问题', '文章'],
    currentTab: 0,
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },

  initData: function () {
    var that = this;
    wx.request({
      url: 'https://cypcc.cn/miniprogram/getMyPostList',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.user_id,
      },
      method: 'GET',
      //responseType: 'text',
      success(res) {
        that.setData({
          mypostlist: res.data.list
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
    this.setData({
      currentTab: app.globalData.currentTab
    })
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