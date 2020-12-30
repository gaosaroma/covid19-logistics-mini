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
      url: app.globalData.base_url + 'user/login',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        telephone: form_username,
        passwd: form_password,
        type: 4
      },
      success: function(e) {
        if (e.data.code == 200) {
          let data = e.data.resultObjects[0];
          console.log(data);
          let user_info = {
            user_id: data.id,
            openid: data.openid,
            identity: data.type,
            work_id: 'SF2017060' + data.id,
            user_name: data.username,
            user_phone: data.telephone,
            station_type: data.station.transportationType,
            station_name: data.station.name,
            station_id: data.station.id
          }
          wx.setStorageSync('userinfo', JSON.stringify(user_info));
          wx.redirectTo({
            url: '../profile/profile',
          })
        } else {
          console.log('login failed!');
        }
      },
      fail: function(e) {
        console.log('wx.request error!');
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