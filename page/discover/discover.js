// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
var pageswitch; 
var count = 0;
var countf=0;
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "discover",
  /**
   * 页面的初始数据
   */

  data: {
    "content": "", // 文本的内容
    "title": "", // 文本的标题
    "placeholder": "在这里输入~",
    "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度
    "focus": true,
    "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面
    pageswitch: false,
    add: false,
    images: [],


  },
  initData: function() {
    var that = this;
    this.setData({
      pageswitch: false
    })
    console.log(app.globalData.user_id);
    wx.request({
      url: 'https://www.haprookie.com/UserLogin/getArticleList',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: app.globalData.user_id,
        page: 1,
      },
      method: 'GET',
      //responseType: 'text',
      success(res) {
        if (res.data.err_code == '102' && count < 5) {
          that.initData();
          count++;
        } else {
          that.setData({
            datas: res.data.list
          })
        } 
        console.log('res: ', res)
      },
      fail() {
        that.initData();
      },
      complete(res) {
        console.log('res: ', res)
      }
    })
  },

  //初始化推荐的人
  // initFollow: function () {
  //   var that = this;
  //   wx.request({
  //     url: '',       //需要一个库
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: {
  //       user_id: app.globalData.user_id,
  //     },
  //     method: 'GET',
  //     //responseType: 'text',
  //     success(res) {
  //       if (res.data.err_code == '101' && countf < 5) {
  //         that.initFollow();
  //         countf++;
  //       } else {
  //         that.setData({
  //           goodfellows: res.data.list
  //         })
  //       }
  //       console.log('res: ', res)
  //     },
  //     fail() {
  //       that.initData();
  //     },
  //     complete(res) {
  //       console.log('res: ', res)
  //     }
  //   })
  // },
  

  postarticle: function() {
    this.setData({
      pageswitch: true
    })
    console.log('complete')
  },
  onSubmit: function() {
    var that = this;
    if (app.globalData.user_id != 0) {
      let pro = new Promise((resolve, reject) => {
        wx.request({
          url: 'https://www.haprookie.com/UserLogin/uploadArticle', //https://cypcc.cn/miniprogram/getQuestions
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            content: this.data.content,
            image_path: this.data.images,
            title: this.data.title,
            source: this.data.source,
            writer: app.globalData.user_id
          },
          method: 'GET',
          //responseType: 'text',
          success(res) {
            console.log('发布：', res);
          },
          fail() {
            console.log('fail')
          },
          complete() {
            console.log('complete')
          }
        })
      }).then(res => {
        this.setData({
          pageswitch: false
        })
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  contentinput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  titleinput: function(e) {
    this.setData({
      title: e.detail.value
    })
  },

  Back: function() {
    this.setData({
      pageswitch: false
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          images: images
        })
      }
    })
  },
  removeImage(e) {
    var images = this.data.images;
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.setData({
      images: images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  articom: function(e) {
    console.log(e.currentTarget.id);

    wx.navigateTo({
      url: '../articom/articom?id=' + e.currentTarget.id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    this.initData();
    // this.initFollow();  //初始化推荐的人
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件

})