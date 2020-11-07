// pages/login/login.js
import serve from '../../utils/serveAPI';
import {Teacher,Student} from '../../utils/tabbar'

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: null,
    isAuthenticated: false
  },

  login: function () {
    var that = this
    wx.login({
      success(loginRes) {
        console.log(loginRes)
        if (loginRes.code) {
          // 携带code去后台验证
          wx.request({
            url: serve.domain + '/login',
            method: 'POST',
            data: {
              code: loginRes.code
            },
            success: (res) => {
              console.log(res)
              that.setData({
                userInfo: res.data
              })
              let userInfo = res.data
              // 已经在系统中认证过
              if (userInfo.isAuthenticated) {
                // 保存登陆状态和信息到本地
                try {
                  wx.setStorageSync('loginInfo', userInfo)
                } catch (e) { console.log(e) }
                app.globalData.userInfo = userInfo
                // 提示重新打开小程序
                that.setData({
                  isAuthenticated: true
                })
              } else {
                // 跳转到认证页
                that.setData({
                  isLogin: true
                })
              }
            }
          })
        } else {
          console.log('登陆失败')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.userInfo == null) {
      this.login()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})