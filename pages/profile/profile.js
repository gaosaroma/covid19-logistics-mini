// pages/profile/profile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_page: 'profile',
    tab_bar_list: [
      {
        page_marker: 'check_block',
        icon_url: '../../assets/icons/block.png',
        icon_selected_url: '../../assets/icons/block_light.png',
        page_url: '../blocks/search',
        text: '查区块'
      },
      {
        page_marker: 'check_logistics',
        icon_url: '../../assets/icons/search.png',
        icon_selected_url: '../../assets/icons/search_light.png',
        page_url: '../logistics/logistics',
        text: '查快递'
      },
      {
        page_marker: 'create_logistics',
        icon_url: '../../assets/icons/logistics.png',
        icon_selected_url: '../../assets/icons/logistics_light.png',
        page_url: '../create_logistics/create_logistics',
        text: '物流打卡'
      },
      {
        page_marker: 'apply_risk',
        icon_url: '../../assets/icons/risk.png',
        icon_selected_url: '../../assets/icons/risk_light.png',
        page_url: '../applyRisk/applyRisk',
        text: '申报风险'
      },
      {
        page_marker: 'profile',
        icon_url: '../../assets/icons/me.png',
        icon_selected_url: '../../assets/icons/me_light.png',
        page_url: '../profile/profile',
        text: '我的'
      }
    ],
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
        name: '个人信息'
      },
      {
        id: 2,
        icon: 'locationfill',
        color: 'orange',
        badge: 120,
        name: '我的地址'
      },
      {
        id: 3,
        icon: 'formfill',
        color: 'orange',
        badge: 22,
        name: '我的足迹'
      },
      {
        id: 4,
        icon: 'homefill',
        color: 'orange',
        badge: 22,
        name: '我的仓库'
      }, 
      {
        id: 5,
        icon: 'homefill',
        color: 'orange',
        badge: 22,
        name: '查看仓库'
      }, 
      {
        id: 6,
        icon: 'shopfill',
        color: 'orange',
        badge: 22,
        name: '我的店铺'
      }, 
      {
        id: 7,
        icon: 'goodsfill',
        color: 'orange',
        badge: 22,
        name: '添加商品'
      }, 
      {
        id: 8,
        icon: 'deliver_fill',
        color: 'orange',
        badge: 22,
        name: '创建物流信息'
      }, 
      {
        id: 9,
        icon: 'activityfill',
        color: 'orange',
        badge: 22,
        name: '添加运输节点'
      },
      {
        id: 10,
        icon: 'roundaddfill',
        color: 'orange',
        badge: 22,
        name: '添加仓库'
      },
      {
        id: 11,
        icon: 'cartfill',
        color: 'orange',
        badge: 22,
        name: '订单发货'
      },
      {
        id: 12,
        icon: 'formfill',
        color: 'orange',
        badge: 22,
        name: '查看订单'
      },
      {
        id: 13,
        icon: 'friendaddfill',
        color: 'orange',
        badge: 22,
        name: '人员管理'
      },
      {
        id: 14,
        icon: 'warnfill',
        color: 'orange',
        badge: 22,
        name: '申报风险'
      },
      {
        id: 15,
        icon: 'infofill',
        color: 'orange',
        badge: 22,
        name: '申请核销'
      },
      {
        id: 16,
        icon: 'squarecheckfill',
        color: 'orange',
        badge: 22,
        name: '核销风险'
      },
      {
        id: 17,
        icon: 'attentionfill',
        color: 'orange',
        badge: 22,
        name: '查看申请'
      }
    ],
    identity_map : [
      [1, 2, 12],
      [1, 6, 7, 11, 12],
      [1, 4, 13, 10, 14, 15],
      [1, 3, 4, 8, 9, 14, 15],
      [1, 17, 15, 16],
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
              node: data.station.name,
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
    console.log(e.currentTarget.dataset.tabindex)
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