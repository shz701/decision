var _config = {
  serverUrl: "https://spapi.hzfanews.com/"
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function login(obj) {
  var self = this 
  wx.login({
    success:function(res){
      if (res.code) {
        requestApi('login', 'POST', {code:res.code}, function(res){
          if(res.data.state==0){
            wx.setStorageSync("user",res.data.obj)
            requestApi(obj.action,obj.method,obj.PostData,obj.callback)
          }
        })
      }
      else
        console.log(res.errMsg);
    }
  })
}

function UserChannel(paraData, callback) {
  requestApi('UserChannel', 'GET', paraData, callback)
}

function Article(paraData, callback) {
  requestApi('Article', 'GET', paraData, callback)
}
//调用API 统一方法
function requestApi(action, method, PostData, callback) {
  var user = wx.getStorageSync("user")
  var header = { sessionid :user.sessionid}
  var self = this
  var obj = {action:action,method:method,PostData:PostData,callback:callback}
  wx.request({
    url: _config.serverUrl + 'api/' + action,
    data: PostData,
    header: header,
    method: method,
    success: function(res) {
      if(res.data.state==1){
        login(obj)
      }
      typeof callback == "function" && callback(res)
    },
    fail: function(res) {
      typeof callback == "function" && callback(res)
      wx.showToast({
        title: '请求失败',
        icon: 'success',
        image: '',
        duration: 2000
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  login: login,
  UserChannel: UserChannel,
  Article: Article
}