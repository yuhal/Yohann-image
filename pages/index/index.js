// 获取app变量
var app = getApp()
// 引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')
// 获取图片列表
function listImage() {
  var imageList = []
  wx.request({
    url: app.globalData.domain + '/v1/listFiles', //仅为示例，并非真实的接口地址
    data: {
      authentication: app.globalData.authentication,
      bucket: 'yuhal-image',
      prefix: 'yuhal-image'
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      imageList = res.data.data[0].items
    },
  })
  return imageList
}

// 生成一些测试数据
function genImgListData(previewImgList) {
  for (var index in previewImgList) {
    
    // var age = "array[" + index + "].age";
    // this.setData({
    //   [loaded]: false
    // })
  }
}

Page({
  data: {
    imgList: [],
    previewImgList: listImage()
  },
  onLoad() {
    console.log(this.data.previewImgList)
    this.data.imgList = genImgListData(this.data.previewImgList)
    console.log(this.data.imgList)
    // 初始化图片预加载组件，并指定统一的加载完成回调
    this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
    // 同时发起全部图片的加载
    this.data.imgList.forEach(item => {
      this.imgLoader.load(item.url)
    })
  },
  // 加载完成后的回调
  imageOnLoad(err, data) {
    console.log('图片加载完成', err, data.src)
    const imgList = this.data.imgList.map(item => {
      if (item.url == data.src)
        item.loaded = true
      return item
    })
    this.setData({ imgList })
  },
  // 图片放大预览
  previewImage: function (e) {
    console.log(e)
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.previewImgList // 需要预览的图片http链接列表
    })
    console.log("此处进行放大预览");
  }
})
