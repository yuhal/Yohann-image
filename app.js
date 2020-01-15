//app.js
import oauth from './apis/oauth/oauth.js'
import qiniuV1 from './apis/v1/qiniu.js'
App({
  onLaunch: function () {
    var that = this,
      timestamp = Date.parse(new Date()) / 1000,
      nonce = Math.floor(Math.random() * 50 + 50),
      expires_time = wx.getStorageSync("expires_time")
    //进行时间比较，过期则重新获取authentication
    if (expires_time <= timestamp) {
      this.oauth.sign(
        that.globalData.appid,
        that.globalData.appsercet,
        that.globalData.mobile,
        timestamp,
        nonce
      ).then(signRes => {
        this.oauth.token(
          that.globalData.appid,
          that.globalData.mobile,
          timestamp,
          nonce,
          signRes.data.info
        ).then(tokenRes => {
          // 存储过期时间
          wx.setStorageSync("expires_time", tokenRes.data.expires_time)
          this.oauth.authorization(
              that.globalData.appid,
              tokenRes.data.client.uid,
              tokenRes.data.access_token
            ).then(authenticationRes => {
              // 存储authentication
              wx.setStorageSync("authentication", authenticationRes.data.authentication)
              that.globalData.checkOauth = true;
              //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.checkOauthReadyCallback) {
                this.checkOauthReadyCallback(authenticationRes);
              }
            }).catch(authenticationRes => {
              console.error(authenticationRes)
            })
        }).catch(tokenRes => {
          console.error(tokenRes)
        })
      }).catch(signRes => {
        console.error(signRes)
      })
    } else {
      that.globalData.checkOauth = true;
    }
  }, 
  globalData: {
    appid: 'wxbb9a70d10651829b',
    appsercet: 'f6c32350257a1fdcb4eccaf33ff22cb4',
    mobile: '15736736889',
    checkOauth: false
  },
  oauth: new oauth(),
  qiniuV1: new qiniuV1()
  
})
