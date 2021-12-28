// page/articom/articom.js
var app = getApp();
var dalao_id;
var saveids = function (id) {
  //获取存储数据的数组
  var ids = wx.getStorageSync("aidlist") || []
  //向数组中添加新的元素
  ids.unshift(id)
  //将添加的元素存储到本地
  wx.setStorageSync("aidlist", ids)
}
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    dalao_id: 0,
  },
  follow: function (e) {
    console.log('e', e);

    wx.navigateTo({
      url: '../follow/follow?id=' + e.currentTarget.id,
    })

  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    wx.request({
      url: 'https://www.haprookie.com/UserLogin/review',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        content: this.data.content,
        reviewer: app.globalData.user_id,
        article_id: this.data.id,
        type:1,
      },
      method: 'get',
      //responseType: 'text',
      success(res) {
        console.log(res.data);
        that.data.comment = !that.data.comment;
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
      }
    })

  },
  comment: function () {
    var comm = this.data.comment;
    this.setData({
      comment: comm
    })
  },
  commentInput: function (e) {
    console.log("评论：", e)
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('options: ', options)

    this.setData({
      id: options.id,
      comment: false
    })
    saveids(options.id);  //历史记录
    console.log(options.id);
    wx.request({
      url: 'https://www.haprookie.com/UserLogin/getArticle',  //localhost
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: {
        user_id: app.globalData.user_id,
        id: options.id
      },
      method: 'get',
      //responseType: 'text',
      success(res) {
        console.log(res.data.data)
        that.setData({
          article: res.data.data
        })
        that.setData({
          dalao_id: res.data.data.writer
        })
      },
      fail() {
        console.log('fail')
      },
      complete() {
        console.log('complete')
      }
    }),
      wx.request({
      url: 'https://www.haprookie.com/UserLogin/getReviews',   //localhost
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: {
          id: options.id,
          type:1
        },
        method: 'get',
        //responseType: 'text',
        success(res) {
          console.log(options.id)
          console.log(res.data)
          that.setData({
            reply: res.data.list
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