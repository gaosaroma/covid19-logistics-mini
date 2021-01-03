// pages/myApplyList/myApplyList.js
Page({

  data: {
    user_info: '',
    user_id: 7,
    TabCur: 0,
    riskHidden: false,
    cancelHidden: true,
    // [0]是风险列表，[1]是核销列表
    risk_list:[
      {
        logistics_id: "SF8888888",
        cur_state: "高风险",
        cur_state_color: "red",
        cur_addr: "上海市嘉定区中转站",
        risk_description: "阿巴阿巴阿巴",
        apply_time: "2020-12-03 03:53",
        apply_person: "贺老师",
        cancel_method: "消毒",
      },
      {
        logistics_id: "SF9999999",
        cur_state: "中风险",
        cur_state_color: "orange",
        cur_addr: "上海市浦东新区中转站",
        risk_description: "啊啊啊啊啊啊",
        apply_time: "2020-12-13 04:53",
        apply_person: "阿圆",
        cancel_method: "病毒检测",
      }
      ],
    cancel_list:[
      {
        logistics_id: "SF8888888",
        cur_state: "高风险",
        cur_state_color: "red",
        cur_addr: "上海市嘉定区中转站",
        risk_description: "阿巴阿巴阿巴",
        apply_time: "2020-12-03 03:53",
        apply_person: "贺老师",
        cancel_method: "消毒",
      },
      {
        logistics_id: "SF9999999",
        cur_state: "中风险",
        cur_state_color: "orange",
        cur_addr: "上海市浦东新区中转站",
        risk_description: "啊啊啊啊啊啊",
        apply_time: "2020-12-13 04:53",
        apply_person: "阿圆",
        cancel_method: "病毒检测",
      }
      ],
  },

  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60,
      riskHidden: (e.currentTarget.dataset.id==1)?true:false,
      cancelHidden: (e.currentTarget.dataset.id==1)?false:true,
    })
  },

  checkItem(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/viewMyApply/viewMyApply?id=' + index,
    })
  },

  onShow: function (options) {
    var that = this;
    var base_url = getApp().globalData.base_url;
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
       // 这里定义来使用userinfo的数据
       that.setData({
        user_info: json_data
      })
    }
    wx.request({
      url: base_url+'apply/bySubmitter',
      data: {
        'id': that.data.user_info.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
        var data = result.data.resultObjects;
        that.setData({
          risk_list: data[0],
          cancel_list: data[1]
        })
      }
    })
    console.log(that.data);
  },

})