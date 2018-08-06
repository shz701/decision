//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {
      nickName:"授权登录"
      },
    user:{},
    buttons:{
      loading: false,
      text: "登录接口"
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据

  },
  bindGetUserInfo: function (e) {
      //更新数据
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.update()
  },
  bindAuthLogin:function(e){
    console.log('登录')
    var that = this;
    wx.login({
      timeout:30000,
      success: function (res) {
        console.log('登录失败！' + res.errMsg)
        if (res.code) {
          console.log('获取code成功！' + res.code)
          var url ='https://spapi.hzfanews.com/api/Login';
          wx.request({
            url: url,
            method:"POST",
            data:{
              code:res.code
            },
            success:function(res){
              if(res.data.state===0)
              {
                wx.setStorage({
                  key: "user",
                  data: res.data.obj
                })
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
                console.log('登录成功！' +JSON.stringify(res.data.obj))
              }
              else
              {
                wx.showToast({
                  title: '登录失败'+res.data,
                  icon: 'success',
                  duration: 2000
                })
                console.log('登录失败！' +JSON.stringify(res.data.msg))
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail(res){
        console.log('登录失败！' + res.errMsg)
      }
    })
  },
  bindLogin:function(e)
  {
    wx.login({
      
      success:function(res){
        console.log(res.code) 
      }
    })
  }
})
