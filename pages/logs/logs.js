var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data);
      }
    })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
