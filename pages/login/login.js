// pages/login/login.js
const app = getApp()

Page({
  data: {
    uname: 'ldd',
    upwd: '123456'
  },
  unameInput: function(e) {
    this.setData({
      uname: e.detail.value
    })
  },
  upwdInput: function(e) {
    this.setData({
      upwd: e.detail.value
    })
  },
  loginTap: function() {
    // var regEmail = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')
    var regEmail = new RegExp('')
    var regPwd = new RegExp('')
    if (!regEmail.exec(this.data.uname)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的用户名',
        showCancel: false
      })
      return false;
    }
    if (!regPwd.exec(this.data.upwd)) {
      wx.showModal({
        title: '提示',
        content: '请输入6-18位密码',
        showCancel: false
      })
      return false;
    }
    wx.request({
      url: app.apiUrl + 'login',
      method: 'POST',
      data: {
        username: this.data.uname,
        password: this.data.upwd
      },
      success: function (res) {
        if (res.data.status == 'success') {
          app.token = res.data.data.token
          app.userInfo = res.data.data.userInfo
          wx.redirectTo({
            url: '../Town/restaurant/restaurant'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.error_message,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '网络异常',
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loginTap()
  }
})