// 引入coolsite360交互配置设定
require('coolsite.config.js');
const db = wx.cloud.database()
// 获取全局应用程序实例对象
var app = getApp();
var pageswitch;
var add;
var valuecoin
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "feature",
  /**
   * 页面的初始数据
   */

  data: {
    "content": "", // 文本的内容
    "placeholder": "请详细描述你的问题，越详细解答率越高哦~",
    "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度
    "focus": true,
    "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面
    pageswitch: false,
    valuecoin: 0,
    add: false,
    images: [],
    key:'is_hot',
    value:1,
    //商品数据
    productData:{

    }
  },

  initData: function() {
    var that = this;
    this.setData({
      pageswitch: false
    })
    //调用云函数
    wx.showLoading({
      title:'加载中...',
    })
    wx.cloud.callFunction({
      name:'getNewlyQues',
      data:{
        key:this.data.key,
        value:this.data.value,
      },
      success:res=>{
        wx.hideLoading();
        console.log('res>',res);
        this.setData({
          productData:res.result.data,
        })
      },
      fail: err=>{
        wx.hideLoading();
        console.log('出错了！',err);
      }
    })
    //console.log(app.globalData.user_id);
   // wx.request({
     // url: 'https://www.haprookie.com/UserLogin/getNewlyQues',
     // headers: {
    //    'Content-Type': 'application/json'
    //  },
    //  data: {
    //    user_id: app.globalData.user_id,
     //   page: 1
    //  },
    //  method: 'GET',
      //responseType: 'text',
     // success(res) {
     //   that.setData({
     //     datas: res.data.list
      //  })
     // },
     // fail() {
      //  that.initData();
     // },
     // complete(res) {
     //   console.log('res: ', res)
     // }
   // })
  },

  onPullDownRefresh: function() {

    wx.showLoading({
      title: '正在刷新',
    })
    this.initData();
    console.log('refreshing')
  },

  Compilepost: function() {
    this.setData({
      pageswitch: true
    })
    console.log('complete')
  },


  onSubmit: function() {
    var that = this;
    if (app.globalData.user_id != 0) {
      if (that.data.valuecoin >= 5) {

        wx.showLoading({
          title:'加载中...'
        })


        wx.cloud.callFunction({
          name:'addNewlyQues',
          data: {
            key:this.data.key,
            value:this.data.value,
          },
          success:res =>{
            console.log('res==>',res);
            wx.hideLoading();
          },
          fail:err=>{
            console.log('出错了！',err);
            wx.hideLoading();
          }
        })





        // let pro = new Promise((resolve, reject) => {
        //   wx.request({
        //     url: 'https://www.haprookie.com/UserLogin/uploadQues', //https://cypcc.cn/miniprogram/getQuestions
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     data: {
        //       content: that.data.content,
        //       image_path: that.data.images,
        //       valuecoin: that.data.valuecoin,
        //       user_id: app.globalData.user_id
        //     },
        //     method: 'GET',
            //responseType: 'text',
        //     success(res) {
        //       console.log('发布：', res);
        //     },
        //     fail() {
        //       console.log('fail')
        //     },
        //     complete() {
        //       console.log('complete')
        //     }
        //   })
        // }).then(res => {
        //   this.setData({
        //     pageswitch: false
        //   })
        // })
      } else {
        wx.showToast({
          title: '悬赏金额至少5金币',
          icon: 'none'
        })
      }
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

  /* 点击减号 */
  bindMinus: function() {
    var num = this.data.valuecoin;
    // 如果大于5时，才可以减  
    if (num > 0) {
      num -= 5;
    }
    // 将数值写回  
    this.setData({
      valuecoin: num,
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    var num = this.data.valuecoin;
    // 不作过多考虑自增5
    if (num <= 15) {
      num += 5;
    }
    // 将数值与状态写回  
    this.setData({
      valuecoin: num,
    });
  },

  Back: function() {
    this.setData({
      pageswitch: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 注册coolsite360交互模块
   
    this.initData();

    app.coolsite360.register(this);
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
  tap_d9c62767: function(e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_de01fdb6: function(e) {
    //触发coolsite360交互事件
    app.coolsite360.fireEvent(e, this);
  },
  comment: function(e) {
    var id=e.currentTarget.dataset.id;
    // console.log('e', e);

    wx.navigateTo({
      url: '../comment/comment?id=' + id,
    })

  }

})