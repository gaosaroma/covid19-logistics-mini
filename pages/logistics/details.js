// pages/logistics/details.js
const app=getApp()
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
    logistics_len:0,
    time_line:[
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"上海嘉定宝园营业点",
        worker_name:"沈枭昂",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
        coordinate: [
          { longitude: 113.32,
             latitude: 24.23
           }]
      },
      {
        state:"运输中",
        time_stamp:"2020-12-03 03:53",
        trans_node:"春秋航空9C8950",
        worker_name:"罗吉皓",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
        coordinate: [ // 第一个是起点
          { longitude: 121.47,
             latitude: 31.23
           }, // 第二个是终点
          { longitude: 113.32,
             latitude: 24.23
           },
           ]
      },
    ],
    shop:{
      state:"已发货",
        time_stamp:"2020-11-30 01:53",
        node:"深圳DJI旗舰店",
        name:"贺鹏程",
        risk:0,
        risk_block: "asdjajfaljaoi323fel32alk3",
        longitude: 121.47,
        latitude: 31.23
    },
    map:{
    latitude: 23.099994,
    longitude: 113.324520,
    scale:7,
    // markers:[{
    //   longitude: 113.3245211,
    //   latitude: 23.10229,
    //   title: "深圳DJI旗舰店",
    //   iconPath: "../../resources/no_risk.png"
    // },{
    //   longitude: 110.21,
    //   latitude: 26.2,
    //   title: "上海嘉定宝园营业点",
    //   iconPath: "../../resources/no_risk.png"
    // }

    // ],
    markers:[],
    polyline:[]
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 110.21,
    //     latitude: 26.2
    //   }],
    //   color:"#0e932e",
    //   width: 2,
    //   dottedLine: false
    // },{
    //   points: [{
    //     longitude: 110.21,
    //     latitude: 26.2
    //   }, {
    //     longitude: 121.47,
    //     latitude: 31.23
    //   }],
    //   color:"#0e932e",
    //   width: 2,
    //   dottedLine: false
    // },]
    }
  },
  // 自定义数据结构
  marker:{
    longitude: 0,
    latitude: 0,
    iconPath: ""
  },
  polyline:{
    points: [{
      longitude: 0,
      latitude: 0
    }, {
      longitude: 0,
      latitude: 0
    }],
    color:"",
    width: 2,
    dottedLine: false
  },
  riskIconPath:{
    0:"../../resources/no_risk.png",
    1:"../../resources/low_risk.png",
    2:"../../resources/high_risk.png",
  },
  riskColor:{
    0:"#0e932e",
    1:"#ea9518",
    2:"#d81e06",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options['id']
    console.log(id)
    if (id==null) return
    this.init(id)
    // this.parseCoordinate()
      

    this.mapCtx = wx.createMapContext('mapId')

  },

  init: function(id){

    let url=app.globalData.base_url+'logistics/select'
    console.log(url)
    console.log(id)
    var that=this
    wx.request({
      url: url,
      data:{
        id:id
      },
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      success(res){
        let data=res.data.resultObjects[0]
        console.log(data)
        
        that.setData({
          orderId: data.order_id,
          src:data.src_dest.src.city,
          dest:data.src_dest.dest.city,
          state:data.status==1?"运输中":"已完成",
          cur_addr: data.curr_address,
          arrival_time: data.arriving_time,
          risk_block: data.risk_block,
          risk:data.risk,
          time_line:data.timeline,
          shop:data.shop,
          logistics_len:data.timeline.length
        })

        that.parseCoordinate()

      },
      complete(res){
        console.log(res)
        console.log(res.data)
      }
    })
  

  },

  parseCoordinate: function(){
    console.log(" in parseCoordinate")
    var that = this
    var polylineList = []
    var markers =[]
    console.log(that.data.time_line)
    that.data.time_line.forEach(node => {
      let cor = node.coordinate
      let risk =node.risk
      
      // 按照风险描绘时间线
      if(cor.length==2){
        // 运输节点：直线
        var polyline = JSON.parse(JSON.stringify(this.polyline))
        let color = this.riskColor[risk]
        polyline.points=cor
        polyline.color=color

        polylineList.push(polyline)
      }

      if(cor.length==1){
        // 仓库：Marker
        var marker = JSON.parse(JSON.stringify(this.marker))
        let iconPath = this.riskIconPath[risk]
        marker.longitude=(cor[0]).longitude
        marker.latitude=(cor[0]).latitude
        marker.iconPath=iconPath
        
        markers.push(marker)
      }
    });
    
    // 将商店加入Marker
    var marker = JSON.parse(JSON.stringify(this.marker))
    let shop  = this.data.shop
    let iconPath = this.riskIconPath[shop.risk]
    marker.longitude=shop.longitude
    marker.latitude=shop.latitude
    marker.iconPath=iconPath
    markers.push(marker)
    
    // 地图锚点
    var first= this.data.time_line[0]
    var last = this.data.time_line[this.data.time_line.length-2]
    let long1 = ((first.coordinate)[0]).longitude
    let long2 = ((last.coordinate)[0]).longitude
    let lat1 = ((first.coordinate)[0]).latitude
    let lat2 = ((last.coordinate)[0]).latitude
    that.setData({
      'map.latitude':(lat1+lat2)/2,
      'map.longitude':(long1+long2)/2,
      'map.polyline':polylineList,
      'map.markers':markers
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