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
    product_name: '',
    detail_address_s: '',
    name: '',
    contact: '',
    contact_s: '',
    detail_address_r: '',
    longitude: null,
    latitude: null,
  },

  bindSupInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      supplier_id: input_context
    })
  },

  bindContactSInput: function(e) {
    var input_context = e.detail.value;
    this.setData({
      contact_s: input_context
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
        that.setData({
          longitude: longitude,
          latitude: latitude
        })
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
      url: app.globalData.base_url+'logistics/create',
      method: 'POST',
      data: {
        user_id: parseInt(self.data.user_id),
        ship_name: self.data.supplier_id,
        product_name: self.data.product_name,
        contact_s: self.data.contact_s,
        ship_address: {
          province: self.data.region_s[0],
          city: self.data.region_s[1],
          district: self.data.region_s[2],
          longitude: self.data.longitude,
          latitude: self.data.latitude
        },
        ship_detail_address: self.data.detail_address_s,
        name: self.data.name,
        contact: self.data.contact,
        receive_address: {
          province: self.data.region_r[0],
          city: self.data.region_r[1],
          district: self.data.region_r[2],
          longitude: 116.397228,
          latitude: 39.909604
        },
        receive_detail_address: self.data.detail_address_r,
      },
      success: function(res){
        var data = res.data;
        if(data.code == 200) {
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
      var json_data = JSON.parse(userinfo);
      this.setData({
        supplier_id: json_data.user_name,
        contact_s: json_data.user_phone,
        user_id: json_data.user_id,
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },


  bindOkTap: function(e) {
    this.setData({
      modalName: null
    })
    wx.navigateBack({});
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