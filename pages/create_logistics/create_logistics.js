// pages/create_logistics/create_logistics.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 'create_logistics',
    tab_bar_list: [],
    order_id: '',
    modalName: null,
    user_id: 0,
    station_id: 0,
    station_type: '',
    station_name: '',
    risk: 0,
    work_id: 'JD54783520',  
    risk_name: ['无风险', '低风险', '高风险']
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  bindQRTap: function(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    var self = this;
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
      self.setData({
        user_id: json_data.user_id
      })
      wx.request({
        url: app.globalData.base_url + 'station/get/' + json_data.station_id,
        method: 'GET',
        data: {},
        success: function(e) {
          if(e.data.code == 200) {
            let data = e.data.resultObjects[0];
            console.log(data)
            self.setData({
            
              station_id: data.id,
              station_name: data.name,
              station_type: data.transportationType,
              risk: data.risk,
              work_id: json_data.work_id
            });
          } else {
            console.log(e.code);
          }
        },
        fail: function(e) {
          console.log("wx.request error!");
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  bindOrderIDInput: function(e){
    var input_context = e.detail.value;
    this.setData({
      order_id: input_context
    })
  },
  bindTabbarTap: function(e) {
    var tab_index = parseInt(e.currentTarget.dataset.tabindex);
    var tab_list = this.data.tab_bar_list;
    var page = tab_list[tab_index];
    wx.redirectTo({
      url: page.page_url,
    })
  },


  bindCreateTap: function(e) {
    var modalName = e.currentTarget.dataset.target;
    var self = this;
    wx.request({
      url: app.globalData.base_url + 'logistics/createLogistics',
      method: 'POST',
      data: {
        submiter: self.data.user_id,
        orderId: self.data.order_id,
        stationId: self.data.station_id
      },
      success: function(e){
        console.log(e);
        self.setData({
          modalName: modalName
        })
      },
      fail: function(e) {
        console.log("wx.request error!");
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
    var tab_list = app.globalData.tab_list;
    this.setData({
      tab_bar_list: tab_list
    })
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