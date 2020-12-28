// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // logistcs_list:[
    //   {logistics_id: "SF8888888",
    //   src_dest_list: [{
    //     city: '深圳市',
    //     name:'DJI旗舰店'
    //   }, {
    //     city: '上海市',
    //     name:'栎鹏'
    //   }, ],
    //   state: "运输中",
    //   cur_addr: "上海嘉定宝园营业点",
    //   arrival_time: "2020-12-03 03:53",
    //   risk_block: "asdjajfaljaoi323fel32alk3",
    //   risk:"无风险"},
    //   {
    //     logistics_id: "SF9999999",
    //     src_dest_list: [{
    //       city: '长沙市',
    //       name:'晓薇'
    //     }, {
    //       city: '上海市',
    //       name:'贺老师'
    //     }, ],
    //     state: "运输中",
    //     cur_addr: "上海嘉定宝园营业点",
    //     arrival_time: "2020-12-13 04:53",
    //     risk_block: "gjlekjfaljaoi323fel32alk3",
    //     risk:"无风险"
    //   }
    //   ],
    id:"",
    logistcs_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  init: function(){
    console.log("init")
    // let url=app.globalData.base_url+'/logistics/list'
    let url='http://127.0.0.1:8000/logistics/list'
    var that=this
    wx.request({
      url: url,
      data:{},
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(res.data)
        let data=JSON.parse(res.data)
        that.setData({
          logistcs_list:data
        })

      },
      complete(res){
        console.log(res.data)
        that.setData({
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
            ]
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

  },

  showDetail: function(e){
    var that = this
    let idx=e.currentTarget.dataset.idx
    let id = that.data.logistcs_list[idx].logistics_id
    wx.navigateTo({url:'../../pages/logistics/details?id='+id})
  },

  getInputValue:function(e){
    this.setData({
      id:e.detail.value
    })
  },

  search: function(){
    console.log("in search")
    // let url=app.globalData.base_url+'/block/search'
    let url='http://127.0.0.1:8000/logistics/search'
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
          logistcs_list:data
        })
      },
      complete(res){
        console.log(res.data)
        that.setData({
          logistcs_list: [{logistics_id: "SF8888888",
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
          risk:"无风险"},]
        })
      }
    })
  },
})