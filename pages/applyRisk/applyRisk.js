// pages/applyRisk/applyRisk.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    logistics_id: 1,
    risk_description: '',
    station_name: "仓库：上海浦东新区中转站",
    transportationSArray: [
      ["仓库", "交通工具"],
      ["江苏省", "上海市"],
      ["太仓市中转站", '苏州市中转站']
    ],
    transportationIndex: [0, 0, 0],
    index: null,
    picker: ['中风险', '高风险'],
    imgList: [],
  },

  scan(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
        this.setData({
          logistics_id: 'SF8888888'
        })
      }
    })
  },

  LogisticsIdInput(e) {
    console.log(e);
    this.setData({
      logistics_id: e.detail.value
    })
  },

  RiskDesInput(e) {
    console.log(e);
    this.setData({
      risk_description: e.detail.value
    })
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '',
      content: '确定删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  submit(e) {
    console.log(e);
    var that = this;
    var app = getApp();
    var data = that.data;
    var globalData = app.globalData;
    var risk_type = 0;
    if (data.picker[data.index]=='中风险') {risk_type=1}
    else if (data.picker[data.index]=='高风险') {risk_type=2}
    wx.request({
      url: globalData.base_url+'apply/submitRisk',
      data: {
        'submitter': data.user_info.work_id,
        // 'submitter': 7,
        'logisticsId': data.logistics_id,
        'stationId': data.user_info.station_id,
        'submitComment': data.risk_description,
        'attached_images': data.imgList,
        'type': risk_type,
        'applyType': 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
        var code = result.data.code;
        var index = result.data.resultObjects[0].id;
        if (code==200){
          wx.showToast({
            title: '申报成功',
            icon: 'succes',
            duration: 1000,
            mask:true,
            success:()=>{
              setTimeout(()=> {
                  wx.navigateTo({
                      url:'/pages/viewMyApply/viewMyApply?id='+index
                  })
              },1000)
          }
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
      that.setData({
        user_info: json_data
      })
      // 这里使用userinfo中的data

      // let user_info = {
      //   user_id: data.id,
      //   openid: data.openid,
      //   s
      //   work_id: 'SF2017060' + data.id,
      //   user_name: data.username,
      //   user_phone: data.telephone,
      //   station_type: data.station.transportationType,
      //   station_name: data.station.name,
      //   station_id: data.station.id
      // }

    }
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var g_list = app.globalData.list;
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var tab_index = 0;
      for(let i = 0, len=g_list.length; i < len; ++i) {
        if(g_list[i].pagePath.indexOf("applyRisk") != -1) {
          tab_index = i;
        }
      }
      this.getTabBar().setData({
        selected: tab_index,
        list: g_list
      })
    }
  }
})