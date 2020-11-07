// components/tea-unfin/tea-unfin.js
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
    activeName: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      this.setData({
        activeName: event.detail
      });
    },
    refuse() {
      this.triggerEvent('refuse', {})
    },
    agree() {
      this.triggerEvent('agree', {})
    }
  }
})
