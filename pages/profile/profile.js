// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
    phone_number: '',
    identity: {},
    work_id: '',
    node: '',
    gridCol: 4,
    iconList: [{
      icon: 'squarecheckfill',
      color: 'red',
      badge: 120,
      name: '审核申请'
    }, {
      icon: 'deliver_fill',
      color: 'orange',
      badge: 1,
      name: '添加运输节点'
    }, {
      icon: 'formfill',
      color: 'yellow',
      badge: 0,
      name: '我的痕迹'
    }, {
      icon: 'homefill',
      color: 'olive',
      badge: 22,
      name: '添加仓库'
    }, {
      icon: 'friendaddfill',
      color: 'cyan',
      badge: 0,
      name: '添加工作人员'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    var self = this;
    if (userinfo) {
      var json_data = JSON.parse(userinfo);
      wx.request({
        url: app.globalData.base_url + '',
        method: 'GET',
        data: {
          'user_id': parseInt(json_data.user_id)
        },
        success: function(res) {
          self.setData({
            phone_number: res.data.phone_number,
            identity: res.data.identity,
            work_id: res.data.work_id,
            node: res.data.node
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
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