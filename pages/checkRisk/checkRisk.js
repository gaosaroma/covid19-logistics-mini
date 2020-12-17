// pages/checkRisk/checkRisk.js
Page({

  data: {
    order_id: "SF8888888",
    transportation: '仓库-上海市浦东新区中转站',
    risk_color: 'red',
    risk_level: '高风险',
    risk_description: '阿巴阿巴阿巴',
    applier: '阿圆老师',
    apply_time: '2020-12-03 12:40:02',
    index: null,
    picker: ['审核通过', '驳回申请'],
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