var util = require("../../utils/util.js")
var WxParse = require('../../wxParse/wxParse.js');

var app = getApp()
Page({
  data:{
    article:{}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    util.articleinfo(this.options.id,function(res){
      // that.setData({
      //   article: res.data.obj
      // })
      WxParse.wxParse('article', 'html', res.data.obj.contenttxt, that, 5) 
    })
  }
})