// pages/checkRisk/checkRisk.js
Page({

  data: {
    openid: '',
    order_id: "SF8888888",
    transportation: '仓库-上海市浦东新区中转站',
    risk_color: 'red',
    risk_level: '高风险',
    risk_description: '上海市浦东新区出现多例新冠患者',
    applier: '阿圆老师',
    apply_time: '2020-12-03 12:40:02',
    index: null,
    picker: ['审核通过', '驳回申请'],
    check_reply: '',
    cardCur: 0,
    photo_list: [{
      id: 0,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  clickImg(e){
    console.log(e);
    var that = this;
    var id = e.currentTarget.id;
    var url = that.data.photo_list[id].url;
    var url_list = new Array();
    for (var index in that.data.photo_list) {
      url_list[index] = that.data.photo_list[index].url;
     }
    
    wx.previewImage({
      urls: url_list,
      current: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  CheckReplyInput(e) {
    this.setData({
      check_reply: e.detail.value
    })
  },

  submit(e) {
    console.log(e);
    var that = this;
    wx.request({
      url: 'https://host/reply/risk',
      data: {
        user_id: that.openid,
        logistics_id: that.order_id,
        cur_addr: transportation,
        check_result: that.picker[that.index],
        check_reply: that.check_reply
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
    wx.request({
      url: 'https://host/check/risk',
      data: {
        user_id: that.openid,
        logistics_id: that.order_id,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(result) {
        console.log(result);
        reply = result.data.result[0];
        that.setData({
          transportation : reply.cur_addr,
          risk_level : reply.risk_level,
          risk_color : reply.risk_color,
          risk_description : reply.risk_description,
          apply_time : reply.apply_time,
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