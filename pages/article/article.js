var util = require("../../utils/util.js")
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    scrollTop:0,
    list_height:700,
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
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          list_height: res.windowHeight - 78*res.screenWidth/750
        })
        
      },
    })
  },
  onShow:function(){
    this.getUserChannel();
  },
  scrollup:function(e) {
    var self = this;
    var id = self.data.curpage
    self.getArticle(id, self.data.List.length);
  },
  getUserChannel: function(){
    var that = this
    util.UserChannel(null,function(res){
      if (res.data.state == 0 && res.data.obj.length > 0) {
        that.setData({
          selData: res.data.obj
        })
        that.getArticle(0);
      }
    })
  },
  getArticle:function (id,start){
    var that = this
    that.setData({
      loading: false
    })
    if(start==undefined) 
      start=0
    util.Article({"id":id , "start":start},function(res){
      if (res.data.state == 0) {
        var list = res.data.obj.list
        if (start > 0) {
          list = that.data.List.concat(list)
        }
        that.setData({
          List: list,
          loading: true
        })
      }
    })
  },
  listClick:function(e){
    this.getArticle(e.currentTarget.id)
    this.setData({
      curpage:e.target.id
    })
    this.setData({
      scrollTop:0
    })
  },
  navigate:function(e){
    wx.navigateTo({
      url: '../articleinfo/articleinfo?id='+e.currentTarget.dataset.idx,
    })
  }
})
