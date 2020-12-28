// pages/blocks/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //   list:[{order_id:"383121313",
  //   time:"2020-12-03 03:53",
  //   cur_ware:"嘉定仓库",
  //   next_ware:"青浦仓库",
  //   worker_id:"9532131",
  //   block_id:"1kjdaknewkjn",
  //   block_height:"319",
  //   risk:'无风险',
  //   src_dest_list: [{
  //     city: '深圳市',
  //     name:'DJI旗舰店'
  //   }, {
  //     city: '上海市',
  //     name:'栎鹏'
  //   }, ],
  // }],
    list:[],
    id:"",
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
  getInputValue:function(e){
    this.setData({
      id:e.detail.value
    })
  },

  search: function(){
    console.log("in search")
    // let url=app.globalData.base_url+'/block/search'
    let url='http://127.0.0.1:8000/block/search'
    console.log(this.data.id)
    var that=this
    wx.request({
      url: url,
      data:{
        id:this.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(res.data)
        let data=JSON.parse(res.data)
        that.setData({
          list:data
        })

        wx.setStorage({
          data: 'res',
          key: data,
        })

      },
      complete(res){
        console.log(res.data)
        that.setData({
          list: [{order_id:"383121313",
          time:"2020-12-03 03:53",
          cur_ware:"嘉定仓库",
          next_ware:"青浦仓库",
          worker_id:"9532131",
          block_id:"1kjdaknewkjn",
          block_height:"319",
          risk:'无风险',
          src_dest_list: [{
            city: '深圳市',
            name:'DJI旗舰店'
          }, {
            city: '上海市',
            name:'栎鹏'
          }, ],
        }]
        })
      }
    })
  },

  showDetail: function(e){
    console.log(e.currentTarget.dataset.idx)
    let idx=e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '../../pages/blocks/logistics_detail?id='+idx,
    })
  }
})