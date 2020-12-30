// pages/viewMyApply/viewMyApply.js
Page({

  data: {
    order_id: 8,
    transportation: '仓库-上海市浦东新区中转站',
    risk_color: 'red',
    risk_level: '高风险',
    risk_description: '上海市浦东新区出现多例新冠患者',
    applier: '阿圆老师',
    apply_time: '2020-12-03 12:40:02',
    index: null,
    picker: ['审核通过', '驳回申请'],
    cardCur: 0,
    photo_list: [{
      id: 0,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }],
    numList: [{
      name: '待审核'
    }, {
      name: '申请通过'
    },],
    num: 1,
    check_reply: '我说可以',
    check_result: '审核通过',
    check_result_color: 'green',
  },

  onLoad: function (options) {
    var that = this;
    var base_url = getApp().globalData.base_url;
    that.setData({
      order_id: options.id
    });
    // wx.getStorageSync({
    //   key: 'openid',
    //   success (res) {
    //     console.log(res.data);
    //     that.setData({
    //       openid: res.data
    //     })
    //   }
    // })
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
        var color = '';
        var result = '';
        var num_list = [{
          name: '待审核'
        }, {
          name: '申请通过'
        }];
        var num_index = 1;
        console.log(typeof reply.status);
        if (reply.status == 1){
          color = 'green';
          result='审核通过';
        }
        else if (reply.status == 0){
          color='orange';
          result='待审核';
          num_index=0;
        }
        else {
          console.log('审核未通过');
          color='red';
          result='审核未通过';
          num_list = [{
            name: '待审核'
          }, {
            name: '申请未通过'
          }];
        }
        that.setData({
          transportation : reply.stationName,
          risk_level : reply.riskType==1?'中风险':'高风险',
          risk_color : reply.riskType==1?'orange':'red',
          risk_description : reply.submitComment,
          apply_time : reply.submitTime,
          check_reply: reply.auditComment,
          check_result: result,
          check_result_color: color,
          numList: num_list,
          num: num_index,
        })
      }
    })
  },

})