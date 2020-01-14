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
    limit: 6,
    marker: '',
    loading: false,
    imgList: []
  },
  onLoad() {
    // 页面初次加载，请求第一页数据
    this.listFiles(this.data.marker);
  },
  onReachBottom() {
    console.log(this.data.marker)
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    if (!this.data.loading && this.data.marker) {
      this.listFiles(this.data.marker)
    }
  },
  // 获取单个七牛仓库的文件列表
  listFiles(marker) {
    this.loading = true
    app.qiniuV1.listFiles(
        'yuhal-image', 
        'yuhal-image',
        this.data.limit,
        marker,
      ).then(res => {
        this.setData({
          imgList: this.data.imgList.concat(res.data[0].items),
          marker: res.data[0].marker,
          loading: false
        })
        // 初始化图片预加载组件，并指定统一的加载完成回调
        this.imgLoader = new ImgLoader(this, this.imageOnLoad.bind(this))
        // 同时发起全部图片的加载
        genImgListData(res.data[0].items).forEach(item => {
          this.imgLoader.load(item.url)
        })
      })
      .catch(res => {
        
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
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: utils.array_column(this.data.imgList, 'url') // 需要预览的图片http链接列表
    })
  }
})
