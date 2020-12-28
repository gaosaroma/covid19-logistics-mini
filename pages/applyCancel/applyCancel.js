// pages/applyCancel/applyCancel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    logistics_id: '',
    transportationSArray: [
      ["仓库", "交通工具"],
      ["江苏省", "上海市"],
      ["太仓市中转站", '苏州市中转站']
    ],
    transportationIndex: [0, 0, 0],
    riskLevel: '高风险',
    riskColor: 'text-red',
    riskDescription: '浦东新区出现三例疑似患者',
    index: null,
    picker: ['消毒', '病毒检测'],
  },

  MultiChange(e) {
    this.setData({
      transportationIndex: e.detail.value
    })
  },

  MultiColumnChange(e) {
    let data = {
      transportationSArray: this.data.transportationSArray,
      transportationIndex: this.data.transportationIndex
    };
    data.transportationIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.transportationIndex[0]) {
          case 0:
            data.transportationSArray[1] = ["江苏省", "上海市"];
            data.transportationSArray[2] = ["太仓市中转站", '苏州市中转站'];
            break;
          case 1:
            data.transportationSArray[1] = ['火车', '飞机', '汽车'];
            data.transportationSArray[2] = ['Z1234', 'D900', 'K666'];
            break;
        }
        data.transportationIndex[1] = 0;
        data.transportationIndex[2] = 0;
        break;
      case 1:
        switch (data.transportationIndex[0]) {
          case 0:
            switch (data.transportationIndex[1]) {
              case 0:
                data.transportationSArray[2] = ["太仓市中转站", '苏州市中转站'];
                break;
              case 1:
                data.transportationSArray[2] = ['嘉定区中转站', '浦东新区中转站'];
                break;
            }
            break;
          case 1:
            switch (data.transportationIndex[1]) {
              case 0:
                data.transportationSArray[2] = ['Z1234', 'D900', 'K666'];
                break;
              case 1:
                data.transportationSArray[2] = ['HO1163', 'JI2917'];
                break;
              case 2:
                data.transportationSArray[2] = ['沪A666', '苏B8237', '苏C5236'];
                break;
            }
            break;
        }
        data.transportationIndex[2] = 0;
        break;
    
    }
    this.setData(data);
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  submit(e) {
    console.log(e);
    var that = this;
    var app = getApp();
    var array = that.data.transportationSArray;
    var indices = that.data.transportationIndex;
    var cur_add = array[0][indices[0]]+ array[1][indices[1]]+array[2][indices[2]];
    console.log(that.data)
    wx.request({
      url: 'https://host/apply/cancel',
      data: {
        user_id: that.openid,
        logistics_id: that.logistics_id,
        cancel_method: that.picker[that.index],
        cur_addr: cur_add,
        attached_images: that.imgList
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
      }
    })
  },

  scan(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
        this.setData({
          logistics_id: 'SF8888888'
        })
        wx.request({
          url: 'https://host/logistics/search',
          data: {
            id: this.data.logistics_id
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          success: function(result) {
            console.log(result);
            var data = result.data.result[0];
            var risk = ''; var color = '';
            if (data.risk == 1) {
              risk='中风险';
              color = 'orange';
            }
            else if (data.risk==2) {
              risk='高风险';
              color = 'red';
            }
            that.setData({
              riskLevel: risk,
              riskDescription: data.risk_description,
              riskColor: color,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorageSync({
      key: 'openid',
      success (res) {
        console.log(res.data);
        that.setData({
          openid: res.data
        })
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