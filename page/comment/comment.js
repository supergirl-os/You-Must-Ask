// page/comment/comment.js
var app = getApp();
var collectflag;
var dalao_id;
//历史记录
var saveids = function (id) {
  //获取存储数据的数组
  var ids = wx.getStorageSync("qidlist") || []
  //向数组中添加新的元素
  ids.unshift(id)
  //将添加的元素存储到本地
  wx.setStorageSync("qidlist", ids)
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentdata:{

    },
    images: [],
    content: '',
    collectflag: false,
    dalao_id:0,
  },
  follow: function (e) {
    console.log('e', e);

    wx.navigateTo({
      url: '../follow/follow?id=' + e.currentTarget.id,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      //截取id
      var id =options.id;
      console.log('id==>',id);
      this.getcomment(id);

    // var that = this;

    // this.setData({
    //   id: options.id,
    //   comment: false
    // })
    // saveids(options.id);  //历史记录

    // console.log(options.id);
    // wx.request({
    //   url: 'https://www.haprookie.com/UserLogin/getQuestion',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       id: options.id,
    //       user_id: app.globalData.user_id //此处更改为user_id
    //     },
    //     method: 'get',
    //     //responseType: 'text',
    //     success(res) {
    //       console.log(res.data.data)
    //       that.setData({
    //         question: res.data.data
    //       })
    //       that.setData({
    //         dalao_id:res.data.data.create_user
    //       })
    //     },
    //     fail() {
    //       console.log('fail')
    //     },
    //     complete() {
    //       console.log('complete')
    //     }
    //   }),
    //   wx.request({
    //     url: 'https://cypcc.cn/miniprogram/getComment',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: { //type可能会变化
    //       id: options.id,
    //       type: 1,
    //       user_id: app.globalData.user_id //此处更改为user_id
    //     },
    //     method: 'get',
    //     //responseType: 'text',
    //     success(res) {
    //       console.log(res.data)
    //       that.setData({
    //         reply: res.data.list
    //       })
    //     },
    //     fail() {
    //       console.log('fail')
    //     },
    //     complete() {
    //       console.log('complete')
    //     }
    //   })

  },
getcomment:function(id){
  wx.cloud.callFunction({
    name:'getcomment',
    data:{
      id:id
    },
    success:res=>{
         
      console.log('res>',this.data.commentdata);
      //处理文本回车
      // var desc =res.result.data[0].desc;
      // res.result.data[0]=desc.split(/\n/);

      this.setData({
        commentdata:res.result.data[0]
      })
    },
    fail: err=>{
      
      console.log('出错了！',err);
    }

  })
},

  


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  comment: function() {
    var comm = !this.data.comment;
    this.setData({
      comment: comm
    })
  },
  contentChange: function(e) {
    this.setData({
      content: e.detail.value
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

  formSubmit: function(e) {
    var that = this
    console.log(e.detail.value)
    if (app.globalData.user_id != 0) {
      wx.request({
        url: 'https://www.haprookie.com/UserLogin/reply',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          content: that.data.content,
          user_id: app.globalData.user_id,
          question_id: that.data.id,
          image_path: that.data.images,
          type: 1
        },
        method: 'GET',
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
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  },
  //收藏题目，发送用户id,题目id,和是否收藏标志
  collect: function() {
    //状态位
    if (app.globalData.user_id != 0) {
      this.setData({
        collectflag: !collectflag
      })
      wx.request({
        url: 'https://www.haprookie.com/UserLogin/collection',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          question_id: this.data.id, //问题或文章id
          user_id: app.globalData.user_id, //用户id
          collectflag: this.data.collectflag, //标志位
          type: 0
        },
        method: 'GET',
        //responseType: 'text',
        success(res) {
          console.log('执行 成功', res.data);
        },
        fail() {
          console.log('fail')
        },
        complete() {
          console.log('complete')
        }
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'none'
      })
    }
  }


})