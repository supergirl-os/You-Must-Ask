// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
// 创建页面实例对象
Page({
  name: "profile",
  data: {
    pageswitch: false,
    cprofile: false,
    userInfo: {},
    isShow: true,
    nickname: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this
    wx.removeStorageSync("userInfo")
    // 判断用户是否之前已经授权？
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          // 用户已授权
          this.setData({
            isShow: false,
            pageswitch: true
          })
          //以下方法为获取用户openid
          if (app.globalData.openid == null) {
            wx.login({ //获取用户唯一表示openid
              success: function(res1) {
                if (res1.code) {
                  // 发起网络请求
                  wx.request({
                    method: "POST",
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    url: 'https://www.haprookie.com/UserLogin/openid',
                    data: {
                      code: res1.code,
                    },
                    success: function(res2) {
                      app.globalData.openid = res2.data
                    },
                  })
                } else {
                  console.log('登录失败！' + res1.errMsg)
                }
              }
            })
          }
          wx.request({
            url: 'https://www.haprookie.com/UserLogin/login',
            method: 'post',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data: {
              openid: app.globalData.openid
            },
            success: res => {
              console.log('res: ', res)
              if (res.data.userInfo.openid == null || res.data.userInfo.openid == '') {
                that.onLoad();
              } else {
                this.setData({
                  isShow: false,
                  pageswitch: true,
                  userInfo: res.data.userInfo
                })
                console.log('userInfo: ', this.data.userInfo)
                wx.setStorageSync('userInfo', this.data.userInfo)
                app.globalData.userInfo = this.data.userInfo
                app.globalData.hasUserinfo = true
                app.globalData.user_id = this.data.userInfo.user_id
              }
            },
            fail: res => {
              console.log(res);
              that.onLoad();
            }
          })

        }
      }
    })
  },
  
  




  onShow: function() {
    var info = wx.getStorageSync("userInfo")
    console.log("info", info)
    this.setData({
      userInfo: wx.getStorageSync("userInfo"),
      ['userInfo.nickname']: info.nickname,
      nickname: info.nickname,
      school:info.school,
      major:info.major,
      subject:info.subject,
      identification:info.identification,
      sign:info.sign
    })
    userInfo = wx.getStorageSync("userInfo")
    console.log("nickname: ", this.data.nickname)
  },
  
  handleGetUserInfo: function(e) {

    // const that = this
    // wx.cloud.callFunction({
    //   name: "login",
    //   success:res=>{
    //     console.log("云函数调用成功")
    //     that.setData({
    //       openid:res.result.openid,
    //       userInfo: e.detail.userInfo
          
    //     })
    //     app.globalData.user_id = that.data.openid
    //     that.data.userInfo.openid = that.data.openid
    //     console.log("userInfo",that.data.userInfo)
    //     wx.setStorageSync('userInfo', that.data.userInfo)
    //     console.log(that.data.userInfo.openid)
    //     // userCollection.where({
    //     //   _openid : that.data.userInfo.openid}).get({
    //     //   success: function(res){
    //     //   console.log("已有数据")
    //     //   console.log(res)
    //     //   },
    //       // fail: function(res){
    //         userCollection.add({
    //         data: that.data.userInfo,
    //         })
    //         console.log("添加成功")
    //       //  }
    //     // })   
    //   },
    //   fail:res=>{
    //     console.log("云函数调用失败")
    //   }
    // })









    判断用户是否点击允许https://www.haprookie.com/UserLogin/login
    if (e.detail.rawData) {
      wx.request({
        url: 'https://www.haprookie.com/UserLogin/login',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: {
          nickname: e.detail.userInfo.nickName,
          gender: e.detail.userInfo.gender,
          avatarUrl: e.detail.userInfo.avatarUrl,
          openid: app.globalData.openid
        },
        success: res => {
          console.log('res: ', res)
          this.setData({
            isShow: false,
            pageswitch: true,
            userInfo: res.data.userInfo
          })
          console.log('userInfo: ', this.data.userInfo)
          wx.setStorageSync('userInfo', this.data.userInfo)
          app.globalData.userInfo = this.data.userInfo
          app.globalData.hasUserinfo = true
          app.globalData.user_id = this.data.userInfo.user_id
        },
        fail: res => {
          console.log(res);
        }
      })
    } else {
      console.log("用户点击拒绝，MMP")
    }
  },
  jumpnotify: function() {
    wx.navigateTo({
      url: '../notify/notify',
    })
  },
  checkInfo: function() {
    wx.navigateTo({
      url: '../compile/compile',
    })
  },
  jumpcollection: function() {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  jumpfollowlist: function () {
    wx.navigateTo({
      url: '../followlist/followlist',
    })
  },
  jumpmypost: function () {
    wx.navigateTo({
      url: '../mypost/mypost',
    })
  },
  jumphistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  jumpmyanswer: function () {
    wx.navigateTo({
      url: '../myanswer/myanswer',
    })
  },
})