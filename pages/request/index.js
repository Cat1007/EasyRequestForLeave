import Notify from '@vant/weapp/notify/notify'
import serveApi from '../../utils/serveAPI'

const app = getApp()

const pageOptions = {
  // 页面数据
  data: {
    //时间选择判断变量
    timeSelected: false,
    periodSelected: false,

    //是否复选区间
    continueSelect: false,

    //选择时间
    startDate: null,
    endDate: null,
    singleDate: null,

    //请假类型 1-病假 2-事假
    reqType: '1',

    //提示文案
    signDate: '点击选择日期',
    signPeriod: '点击选择日期区间',

    //课程加载
    loading: true,
    submitLoading: false,
    saveLoading: false,

    //日历显示
    dateShow: false,
    minDate: new Date().getTime(),

    //请假内容文案
    content: '',

    //防止input层级过高
    contentShow: true,

    //课程列表
    classList: [],
    selectedCourse: [],
    picList: []
  },

  datainit: function () {
    this.setData({
      //时间选择判断变量
      timeSelected: false,
      periodSelected: false,

      //是否复选区间
      continueSelect: false,

      //选择时间
      startDate: null,
      endDate: null,
      singleDate: null,

      //请假类型 1-病假 2-事假
      reqType: '1',

      //提示文案
      signDate: '点击选择日期',
      signPeriod: '点击选择日期区间',

      //课程加载
      submitLoading: false,
      saveLoading: false,

      //请假内容文案
      content: '',

      //课程列表
      classList: [],
      selectedCourse: [],
      picList: [],

    })
  },

  dateToString(date) {
    var str = date.getFullYear() + ''

    if (date.getMonth() + 1 >= 10) {
      str += '-' + (date.getMonth() + 1)
    } else {
      str += '-' + '0' + (date.getMonth() + 1)
    }

    if (date.getDate() >= 10) {
      str += '-' + (date.getDate())
    } else {
      str += '-' + '0' + (date.getDate())
    }

    return str

  },

  //改变日期选择模式则清楚日期和课程列表
  modeChange() {
    var that = this
    if (this.data.continueSelect) {
      this.setData({
        //清除日期选择和课程列表
        startDate: null,
        endDate: null,
        signPeriod: "点击选择日期区间",
        timeSelected: false,
        classList: [],
        selectedCourse: []
      })
    } else {
      this.setData({
        //清除日期选择和课程列表
        singleDate: null,
        signDate: "点击选择日期",
        periodSelected: false,
        classList: [],
        selectedCourse: []
      })
    }
    this.setData({
      continueSelect: !that.data.continueSelect
    })
  },

  //多选框点击切换事件
  toggleCourse(event) {
    var str = '.checkboxes-' + event.currentTarget.dataset.id
    var ele = this.selectComponent(str)
    ele.toggle()
  },

  //请假类型手风琴控制
  typeChange(event) {
    this.setData({
      reqType: event.detail
    })
  },

  courseChange(event) {
    this.setData({
      selectedCourse: event.detail
    })
  },

  selectAll() {
    var checkboxes = this.selectAllComponents('.checkboxes')
    var checked = true
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].data.value == false) {
        checked = false
        break
      }
    }

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].data.value == checked) {
        checkboxes[i].toggle()
      }
    }

  },

  loadClass() {
    // 拉取课程列表
    this.setData({
      loading: true
    })

    var that = this
    var start
    var end

    if (this.data.continueSelect == true) {
      start = this.dateToString(this.data.startDate)
      end = this.dateToString(this.data.endDate)
    } else {
      start = this.dateToString(this.data.singleDate)
      end = this.dateToString(this.data.singleDate)
    }

    let reqData = {
      startTime: start,
      endTime: end,
      //添加用户的id
      userId: app.globalData.userInfo.user.id
    }

    console.log(reqData)

    wx.request({
      url: serveApi.domain + '/loadSection',
      data: reqData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          loading: false,
          classList: res.data.sections,
          selectedCourse: []
        })
      },
      fail(res) {
        Notify({
          type: 'primary',
          message: '请求失败',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
        that.setData({
          loading: false
        })
      }

    })
  },

  //点击开启日历
  datetoggle() {
    var that = this
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().hideTabbar()
    }
    this.setData({
      dateShow: !that.data.dateShow,
      contentShow: !that.data.contentShow
    })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        show: false
      })
    }
  },

  //日历关闭
  onClose() {
    var that = this
    this.setData({
      dateShow: !that.data.dateShow,
      contentShow: !that.data.contentShow
    })
  },

  //日期选择确认事件
  onConfirm(date) {
    if (this.data.continueSelect) {
      var str = this.dateToString(date.detail[0]) + '/' + this.dateToString(date.detail[1]).substring(5)
      var that = this
      this.setData({
        dateShow: !that.data.dateShow,
        startDate: date.detail[0],
        endDate: date.detail[1],
        periodSelected: true,
        signPeriod: str
      })
    } else {
      var that = this
      var str = this.dateToString(date.detail)
      this.setData({
        dateShow: !that.data.dateShow,
        singleDate: date.detail,
        timeSelected: true,
        signDate: str
      })
    }

    this.loadClass()
  },

  //日历弹出层消失
  dateHidden() {
    var that = this
    this.setData({
      contentShow: true
    })

    //重新显示tab栏
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().showTabbar()
    }
  },

  //监视输入框更改
  contentChange(event) {
    this.setData({
      content: event.detail
    })
  },

  //保存函数,保存请假数据到本地缓存
  tempSave() {
    var that = this

    this.setData({
      saveLoading: true
    })

    var tempReq = new Object()

    //保存时间选择情况
    tempReq.timeSelected = that.data.timeSelected
    tempReq.periodSelected = that.data.periodSelected
    tempReq.continueSelect = that.data.continueSelect

    //保存相关的日期
    tempReq.startDate = that.data.startDate
    tempReq.endDate = that.data.endDate
    tempReq.singleDate = that.data.singleDate

    //str
    tempReq.signPeriod = that.data.signPeriod
    tempReq.signDate = that.data.signDate

    tempReq.content = that.data.content
    tempReq.reqType = that.data.reqType

    //异步保存
    wx.setStorage({
      key: 'tempReq',
      data: tempReq,
      success: function (res) {
        console.log(res)
        //成功提示
        Notify({
          type: 'primary',
          message: '保存请假单到本地成功',
          duration: 1000,
          color: '#ffffff',
          background: '#67C23A'
        })

        that.setData({
          saveLoading: false
        })
      },
      fail: function (req) {
        Notify({
          type: 'primary',
          message: '保存失败',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
      }
    })
  },

  // 提交请假单
  submit() {
    var that = this
    this.setData({
      submitLoading: true
    })

    //检查表单完成性

    //检查时间正确性-是否选择时间
    if (this.data.continueSelect) {
      if (!this.data.periodSelected) {
        Notify({
          type: 'primary',
          message: '尚未选择日期',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
        that.setData({
          submitLoading: false
        })
        return
      }
    } else {
      if (!this.data.timeSelected) {
        Notify({
          type: 'primary',
          message: '尚未选择日期',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
        that.setData({
          submitLoading: false
        })
        return
      }
    }

    //检查课程选择性
    if (this.data.selectedCourse.length == 0) {
      Notify({
        type: 'primary',
        message: '请至少选择一门课程',
        duration: 1000,
        color: '#ffffff',
        background: '#E6A23C'
      })
      that.setData({
        submitLoading: false
      })
      return
    }

    if (this.data.content == '') {
      Notify({
        type: 'primary',
        message: '请假内容不能为空',
        duration: 1000,
        color: '#ffffff',
        background: '#E6A23C'
      })
      that.setData({
        submitLoading: false
      })
      return
    }

    //异步提交
    var req = new Object()

    var that = this
    that.setData({
      submitLoading: true
    })

    if (that.data.continueSelect == true) {
      req.startTime = that.dateToString(that.data.startDate)
      req.endTime = that.dateToString(that.data.endDate)
    } else {
      req.startTime = that.dateToString(that.data.singleDate)
      req.endTime = that.dateToString(that.data.singleDate)
    }

    req.selectedList = that.data.selectedCourse
    req.type = parseInt(that.data.reqType)
    req.content = that.data.content
    req.studentId = app.globalData.userInfo.user.id
    console.log(req)

    // web提交请假单
    wx.request({
      url: serveApi.domain + '/student/note',
      data: req,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.datainit()
        that.setData({
          submitLoading: false
        })
        wx.removeStorageSync('tempReq')
        //成功提示
        Notify({
          type: 'primary',
          message: '提交成功',
          duration: 1000,
          color: '#ffffff',
          background: '#67C23A'
        })
      },
      fail(res) {
        that.setData({
          submitLoading: false
        })
        Notify({
          type: 'primary',
          message: '提交失败',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
      }
    })
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
        active: 'request'
      })
    }
  },
  // 页面显示时
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 'request'
      })
    }
  },
  onReady() {
    var that = this
    //加载缓存中的请假单数据
    wx.getStorage({
      key: 'tempReq',
      success: function (res) {
        var t1, t2, t3
        t1 = new Date(res.data.startDate)
        t2 = new Date(res.data.endDate)
        t3 = new Date(res.data.singleDate)


        that.setData({
          timeSelected: res.data.timeSelected,
          periodSelected: res.data.periodSelected,
          continueSelect: res.data.continueSelect,

          startDate: t1,
          endDate: t2,
          singleDate: t3,

          signDate: res.data.signDate,
          signPeriod: res.data.signPeriod,

          content: res.data.content,
          reqType: res.data.reqType
        })

        that.loadClass()

        that.setData({
          loading: false
        })
        Notify({
          type: 'primary',
          message: '读取本地请假单成功',
          duration: 1000,
          color: '#ffffff',
          background: '#67C23A'
        })

      },
      fail: function (res) {
        that.setData({
          loading: false
        })

        Notify({
          type: 'primary',
          message: '读取本地请假单失败',
          duration: 1000,
          color: '#ffffff',
          background: '#E6A23C'
        })
      }
    })

    var that = this
    setTimeout(function () {
      that.setData({
        show: true
      })
    }, 1000)
  }
}

Page(pageOptions)