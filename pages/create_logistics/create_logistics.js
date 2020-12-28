// pages/create_logistics/create_logistics.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalName: null,
    user_id: null,
    work_id: 'JD54783520',
    multiArray: [
      [{
        id: 0,
        name: '仓库节点'
      },
      {
        id: 1,
        name: '运输节点'
      }],
      [{
        id: 0,
        name: '嘉定仓库'
      },
      {
        id: 1,
        name: '青浦仓库'
      }]
    ],
    multiArrayNext: [
      [{
        id: 0,
        name: '仓库节点'
      },
      {
        id: 1,
        name: '运输节点'
      }],
      [{
        id: 0,
        name: '嘉定仓库'
      },
      {
        id: 1,
        name: '青浦仓库'
      }]
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: '嘉定仓库'
      },
      {
        id: 1,
        name: '青浦仓库'
      }],
      [
        {
          id: 0,
          name: '汽车',
        },
        {
          id: 0,
          name: '火车',
        }
      ]
    ],
    multiIndex: [0, 0],
    multiIndexNext: [0, 0]
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  MultiChangeNext(e) {
    this.setData({
      multiIndexNext: e.detail.value
    })
  },

  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    var objectMultiArray = this.data.objectMultiArray;
    data.multiIndex[e.detail.column] = e.detail.value;
    if(e.detail.column == 0) {
      data.multiArray[1] = objectMultiArray[data.multiIndex[0]]
    }
    this.setData(data);
  },

  MultiColumnChangeNext(e) {
    let data = {
      multiArrayNext: this.data.multiArrayNext,
      multiIndexNext: this.data.multiIndexNext
    };
    var objectMultiArray = this.data.objectMultiArray;
    data.multiIndexNext[e.detail.column] = e.detail.value;
    if(e.detail.column == 0) {
      data.multiArrayNext[1] = objectMultiArray[data.multiIndexNext[0]]
    }
    this.setData(data);
  },

  bindQRTap: function(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
      wx.request({
        url: app.globalData.base_url + '',
        method: 'GET',
        data: {
          'user_id': parseInt(json_data.user_id)
        },
        success: function(e) {
          var ware_list = e.data.ware_list;
          var trans_node_list = e.data.trans_node_list;
          t_multiArray = this.data.multiArray;
          t_multiArray[1] = ware_list;
          this.setData({
            multiArray: t_multiArray,
            multiArrayNext: t_multiArray,
            objectMultiArray:[ware_list, trans_node_list],
            work_id: json_data.work_id,
            user_id: parseInt(json_data.user_id)
          })
        },
        fail: function(e) {
          console.log("wx.request error!");
        }
      })
    } else {
      // wx.navigateTo({
      //   url: '../login/login',
      // })
    }
  },



  bindCreateTap: function(e) {
    var multiIndex = this.data.multiIndex;
    var objectArray = this.data.objectMultiArray;
    var multiIndexNext = this.data.multiIndexNext;
    var modalName = e.currentTarget.dataset.target;

    var curNode = {
      ware_id: multiIndex[0] == 0 ? objectArray[multiIndex[0]][multiIndex[1]].id : -1,
      trans_node_id: multiIndex[0] == 0 ? -1 : objectArray[multiIndex[0]][multiIndex[1]].id
    }

    var nextNode = {
      ware_id: multiIndexNext[0] == 0 ? objectArray[multiIndexNext[0]][multiIndexNext[1]].id : -1,
      trans_node_id: multiIndexNext[0] == 0 ? -1 : objectArray[multiIndexNext[0]][multiIndexNext[1]].id
    }

    wx.request({
      url: app.globalData.base_url + '',
      method: 'POST',
      data: {
        user_id: this.data.user_id,
        cur_node: curNode,
        next_node: nextNode
      },
      success: function(e){
        this.setData({
          modalName: modalName
        })
      },
      fail: function(e) {
        console.log("wx.request error!");
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