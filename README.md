##### 校园请假系统

使用微信小程序和vant组件库搭建

##### 项目部署

1. 安装对应依赖

```
npm install
```

2. 在微信开发者工具中配置**自己的**测试号appID
3. 在`utils/serveAPI.js`中配置**自己的**域名

##### 使用说明

1. 小程序自动在开始前调用`wx.login()`拉取code并发送到后端进行验证，根据结果自动保存登陆信息或跳转到认证界面（认证功能**未实现**，待调试使用）
2. 如果已经认证则直接进入相应页面
3. 清除缓存可以清除保存的登陆状态
4. 接口配置按照对应的fastmock平台上的借口配置
5. 调试可自己加入`console.log()`代码查看接口调用结果

