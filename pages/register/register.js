// pages/register/register.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    region: ['广东省', '广州市', '海珠区'],
    index: 0,
    picker: ['普通用户', '供应商'],
    registering: false,
    form_name: '',
    form_phone: '',
  },

  bindNameInput: function(e) {
    input_context = e.detail.value;
    this.setData({
      form_name: input_context
    })
  },

  bindPhoneInput: function(e) {
    input_context = e.detail.value;
    this.setData({
      form_phone: input_context
    })
  },

  bindRegisterTap: function(e) {
    this.setData({
      registering: true
    })
    var modal_name = e.currentTarget.dataset.target;
    var self = this;
    var form_name = this.data.form_name;
    var form_phone = this.data.form_phone;
    var form_region = this.data.region;
    var form_index = this.data.index;
    wx.login({
      success: function(res) {
        var code = res.code;
        wx.request({
          url: app.globalData.base_url + '',
          method: 'POST',
          data: {
            code: code,
            name: form_name,
            phone_number: form_phone,
            address: {
              province: form_region[0],
              city: form_region[1],
              district: form_region[2]
            },
            identity: form_index,
          },
          success: function(e) {
            if(e.data.success) {
              setTimeout(function(){
                self.setData({
                  modalName: modal_name,
                  registering: false,
                })
              }, 500)
            }
          },
          fail: function(e) {
            console.log("wx.request error!");
            self.setData({
              modalName: null,
              registering: false,
            })
          }
        })
      },
      fail: function(e) {
        console.log("wx.login error!");
      }
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
  },
  bindLoginTap: function(e) {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: app.globalData.base_url,
      method: 'GET',
      success: function(e) {
        var identity_list = e.data.identity_list;
        self.setData({
          picker: identity_list
        })
      },
      fail: function(e) {
        console.log('wx.request error!')
      }
    })
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