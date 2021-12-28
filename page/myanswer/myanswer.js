// page/history/history.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['问题', '文章'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const aidlist = wx.getStorageSync("aidlist");
    const qidlist = wx.getStorageSync("qidlist");
    this.setData({
      aidlist: aidlist,
      alength:aidlist.length,
      qidlist: qidlist,
      qlength: qidlist.length
    });

    console.log(aidlist)
    var that = this;
    wx.request({
      url: 'https://www.haprookie.com/UserLogin/getArticle',  //localhost
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        user_id: app.globalData.user_id,
        id: aidlist[0]
      },
      method: 'get',
      //responseType: 'text',
      success(res) {
        console.log(res.data.data)
        that.setData({
          article:res.data.data
        })
        
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
      }
    })
    wx.request({
      url: 'https://www.haprookie.com/UserLogin/getQuestion',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: qidlist[0],
        user_id: app.globalData.user_id //此处更改为user_id
      },
      method: 'get',
      //responseType: 'text',
      success(res) {
        console.log(res.data.data)
        that.setData({
          question: res.data.data
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