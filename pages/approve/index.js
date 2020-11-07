import serveApi from '../../utils/serveAPI'
const app = getApp()


const pageOptions = {
  // 页面数据
  data: {
    list: [],
    loading: true,
    name: "--"
  },

  // 拉取对应的请假单
  loadRequestList: function () {
    var that = this
    that.setData({
      loading: true
    })
    wx.request({
      url: serveApi.domain + '/loadRequestListForTeacher',
      success: (res) => {
        console.log(res.data)
        that.setData({
          loading: false,
          list: res.data.list
        })
      },
      fail() {
        that.setData({
          loading: false,
        })
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  // 拒绝请假请求
  refuseRequest(event) {
    let data = event.currentTarget.dataset
    let that = this
    that.setData({
      loading: true
    })
    // 标识一个请求的某个课次
    console.log(data.reqid)
    console.log(data.sectionid)
    setTimeout(() => {
      that.setData({
        loading: false
      })
    }, 1000);
  },

  // 同意请假请求
  agreeRequest(event) {
    let data = event.currentTarget.dataset
    let that = this
    that.setData({
      loading: true
    })
    // 标识一个请求的某个课次
    console.log(data.reqid)
    console.log(data.sectionid)
    setTimeout(() => {
      that.setData({
        loading: false
      })
    }, 1000);
  },

  // 页面载入时
  onLoad(e) {
    this.init(e)
  },
  // 页面初始化
  init(e) {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 'approve'
      })
    }
    console.log(app.globalData.userInfo)
    this.setData({
      name: app.globalData.userInfo.user.name
    })
    this.loadRequestList()
  },
  // 页面准备好时
  onReady() { },
  // 页面显示时
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 'approve'
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
