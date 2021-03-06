// pages/blocks/block_logistics.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSame:1,
    list:[
      {orderId:"21",
      time:"121",
      snapshotIdx:"5",
      cur_ware:"嘉定",
      worker_name:"浩浩",
      block_hash:"1212",
      block_height:"1",
      risk:0,
      fromBlock:1,
    },
      {orderId:"21",
      time:"121",
      snapshotIdx:"5",
      cur_ware:"嘉定",
      worker_name:"浩浩",
      risk:0,
      fromBlock:0,
    },
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let order_id=options['id']
    let snapshot_idx = options['idx']
    console.log("in detail")
    console.log(order_id)
    console.log(snapshot_idx)

    let url=app.globalData.base_url+'logistics/compare'

    var that=this
    wx.request({
      url: url,
      data:{
        orderId:order_id,
        id:snapshot_idx
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