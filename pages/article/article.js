//index.js
//获取应用实例
var app = getApp()
var sessionid;
Page({
  data: {
    loading: false,
    curpage: 0,
    selData:[],
    List: [
    ],
    buttons:{
      loading: false,
      text: "登录接口"
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  	//调用应用实例的方法获取全局数据
   
  },
  onShow:function(){
    var user =wx.getStorageSync("user")
    sessionid = user.sessionid
    this.getUserChannel();
  },
  getUserChannel: function(){
    var that = this
    wx.request({
      url: 'https://spapi.hzfanews.com/api/UserChannel',
      header: { "sessionid": sessionid },
      method: "GET",
      success(res) {
        console.log(res.data);
        if (res.data.state == 0 && res.data.obj.length > 0) {
          that.setData({
            selData:res.data.obj
          })
          that.getArticle(res.data.obj[0].id);
        }
        else if(res.data.state==1)
        {
          wx.showToast({
            title: '请先登录',
            icon:"loading",
            duration:1500,
            success:function(){
              wx.switchTab({
                url: '../index/index'
              })
            }
          })
        }
      }
    })
  },
  getArticle:function (id){
    var that = this
    that.setData({
      loading: false
    })
    
    wx.request({
      url: 'https://spapi.hzfanews.com/api/Article?id=' + id,
      header: { "sessionid": sessionid },
      method: "GET",
      success(res) {
        console.log(res.data);
        if (res.data.state==0){
          that.setData({
            List:res.data.obj.list,
            loading: true
          })
        }
      }
    })
  },
  listClick:function(e){
    console.log(e)
    this.getArticle(e.currentTarget.dataset.idx)
    this.setData({
      curpage:e.target.id
    })
  }
})
