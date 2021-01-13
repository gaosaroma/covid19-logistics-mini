// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 'profile',
    tab_bar_list: [],
    username: '',
    avatar_url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
    phone_number: '',
    identity: 0,
    identity_name: '普通用户',
    work_id: '',
    node: '嘉定仓库',
    gridCol: 4,
    module_list: [
      {
        id: 1,
        icon: 'myfill',
        color: 'orange',
        badge: 120,
        name: '个人信息',
        link: '../profile/profile'
      },
      {
        id: 2,
        icon: 'locationfill',
        color: 'orange',
        badge: 120,
        name: '我的地址',
        link: ''
      },
      {
        id: 3,
        icon: 'formfill',
        color: 'orange',
        badge: 22,
        name: '我的足迹',
        link: '../logistics/logistics'
      },
      {
        id: 4,
        icon: 'homefill',
        color: 'orange',
        badge: 22,
        name: '我的仓库',
        link: '../logistics/ware'
      }, 
      {
        id: 5,
        icon: 'homefill',
        color: 'orange',
        badge: 22,
        name: '查看仓库',
        link: '../logistics/ware'
      }, 
      {
        id: 6,
        icon: 'shopfill',
        color: 'orange',
        badge: 22,
        name: '我的店铺',
        link: ''
      }, 
      {
        id: 7,
        icon: 'goodsfill',
        color: 'orange',
        badge: 22,
        name: '添加商品',
        link: ''
      }, 
      {
        id: 8,
        icon: 'deliver_fill',
        color: 'orange',
        badge: 22,
        name: '创建物流信息',
        link: '../create_logistics/create_logistics'
      }, 
      {
        id: 9,
        icon: 'activityfill',
        color: 'orange',
        badge: 22,
        name: '添加运输节点',
        link: ''
      },
      {
        id: 10,
        icon: 'roundaddfill',
        color: 'orange',
        badge: 22,
        name: '添加仓库',
        link: ''
      },
      {
        id: 11,
        icon: 'cartfill',
        color: 'orange',
        badge: 22,
        name: '订单发货',
        link: '../order/order'
      },
      {
        id: 12,
        icon: 'formfill',
        color: 'orange',
        badge: 22,
        name: '查看订单',
        link: '../logistics/logistics'
      },
      {
        id: 13,
        icon: 'friendaddfill',
        color: 'orange',
        badge: 22,
        name: '人员管理',
        link: ''
      },
      {
        id: 14,
        icon: 'warnfill',
        color: 'orange',
        badge: 22,
        name: '申报风险',
        link: '../applyRisk/applyRisk'
      },
      {
        id: 15,
        icon: 'infofill',
        color: 'orange',
        badge: 22,
        name: '申请核销',
        link: '../applyCancel/applyCancel'
      },
      {
        id: 16,
        icon: 'squarecheckfill',
        color: 'orange',
        badge: 22,
        name: '核销风险',
        link: '../checkRisk/checkRisk'
      },
      {
        id: 17,
        icon: 'attentionfill',
        color: 'orange',
        badge: 22,
        name: '查看申请',
        link: '../checkApplyList/checkApplyList'
      },
      {
        id: 18,
        icon: 'attentionfill',
        color: 'orange',
        badge: 22,
        name: '我的申请',
        link: '../viewMyApply/viewMyApply'
      }
    ],
    identity_map : [
      [1, 2, 12],
      [1, 6, 7, 11, 12],
      [1, 4, 13, 10, 14, 15],
      [1, 3, 4, 8, 9, 14, 15],
      [1, 17, 16],
      [1, 5, 10, 13, 17, 14, 16]
   ],
    module_index: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    var identity_map = this.data.identity_map;
    var self = this;
    if (userinfo) {
      var json_data = JSON.parse(userinfo);
      wx.request({
        url: app.globalData.base_url + 'user/get/' + json_data.user_id,
        method: 'GET',
        data: {},
        success: function(res) {
          if(res.data.code == 200) {
            let data = res.data.resultObjects[0]
            console.log(data)
            self.setData({
              phone_number: data.telephone,
              identity: data.type,
              identity_name: data.typeName,
              work_id: 'SF2017060' + data.id,
              node: data.station == undefined? '': data.station.name,
              username: data.username,
              module_index: identity_map[parseInt(data.type)-1]
            })
          } else {
            console.log(res.data);
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
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


  bindGridTap: function(e) {
    var grid_index = parseInt(e.currentTarget.dataset.grid);
    var module_index = this.data.module_index;
    var module = this.data.module_list[module_index[grid_index]-1];
    if(module.link.length != 0) {
      wx.navigateTo({
        url: module.link,
      })
    } else {
      return;
    }
  }
})