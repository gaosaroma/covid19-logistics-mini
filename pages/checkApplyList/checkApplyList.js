// pages/checkApplyList/checkApplyList.js
Page({

  data: {
    openid: '',
    TabCur: 0,
    riskHidden: false,
    cancelHidden: true,
    risk_list:[
      {
        logistics_id: "SF8888888",
        cur_state: "高风险",
        cur_state_color: "red",
        cur_addr: "上海市嘉定区中转站",
        risk_description: "阿巴阿巴阿巴",
        apply_time: "2020-12-03 03:53",
        apply_person: "贺老师",
        cancel_method: "消毒",
      },
      {
        logistics_id: "SF9999999",
        cur_state: "中风险",
        cur_state_color: "orange",
        cur_addr: "上海市浦东新区中转站",
        risk_description: "啊啊啊啊啊啊",
        apply_time: "2020-12-13 04:53",
        apply_person: "阿圆",
        cancel_method: "病毒检测",
      }
      ],
    cancel_list:[
      {
        logistics_id: "SF8888888",
        cur_state: "高风险",
        cur_state_color: "red",
        cur_addr: "上海市嘉定区中转站",
        risk_description: "阿巴阿巴阿巴",
        apply_time: "2020-12-03 03:53",
        apply_person: "贺老师",
        cancel_method: "消毒",
      },
      {
        logistics_id: "SF9999999",
        cur_state: "中风险",
        cur_state_color: "orange",
        cur_addr: "上海市浦东新区中转站",
        risk_description: "啊啊啊啊啊啊",
        apply_time: "2020-12-13 04:53",
        apply_person: "阿圆",
        cancel_method: "病毒检测",
      }
      ],
  },

  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      riskHidden: (e.currentTarget.dataset.id==1)?true:false,
      cancelHidden: (e.currentTarget.dataset.id==1)?false:true,
    })
  },

  checkItem(e) {
    console.log(e);
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
      url: 'https://host/apply/list',
      data: {
        user_id: that.openid
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(result) {
        console.log(result);
        var data = result.data.result[0];
        that.setData({
          risk_list: data.risk_list,
          cancel_list: data.cancel_list
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