// pages/login/login.js
import serve from '../../utils/serveAPI';
import {
  Teacher,
  Student
} from '../../utils/tabbar'

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    // 当前页面暂存用户信息
    userInfo: null,
    isAuthenticated: false,
    userType: 'student',
    userId: ''
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
            method: 'GET',
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
                } catch (e) {
                  console.log(e)
                }
                app.globalData.userInfo = userInfo
                // 提示重新打开小程序
                that.setData({
                  isAuthenticated: true
                })
              } else {
                // 跳转到认证页
                that.setData({
                  userInfo: userInfo,
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

  // 认证用户身份
  authenticate() {
    var that = this
    let typeId = parseInt(this.data.userId)
    let reqData = {
      openId: that.data.userInfo.user.openId,
      id: typeId,
      identify: that.data.userType
    }
    console.log(reqData)
    wx.request({
      url: serve.domain + '/auth',
      method: 'POST',
      data: reqData,
      success: (res) => {
        console.log(res)
        if (res.data.user != null) {
          let userInfo = {
            isAuthenticated: true,
            type: res.data.type,
            user: res.data.user
          }
          // 保存登陆状态和信息到本地
          try {
            wx.setStorageSync('loginInfo', userInfo)
          } catch (e) {
            console.log(e)
          }
          // 提示重新打开小程序
          that.setData({
            isAuthenticated: true,
            isLogin: false
          })
        } else {
          console.log("auth failed")
        }
      }
    })
  },

  onUserTypeChange(event) {
    this.setData({
      userType: event.detail,
    });
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