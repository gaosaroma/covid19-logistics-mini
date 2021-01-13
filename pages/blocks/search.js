// pages/blocks/search.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 'check_block',
    tab_bar_list: [],
    logistics_list:[],
    check_list:[],
    search_input:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  bindTabbarTap: function(e) {
    var tab_index = parseInt(e.currentTarget.dataset.tabindex);
    var tab_list = this.data.tab_bar_list;
    var page = tab_list[tab_index];
    wx.redirectTo({
      url: page.page_url,
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
    var tab_list = app.globalData.tab_list;
    this.setData({
      tab_bar_list: tab_list
    })
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
      search_input:e.detail.value
    })
  },

  search: function(){
    let that = this

    // that.data.logistics_list.length=0

    that.setData({
      logistics_list:[],
      check_list:[],
    })


    let search_input=that.data.search_input
    let res = search_input.split("#")
    if (res.length==1){
      that.searchCheck(res)
    }else{
      that.searchLogistics(res)
    }
  },
  searchLogistics:function(res){
    console.log("in searchLogistics")
    let logistics_id = res[0]
    let snapshot_idx=res[1]

    console.log("logistics_id"+logistics_id)
    console.log("snapshot_idx"+snapshot_idx)

    let url=app.globalData.base_url+'logistics/blockSearch'

    var that=this
    wx.request({
      url: url,
      data:{
        orderId:logistics_id,
        id:snapshot_idx
      },
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      success(res){
        let data=res.data.resultObjects
        data.forEach(element => {
          element.snapshot_idx=snapshot_idx
        });
        console.log(data)

        that.setData({
          logistics_list:data,
        })
      },
      complete(res){
        
      }
    })
  },
  searchCheck:function(res){
    console.log("in searchCheck")
    let id = res[0]
    let url=app.globalData.base_url+'apply/blockSearch'
    
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
        console.log(res.data)
        let data=res.data.resultObjects
        that.setData({
          check_list:data
        })
      },
      complete(res){
        
      }
    })
  },

  showDetail: function(e){
    let that=this
    console.log(e.currentTarget.dataset.idx)
    let idx=e.currentTarget.dataset.idx

    if (that.data.logistics_list.length>0){
      that.showLogistics(idx)
    }
    if (that.data.check_list.length>0){
      that.showCheck(idx)
    }
    
  },

  showLogistics: function(idx){
    console.log("in showLogistics")
    let that = this
   
    let orderId = that.data.logistics_list[idx].order_id
    let snapshot_idx = that.data.logistics_list[idx].snapshot_idx

    wx.navigateTo({
      url: '../../pages/blocks/logistics_detail?id='+orderId+'&idx='+snapshot_idx,
    })
  },
  showCheck: function(idx){
    let that = this
    console.log("in showCheck")
    let checkId = that.data.check_list[idx].id
    console.log("checkId is"+checkId)
    wx.navigateTo({
      url: '../../pages/blocks/check_detail?id='+checkId,
    })
  }

})