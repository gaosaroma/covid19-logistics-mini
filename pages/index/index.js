//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    CurPage: 'profile',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    
  },
})
