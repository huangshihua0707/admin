const restApi = require("./api/restApi")
App({
  /***
   * 程序入口
   */
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    restApi.request(url,{}).then()
    this.wxApi(wx.login,{}).then((res) =>{
      console.log("code返回：", res)
      return this.wxApi(wx.request, {
        url: "https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code",
        data: { appid: "wxf1924163c14dce2e", secret: "7668bb033e4067cdf3d1562044c75dc6", js_code: res.code, grant_type: "authorization_code" }
      });
    }).then((res) => {
      console.log("授权返回：", res)
      return Promise.resolve({dsdaads})
    }).then(() => {
      return this.wxApi(wx.getUserInfo, { withCredentials: true });
    }).then((res) => {
      console.log("获取返回：", res)
    }).catch((e) => {
      console.log("出错返回：", e)
    })

  },
  /***
   * 获取用户信息
   */
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  /***
   * 调用微信接口的简单方式
   */
  wxApi: function (fn, obj) {
    obj = obj || {};
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  },
  restApi: restApi,
  config: {
    apiURL: "http://www.myhopin.com"
  }
})