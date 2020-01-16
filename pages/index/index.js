// 获取app变量
var app = getApp()
// 引入图片预加载组件
const ImgLoader = require('../../img-loader/img-loader.js')
const utils = require('../../utils/util.js')

// 生成一些测试数据
function genImgListData(imgList) {
  for (var index in imgList) {
    imgList[index]['loaded'] = false
    imgList[index]['url'] = 'https://image.yuhal.com/' + imgList[index]['key']
  }
  return imgList
}

Page({
  data: {
    page: 1,
    pages: 0,
    limit: 10,
    marker: '',
    imgList: [],
    authentication: null
  },
  onLoad() {
    let that = this
    //判断onLaunch是否执行完毕
    if (app.globalData.checkOauth == false) {
      app.checkOauthReadyCallback = authenticationRes => {
        wx.setStorageSync("authentication",authenticationRes.data.authentication)
        that.setData({
          authentication: authenticationRes.data.authentication
        })
        // 页面初次加载，请求第一页数据
        that.listFiles(that.data.marker)
      }
    } else {
      that.setData({
        authentication: wx.getStorageSync("authentication")
      })
      // 页面初次加载，请求第一页数据
      that.listFiles(that.data.marker)
    }
  },
  onReachBottom() {
    let that = this
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!that.data.loading && that.data.marker) {
      that.listFiles(that.data.marker)
    }
  },
  onShareAppMessage() {
  },
  // 获取单个七牛仓库的文件列表
  listFiles(marker) {
    let that = this
    if (that.data.authentication) {
      this.loading = true
      app.qiniuV1.listFiles(
        that.data.authentication,
        'yuhal-image',
        'yuhal-image',
        that.data.limit,
        marker,
      ).then(res => {
        that.setData({
          imgList: that.data.imgList.concat(genImgListData(res.data[0].items)),
          marker: res.data[0].marker ? res.data[0].marker : '',
          loading: false
        })
        // 初始化图片预加载组件，并指定统一的加载完成回调
        this.imgLoader = new ImgLoader(this, that.imageOnLoad.bind(this))
        // 同时发起全部图片的加载
        genImgListData(res.data[0].items).forEach(item => {
          this.imgLoader.load(item.url)
        })
      }).catch(res => {

      })
    }
  },
  // 加载完成后的回调
  imageOnLoad(err, data) {
    let that = this
    const imgList = that.data.imgList.map(item => {
      if (item.url == data.src)
        item.loaded = true
      return item
    })
    that.setData({ imgList })
  },
  // 图片放大预览
  previewImage: function (e) {
    let that = this
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: utils.array_column(that.data.imgList, 'url') // 需要预览的图片http链接列表
    })
  }
})
