// pages/logistics/logistics.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 'check_logistics',
    tab_bar_list: [],
    id:"",
    logistcs_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
    if(app.globalData.isSame==0){
      wx.showToast({
        title: '警告：数据篡改',
        icon:'none',
        duration:3000,
        mask:true
      })
    }
  },

  init: function(){
    let user_id=0;
    let user_type =0;
    let url= '';
    user_id =  JSON.parse(wx.getStorageSync('userinfo'))["user_id"];
    console.log("user_id"+user_id)
    user_type = JSON.parse(wx.getStorageSync('userinfo'))["identity"];
    if(user_type==1){ // 普通用户
      url=app.globalData.base_url+'logistics/normalUser'
    }else if(user_type==2){ // 供应商
      url=app.globalData.base_url+'logistics/supplier'
    }else{ // 工作人员
      url=app.globalData.base_url+'logistics/list'
    }
    
    console.log("user_id is "+user_id)
    console.log("user_type is "+user_type)
    console.log("url is "+url)
    var that=this
    wx.request({
      url: url,
      data:{
        "id": user_id==0?7:user_id
      },
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      success(res){
        let data=res.data.resultObjects
        console.log(data)
        that.setData({
          logistcs_list:data
        })

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
    var tab_list = app.globalData.tab_list;
    this.setData({
      tab_bar_list: tab_list
    })
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
    let id = that.data.logistcs_list[idx].orderId
    wx.navigateTo({url:'../../pages/logistics/details?id='+id})
  },

  getInputValue:function(e){
    this.setData({
      id:e.detail.value
    })
  },

  search: function(){
    console.log("in search")
    let url=app.globalData.base_url+'logistics/search'
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
        let data=res.data.resultObjects
        console.log(data)
        that.setData({
          logistcs_list:data
        })
      },
      method:"POST",
      complete(res){
        console.log(res.data)
      }


    })
  },
})


