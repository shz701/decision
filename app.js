//app.js
var util=require("./utils/util.js")
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    util.login(function(res){
      if (res.data.state === 0) {
        wx.setStorageSync("user", res.data.obj)
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        console.log('登录成功！' + JSON.stringify(res.data.obj))
      }
      else {
        wx.showToast({
          title: '登录失败' + res.data,
          icon: 'success',
          duration: 2000
        })
        console.log('登录失败！' + JSON.stringify(res.data.msg))
      }
    })
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})
