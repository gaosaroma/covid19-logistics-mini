// pages/create_logistics/create_logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['仓库节点', '运输节点'],
      ['嘉定仓库', '青浦仓库', '杨浦仓库', '闵行仓库', '宝山仓库'],
    ],
    multiArrayNext: [
      ['仓库节点', '运输节点'],
      ['嘉定仓库', '青浦仓库', '杨浦仓库', '闵行仓库', '宝山仓库'],
    ],
    objectMultiArray: [
      ['嘉定仓库', '青浦仓库', '杨浦仓库', '闵行仓库', '宝山仓库'],
      ['汽车', '火车', '飞机', '轮船']
    ],
    multiIndex: [0, 0],
    multiIndexNext: [0, 0]
  },

  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  MultiChangeNext(e) {
    this.setData({
      multiIndexNext: e.detail.value
    })
  },

  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    var objectMultiArray = this.data.objectMultiArray;
    data.multiIndex[e.detail.column] = e.detail.value;
    if(e.detail.column == 0) {
      data.multiArray[1] = objectMultiArray[data.multiIndex[0]]
    }
    this.setData(data);
  },

  MultiColumnChangeNext(e) {
    let data = {
      multiArrayNext: this.data.multiArrayNext,
      multiIndexNext: this.data.multiIndexNext
    };
    var objectMultiArray = this.data.objectMultiArray;
    data.multiIndexNext[e.detail.column] = e.detail.value;
    if(e.detail.column == 0) {
      data.multiArrayNext[1] = objectMultiArray[data.multiIndexNext[0]]
    }
    this.setData(data);
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