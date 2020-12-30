// pages/blocks/check_detail.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSame:1,
    list:[{
      block_hash:"1212",
      block_height:"1",
      check_id:"1231",
      logistics_id:"131",
      risk:1,
      applier_id:"343",
      applier_name:"ada",
      reason:"sdaf",
      auditor_id:"1341",
      auditor_name:"fads",
      picker:1,
      picker_reason:"dacfad",
      time:"fadadv",
      fromBlock:1,
    },
    {
      check_id:"1231",
      logistics_id:"131",
      risk:1,
      applier_id:"343",
      applier_name:"ada",
      reason:"sdaf",
      auditor_id:"1341",
      auditor_name:"fads",
      picker:1,
      picker_reason:"dacfad",
      time:"fadadv",
      fromBlock:0
    }
  ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let idx=options['id']
    console.log("in detail")
    console.log(idx)

    let url=app.globalData.base_url+'apply/compare'

    var that=this
    wx.request({
      url: url,
      data:{
        id:idx
      },
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      success(res){
        let data=res.data.resultObjects
        console.log(data)

        that.setData({
          isSame:data[2].isSame,
          list:[data[0],data[1]],
        })
        console.log(that.data)
      },
      complete(res){
        let data=res.data
        console.log(data)
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