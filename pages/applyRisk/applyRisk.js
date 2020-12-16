// pages/applyRisk/applyRisk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transportationSArray: [
      ["江苏省", "上海市"],
      ["太仓市中转站", '苏州市中转站']
    ],
    transportationIndex: [0, 0],
    index: null,
    picker: ['中风险', '中高风险', '高风险'],
    imgList: [],
  },

  scan(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
      }
    })
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
            data.transportationSArray[1] = ["太仓市中转站", '苏州市中转站'];
            break;
          case 1:
            data.transportationSArray[1] = ['嘉定区中转站', '浦东新区中转站'];
            break;
        }
        data.transportationIndex[1] = 0;
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

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '',
      content: '确定删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  submit(e) {
    console.log(e);
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