// pages/blocks/block_logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // order_id:"383121313",
    // time:"2020-12-03 03:53",
    // cur_ware:"嘉定仓库",
    // next_ware:"青浦仓库",
    // worker_id:"9532131",
    // block_id:"1kjdaknewkjn",
    // block_height:"319",
    // risk:"无风险"
    order_id:"",
    time:"",
    cur_ware:"",
    next_ware:"",
    worker_id:"",
    block_id:"",
    block_height:"",
    risk:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let idx=options['id']
    console.log("in detail")
    console.log(idx)
    wx.getStorage({
      key: 'res',
      success(res){
        let data =res.data
        console.log(data)
        that.setData({
          order_id:data.order_id,
          time:data.time,
          cur_ware:data.cur_ware,
          next_ware:data.next_ware,
          worker_id:data.worker_id,
          block_id:data.block_id,
          block_height:data.block_height,
          risk:data.risk
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