const app = getApp()
const componentOptions = {
  properties: {},
  // 组件数据
  data: {
    list: null,
    active: "",
    show: true
  },
  // 组件方法
  methods: {
    changeTab(e) {
      let path
      for (let index = 0; index < this.data.list.length; index++) {
        if (this.data.list[index].name == e.detail) {
          path = this.data.list[index].pagePath
        }
      }
      wx.switchTab({
        url: path
      })
      this.setData({
        active: e.detail
      })
    },
    hideTabbar() {
      this.setData({
        show: false
      })
    },
    showTabbar() {
      this.setData({
        show: true
      })
    },
    init() {
      this.setData({
        list: app.globalData.tabbarList
      })
    }
  },

  // 组件生命周期
  lifetimes: {
    created() {},
    attached() {
      this.init()
    },
    ready() { },
    moved() { },
    detached() { },
  },
}

Component(componentOptions)
