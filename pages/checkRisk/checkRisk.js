// pages/checkRisk/checkRisk.js
Page({

  data: {
    openid: '',
    order_id: 8,
    transportation: '仓库-上海市浦东新区中转站',
    risk_color: 'red',
    risk_level: '高风险',
    risk_description: '上海市浦东新区出现多例新冠患者',
    applier: '阿圆老师',
    apply_time: '2020-12-03 12:40:02',
    index: null,
    picker: ['审核通过', '驳回申请'],
    check_reply: '',
    cardCur: 0,
    // photo_list: [{
    //   id: 0,
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    // }, {
    //   id: 1,
    //     url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    // }, {
    //   id: 2,
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    // }, {
    //   id: 3,
    //   url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    // }],
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  clickImg(e){
    console.log(e);
    var that = this;
    var id = e.currentTarget.id;
    var url = that.data.photo_list[id].url;
    var url_list = new Array();
    for (var index in that.data.photo_list) {
      url_list[index] = that.data.photo_list[index].url;
     }
    
    wx.previewImage({
      urls: url_list,
      current: url,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  CheckReplyInput(e) {
    console.log(e);
    this.setData({
      check_reply: e.detail.value
    })
  },

  submit(e) {
    console.log(e);
    var that = this;
    var base_url = getApp().globalData.base_url;
    var api = '';
    if (that.data.index==0) {api='agree'}
    else {api='reject'}
    wx.request({
      url: base_url+'apply/'+api,
      data: {
        'id': that.data.order_id,
        'auditComment': that.data.check_reply
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
        if (result.data.code==200){
          wx.showToast({
            title: '审核成功',
            icon: 'succes',
            duration: 1000,
            mask:true,
            success:()=>{
              setTimeout(()=> {
                  wx.navigateTo({
                      url:'/pages/checkApplyList/checkApplyList'
                  })
              },1000)
          }
          })
        }
      }
    })
  },

  onLoad: function (options) {
    if(options.id == undefined) {
      return;
    }
    var that = this;
    var base_url = getApp().globalData.base_url;
    that.setData({
      order_id: options.id
    });
    var userinfo = wx.getStorageSync('userinfo');
    if(userinfo) {
      var json_data = JSON.parse(userinfo);
       // 这里定义来使用userinfo的数据
       that.setData({
        user_info: json_data
      })
    }
    wx.request({
      url: base_url+'apply/getById',
      data: {
        'id': that.data.order_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(result) {
        console.log(result);
        var reply = result.data.resultObjects[0];
        that.setData({
          transportation : reply.stationName,
          risk_level : reply.riskType==1?'低风险':(reply.riskType==0?'无风险':'高风险'),
          risk_color : reply.riskType==1?'orange':(reply.riskType==0?'green':'red'),
          risk_description : reply.submitComment,
          apply_time : reply.submitTime,
          applier:reply.submitter,
        })
      }
    })
  },

})