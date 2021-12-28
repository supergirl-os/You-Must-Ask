var coolsite360 = require('./coolsite/index.js');
var plugin = requirePlugin("chatbot");
const promisify = require('./promisify.js');
const Prequest = promisify(wx.request);
const Plogin = promisify(wx.login);
const PgetUserInfo = promisify(wx.getUserInfo);
//App({
//coolsite360: coolsite360
//})
//app.js
App({
  onLaunch: function () {
   if(!wx.cloud){
     console.error('请使用高版本')
   }
   else{ wx.cloud.init({
        traceUser:true,
      });
    }
    //调用API从本地缓存中获取数据

    plugin.init({
      appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
      openid: "oB6jg6ENstneouhXefbujwJl7v2n", // 小程序的openid
      success: () => { },
      fail: error => { },
      guideList: ["使用帮助", "让我们开始猎马吧"],
      textToSpeech: true, //默认为ture打开状态
      background: "url('../../resources/background1.png')",
      guideCardHeight: 40,
      operateCardHeight: 80,
      history: true,
      historySize: 60,
      navHeight: 0,
      robotHeader:
        "https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/leftHeader.png",
      userHeader:
        "https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png",
      userName: ""
    });

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var currentTimeIn = Date.now();
    console.log(currentTimeIn)


    var _this = this;
    Plogin().then(res => {//获取用户的openid
      Prequest({//发起网络请求，获取openid
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: 'https://cypcc.cn/miniprogram/openid',
        data: {
          code: res.code,
        },
      }).then(res => {
        _this.globalData.openid = res.data
      })
    })
  },
  globalData: {
    userInfo: null,
    hasUserinfo: null,
    openid: null,
    valuecoin: null,
    user_id: 0,
    currentTab: 0,
  },
  coolsite360: coolsite360
})