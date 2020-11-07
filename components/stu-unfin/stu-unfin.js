// components/stu-unfin.js
import Dialog from '@vant/weapp/dialog/dialog';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeNames: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collChange(event) {
      this.setData({
        activeNames: event.detail
      })
    }
  }
})
