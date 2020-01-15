/**
 * name: oauth.js
 * description: oauth授权
 */
import request from '../request.js'
class oauth {
  constructor() {
    this._baseUrl = 'https://api.yuhal.com/oauth/'
    this._defaultHeader = { 'Content-Type': 'application/json' }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    this.authentication = wx.getStorageSync("authentication")
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

  /**
   * 获取签名
   */
  sign(appid, appsercet, mobile, timestamp, nonce) {
    let data = {
      appid: appid,
      appsercet: appsercet,
      mobile: mobile,
      timestamp: timestamp,
      nonce: nonce
    }
    return this._request.getRequest(this._baseUrl + 'sign/index', data).then(res => res.data)
  }

  /**
   * 获取token
   */
  token(appid, mobile, timestamp, nonce, sign) {
    let data = {
      appid: appid,
      mobile: mobile,
      timestamp: timestamp,
      nonce: nonce,
      sign: sign
    }
    return this._request.postRequest(this._baseUrl + 'token/token', data).then(res => res.data)
  }

  /**
   * 获取authorization
   */
  authorization(appid, uid, accesstoken) {
    let data = {
      appid: appid,
      uid: uid,
      accesstoken: accesstoken
    }
    return this._request.getRequest(this._baseUrl + 'authentication/index', data).then(res => res.data)
  }

}
export default oauth