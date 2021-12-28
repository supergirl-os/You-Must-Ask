// page/compile/compile.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders: ['男', '女', '保密'],
    identifications: ['本科', '研究生', '博士', '校友'],
    userInfo: {},
    subjects:['哲 学','经济学','法 学','教育学','文 学','历史学','理 学','工 学','农 学','医 学','军事学','管理学','艺术学']
  },
  GetUsername: function(e) {
    var str = "userInfo.nickname"
    this.setData({
      [str]: e.detail.value
    })

  },

  Getschool: function(e) {
    var str = "userInfo.school"
    this.setData({
      [str]: e.detail.value
    })
  },


  Getmajor: function(e) {
    var str = "userInfo.major"
    this.setData({
      [str]: e.detail.value
    })
  },


  Getsign: function(e) {
    var str = "userInfo.sign"
    this.setData({
      [str]: e.detail.value
    })
  },

  RadioChange: function(e) {
    var str = "userInfo.gender"
    this.setData({
      [str]: (e.detail.value == "男" ? 0 : (e.detail.value == '女' ? 1 : 2))
    })
  },

  Subselect: function(e) {
    var str = "userInfo.subject"
    this.setData({
      [str]: e.detail.value
    })
  },

  RadioChange1: function(e) {
    var str = "userInfo.identification"
    this.setData({
      [str]: e.detail.value
    })
  },

  Goaffirm: function() {
    var that = this
    var info = wx.getStorageSync("userInfo")
    //这里是判断用户是否修改过信息
    if (JSON.stringify(this.data.userInfo) == JSON.stringify(info) || (this.data.userInfo == info)) {
      // wx.navigateBack({
      //   url: '../profile/profile'
      // }) //页面跳转
    } else {
      //获取用户意图修改的信息
      var myinfo = this.data.userInfo
      console.log('测试：', (myinfo.nickname.trim()).length == 0)
      //如果信息不完整，不允许提交 || (myinfo.major.trim()).length == 0
      if ((myinfo.nickname.trim()).length == 0 || (myinfo.school.trim()).length == 0) {
        wx.showToast({
          title: '信息填完整',
          icon: 'none'
        })

      } else if (myinfo.sign.length > 10) {
        wx.showToast({
          title: '签名不能超过10个字',
          icon: 'none'
        })

      } else {
        //信息完整，允许提交
        wx.setStorageSync('userInfo', this.data.userInfo)
        wx.showToast({
          title: '填写完成',
          duration:20000
        }) 
        wx.navigateBack({
          url: '../profile/profile'
        }) 



        // wx.request({ //向服务器发送修改后的数据
        //   url: 'https://www.haprookie.com/UserLogin/update', //这里链接不太确定
        //   method: 'post',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        //   },
        //   data: {
        //     nickname: myinfo.nickname,
        //     school: myinfo.school,
        //     gender: myinfo.gender,
        //     identification: myinfo.identification,
        //     sign: myinfo.sign,
        //     openid: app.globalData.openid
        //   },
        //   success: function(res) {
        //     console.log("res: ", res)
        //     that.setData({
        //       userInfo: res.data.userInfo,
        //       ['userInfo.nickname']: res.data.userInfo.nickname
        //     })
        //     console.log("userInfo：", that.data.userInfo)
        //     wx.setStorageSync("userInfo", that.data.userInfo)
            wx.navigateBack({
              url: '../profile/profile'
            }) //页面跳转
          

      }
    }
    // this.onLoad()   
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var info = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: info,
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})