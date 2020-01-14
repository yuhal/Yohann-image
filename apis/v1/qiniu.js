/**
 * name: agriknow.js
 * description: 七牛云提供的服务
 */
import request from '../request.js'
class qiniu {
  constructor() {
    this._baseUrl = 'https://api.yuhal.com/v1/'
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
   * 获取单个七牛仓库的文件列表
   */
  listFiles(bucket, prefix, limit, marker) {
    let data = { 
      authentication: this.authentication, 
      bucket: bucket, 
      prefix: prefix,
      limit: limit,
      marker: marker
    }
    return this._request.getRequest(this._baseUrl + 'listFiles', data).then(res => res.data)
  }
}
export default qiniu