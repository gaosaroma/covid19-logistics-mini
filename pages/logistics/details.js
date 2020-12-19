// pages/logistics/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics_id: "SF8888888",
    src:"深圳",
    dest:"上海",
    state: "运输中",
    cur_addr: "上海嘉定宝园营业点",
    arrival_time: "2020-12-03 03:53",
    risk_block: "asdjajfaljaoi323fel32alk3",
    risk:0,
    time_line:[
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"上海嘉定宝园营业点",
        worker_name:"皓皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
      },
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"上海嘉定宝园营业点",
        worker_name:"皓皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
      },
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"上海嘉定宝园营业点",
        worker_name:"皓皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
      },
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"上海嘉定宝园营业点",
        worker_name:"皓皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
      }
    ],
    shop:{
      state:"已发货",
        time_stamp:"2020-11-30 01:53",
        node:"深圳DJI旗舰店",
        name:"皓皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
    },
    map:{
    latitude: 23.099994,
    longitude: 113.324520,
    scale:6,
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 110.21,
        latitude: 26.2
      }, {
        longitude: 121.47,
        latitude: 31.23
      }],
      colorList:["#FF0000DD","#FF000000"],
      // points: [{
      //   longitude: 113.3245211,
      //   latitude: 23.10229
      // },{
      //   longitude: 121.47,
      //   latitude: 31.23
      // }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: false
    }]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('mapId')

    // this.mapCtx.on('markerClusterClick', res =>{
    //   console.log('markerClusterClick', res)
    // })

    // this.bindEvent()
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