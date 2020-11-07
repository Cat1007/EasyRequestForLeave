const app = getApp()
import serveApi from '../../utils/serveAPI'

const pageOptions = {
  // 页面数据
  data: {
    loading: true,
    show: false,
    tabActive: 0,
    unfinishedList: [],

    finishedList: [],

    tabbar: null
  },

  loadUn() {
    var that = this
    that.setData({
      loading: true,
      show: false
    })

    wx.request({
      url: serveApi.domain + '/loadUnfinishedRequest',
      data: {
        //添加用户的id以及身份信息
        userId: '20183625'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          unfinishedList: res.data.unfinishedList
        })
        setTimeout(function () {
          that.setData({
            loading: false,
            show: true
          })
        }, 500)
      },
      fail(res) {
        setTimeout(function () {
          that.setData({
            loading: false,
            show: true
          })
        }, 500)
        Dialog.alert({
          message: "请假单列表加载失败"
        }).then(() => {
          // on close
        })
      }
    })
  },

  loadFin() {
    var that = this
    that.setData({
      loading: true,
      show: false
    })
    wx.request({
      url: serveApi.domain + '/loadFinishedRequest',
      data: {
        //添加用户的id
        userId: '20183625'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          finishedList: res.data.finishedList
        })
        setTimeout(function () {
          that.setData({
            show: true,
            loading: false
          })
        }, 500)
      },
      fail(res) {
        setTimeout(function () {
          that.setData({
            show: true,
            loading: false
          })
        }, 500)
        Dialog.alert({
          message: "请假单列表加载失败"
        }).then(() => {
          // on close
        })
      }
    })
  },

  tabsChange(event) {
    this.setData({
      tabActive: event.detail
    })
  },

  tabClick(event) {
    if (event.detail.index == 0) {
      this.loadUn()
    } else {
      this.loadFin()
    }
  },

  // 页面载入时
  onLoad(e) {
    this.init(e)
    this.loadUn()
  },
  // 页面初始化
  init(e) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 'list'
      })
    }
  },
  // 页面准备好时
  onReady() { },
  // 页面显示时
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 'list'
      })
    }
  },
  // 页面隐藏时
  onHide() { },
  // 页面卸载时
  onUnload() { },
  // 下拉页面时
  onPullDownRefresh() { },
  // 到达页面底部时
  onReachBottom() { },
  // 页面滚动时
  onPageScroll() { },
  // 分享时，注：onShareAppMessage不能为async异步函数，会导致不能及时取得返回值，使得分享设置无效
  onShareAppMessage() {
    /* const title = ''
    const path = ''
    const imageUrl = ``

    return {
      title,
      path,
      imageUrl,
    } */
  },
}

Page(pageOptions)
