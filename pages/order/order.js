// pages/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: -1,
    modalName: null,
    region_s: ['广东省', '广州市', '海珠区'],
    region_r: ['广东省', '广州市', '海珠区'],
    pickerColor: '#ffffff',
    address: '',
    supplier_id: '',
    product_id: '',
    product_name: '',
    detail_address_s: '',
    name: '',
    contact: '',
    detail_address_r: ''
  },

  bindSupInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      supplier_id: input_context
    })
  },

  bindProIDInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      product_id: input_context
    })
  },

  bindProNameInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      product_name: input_context
    })
  },

  bindNameInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      name: input_context
    })
  },

  bindContactInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      contact: input_context
    })
  },

  RegionChangeS: function(e) {
    this.setData({
      pickerColor: '#000000',
      region_s: e.detail.value
    })
  },

  RegionChangeR: function(e) {
    this.setData({
      pickerColor: '#000000',
      region_r: e.detail.value
    })
  },

  bindAddressInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      detail_address_r: input_context
    })
  },

  bindLocationTap: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: 'false',
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.chooseLocation({
          latitude: latitude,
          longitude: longitude,
          success: function(loc_res) {
            that.setData({
              detail_address_s: loc_res.address
            })
          }
        })
      }
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  bindSubmitTap: function(e) {
    var self = this;
    var modal_name = e.currentTarget.dataset.target;
    wx.request({
      url: app.globalData.base_url+'',
      method: 'POST',
      data: {
        user_id: parseInt(self.data.user_id),
        supplier_id: self.data.supplier_id,
        product_id: self.data.product_id,
        product_name: self.data.product_name,
        ship_address: {
          province: self.data.region_s[0],
          city: self.data.region_s[1],
          district: self.data.region_s[2],
        },
        ship_detail_address: self.data.detail_address_s,
        name: self.data.name,
        contact: self.data.contact,
        receive_address: {
          province: self.data.region_r[0],
          city: self.data.region_r[1],
          district: self.data.region_r[2],
        },
        receive_detail_address: self.data.detail_address_r,
      },
      success: function(res){
        if(res.success) {
          self.setData({
            modalName: modal_name
          })
        }
      },
      fail: function(res) {
        console.log("wx.request error!");
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      json_data = JSON.parse(userinfo);
      this.setData({
        user_id: userinfo.user_id
      })
    } else {
      // wx.navigateTo({
      //   url: '../login/login',
      // })
    }
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