// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistcs_list:[
      {logistics_id: "SF8888888",
      src_dest_list: [{
        city: '深圳市',
        name:'DJI旗舰店'
      }, {
        city: '上海市',
        name:'栎鹏'
      }, ],
      state: "运输中",
      cur_addr: "上海嘉定宝园营业点",
      arrival_time: "2020-12-03 03:53",
      risk_block: "asdjajfaljaoi323fel32alk3",
      risk:"无风险"},
      {
        logistics_id: "SF9999999",
        src_dest_list: [{
          city: '长沙市',
          name:'晓薇'
        }, {
          city: '上海市',
          name:'贺老师'
        }, ],
        state: "运输中",
        cur_addr: "上海嘉定宝园营业点",
        arrival_time: "2020-12-13 04:53",
        risk_block: "gjlekjfaljaoi323fel32alk3",
        risk:"无风险"
      }
      ],
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

  },

  showDetail: function(env){
    console.log(env.currentTarget)
    wx.navigateTo({url:'details'})
  }
})