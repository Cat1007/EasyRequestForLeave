//app.js
import { Teacher, Student } from './utils/tabbar'
App({
  onLaunch: function () {
    var that = this
    // 拉取本地的登陆信息
    wx.getStorage({
      key: 'loginInfo',
      // 说明已经登陆
      success(res) {
        let loginInfo = res.data
        that.globalData.userInfo = res.data
        if (loginInfo.user.type == 'student') {
          that.globalData.tabbarList = Student
          // 配置tabbar 跳转
          wx.switchTab({
            url: '/pages/request/index'
          })
        } else {
          that.globalData.tabbarList = Teacher
          // 配置tabbar 跳转
          wx.switchTab({
            url: '/pages/approve/index'
          })
        }
      },
      fail() {
        // wx.navigateTo({
        //   url: '/pages/login/login'
        // })
      }
    })
  },
  globalData: {
    userInfo: null,
    tabbarList: null
  }
})