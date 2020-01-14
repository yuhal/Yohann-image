//app.js
import qiniuV1 from './apis/v1/qiniu.js'
App({
  globalData: {
    appid: 'wxbb9a70d10651829b',
    appsercet: 'f6c32350257a1fdcb4eccaf33ff22cb4',
    mobile: '15736736889',
    domain: 'https://api.yuhal.com',
    tokenInfo: null,
    authentication: null,
  },
  onLaunch: function () {
    var that = this,
      timestamp = Date.parse(new Date()) / 1000,
      nonce = Math.floor(Math.random() * 50 + 50),
      expires_time = wx.getStorageSync("expires_time")
    //进行时间比较，过期则重新获取authentication
    console.log(expires_time)
    if (1) {
      wx.request({
        // 获取签名
        url: that.globalData.domain + '/oauth/sign/index',
        data: {
          appid: that.globalData.appid,
          appsercet: that.globalData.appsercet,
          mobile: that.globalData.mobile,
          timestamp: timestamp,
          nonce: nonce
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          wx.request({
            // 获取token
            url: that.globalData.domain + '/oauth/token/token', //仅为示例，并非真实的接口地址
            data: {
              appid: that.globalData.appid,
              mobile: that.globalData.mobile,
              timestamp: timestamp,
              nonce: nonce,
              sign: res.data.data.info,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success(res) {
              console.log(res.data)
              that.globalData.tokenInfo = res.data.data
              // 存储过期时间
              wx.setStorageSync("expires_time", res.data.data.expires_time);
              // 获取authorization
              wx.request({
                // 获取token
                url: that.globalData.domain + '/oauth/authentication/index', //仅为示例，并非真实的接口地址
                data: {
                  appid: that.globalData.appid,
                  uid: that.globalData.tokenInfo.client.uid,
                  accesstoken: that.globalData.tokenInfo.access_token,
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res.data)
                  that.globalData.authentication = res.data.data.info
                  // 存储authentication
                  wx.setStorageSync("authentication", res.data.data.authentication);
                }
              })
            }
          })
        }
      })
    } else {
      that.globalData.authentication = wx.getStorageSync("authentication")
    }
  }, 
  qiniuV1: new qiniuV1()
  
})
