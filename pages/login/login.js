// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form_username: '',
    form_password: ''
  },

  bindRegisterTap: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  bindUsernameInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      form_username: input_context
    })
  },

  bindPasswordInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      form_password:input_context
    })
  },

  bindLoginTap: function(e) {
    var form_username = this.data.form_username;
    var form_password = this.data.form_password;
    wx.request({
      url: app.globalData.base_url + '',
      method: 'GET',
      data: {
        username: form_username,
        password: form_password
      },
      success: function(e) {
        let user_info = {
          user_id: e.data.user_id,
          openid: e.data.openid,
          identity: e.data.identity,
          work_id: e.data.work_id
        }
        wx.setStorageSync('userinfo', JSON.stringify(user_info))
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})