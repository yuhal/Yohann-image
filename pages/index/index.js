Page({
  data: {
    items: [
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg',
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg',
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16cd753d558.jpg', 
      'https://image.yuhal.com/yuhal-image-5e16c5e0e1787.jpg', 
    ],
    winHeight: 0,
    winWidth: 0,
  },
  previewImage: function (e) {
    console.log(e)
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.items // 需要预览的图片http链接列表
    })
    console.log("此处进行放大预览！");
  },
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
function randomChar() {
  var l = Math.random() * 10;
  var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  var tmp = "";
  var timestamp = new Date().getTime();
  for (var i = 0; i < l; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return timestamp + tmp;
}