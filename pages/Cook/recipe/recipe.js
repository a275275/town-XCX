// pages/Cook/recipe.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: null,
    recipe: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recipe(this, 1)
  },

  /**
   * 获取用户食谱
   */
  recipe: function (that, page) {
    wx.request({
      url: app.apiUrl + 'recipe',
      data: {
        token: app.token,
        page: page
      },
      success: function (res) {
        if (res.data.data.data) {
          that.setData({
            page: res.data.data,
            recipe: res.data.data.data
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
   * 翻页
   */
  pageTap: function (e) {
    this.recipe(this, e.currentTarget.dataset.page)
  }
})