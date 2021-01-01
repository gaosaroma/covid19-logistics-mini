// pages/applyCancel/applyCancel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info: {},
    logistics_id: 1,
    station_name: "仓库：上海浦东新区中转站",
    transportationSArray: [
      ["仓库", "交通工具"],
      ["江苏省", "上海市"],
      ["太仓市中转站", '苏州市中转站']
    ],
    transportationIndex: [0, 0, 0],
    riskLevel: '请输入订单号后获取...',
    riskColor: 'text-gray',
    riskDescription: '请输入订单号后获取...',
    riskDesColor: 'text-gray',
    index: null,
    picker: ['消毒', '病毒检测'],
    imgList: [],
  },

  LogisticsIdInput(e) {
    this.setData({
      logistics_id: parseInt(e.detail.value)
    })
    this.request_risk();
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  submit(e) {
    console.log(e);
    var that = this;
    var app = getApp();
    var data = that.data;
    var globalData = app.globalData;
    console.log(that.data);
    wx.request({
      url: globalData.base_url+'apply/submitRisk',
      data: {
        submitter: that.user_info.user_id,
        // 'submitter': 7,
        'logisticsId': data.logistics_id, //其实是物流编号，订单的一部分
        'stationId': 1,
        'submitComment': data.picker[data.index],
        'attached_images': data.imgList,
        'type': 0,
        'applyType': 2
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
      }
    })
  },

  scan(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode'],
      success: function(res) {
        console.log(res)
        var logistics_id = 1;
        this.setData({
          logistics_id: logistics_id
        })
        this.request_risk();
      }
    })
  },

  request_risk: function() {
    var that = this;
    var base_url = getApp().globalData.base_url;
    console.log(that.data);
    wx.request({
      url: base_url+'logistics/search',
      data: {
        'id': that.data.logistics_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
        var data = result.data.resultObjects[0];
        var risk = ''; var color = '';
        if (data.riskLevel == 1) {
          risk='中风险';
          color = 'text-orange';
        }
        else if (data.riskLevel==2) {
          risk='高风险';
          color = 'text-red';
        }
        that.setData({
          riskLevel: risk,
          // riskDescription: data.risk_description,
          riskDescription:'阿巴阿巴',
          riskColor: color,
          riskDesColor: ''
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this;
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
       // 这里定义来使用userinfo的数据
       that.setData({
        user_info: json_data
      })
    }
  }

})