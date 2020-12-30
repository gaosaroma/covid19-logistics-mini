const app =getApp();
Component({
  data: {
    
    selected: 0,
    color: "#BFC2C6",
    selectedColor: "#92B6D5",
    list:[] //tabBar的数据
  },
  lifetimes: {
    //组件的生命周期函数
    attached() {
      this.setData({
        list:[]
      })
    },
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})