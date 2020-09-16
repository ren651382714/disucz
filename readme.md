# 使用HBuilderX构建Discuz! Q前端

## 平台兼容性说明

本项目现支持发行为微信小程序和H5

## 使用方法
### 1. 安装Discuz! Q

在使用Discuz! Q小程序之前，请先安装好你的Discuz! Q，具体方法请[点击这里](https://discuz.com/docs/install.html)，查看安装文档。

### 2. 准备HBuilderX

* 安装HbuilderX
* 安装uni-app编译插件
* 点击[这里](https://ext.dcloud.net.cn/plugin?name=compile-node-sass)，点击『使用HBuilderX导入插件』，安装sass编译插件

### 3. 准备小程序开发工具

启动微信开发者工具，打开工具 -> 设置 -> 安全设置，将服务端口开启。

### 4. 修改配置，指向自己的服务器

修改 `common/const.js` 文件中的以下两行：
```javascript
export const DISCUZ_TITLE = "设置为自己小程序的标题";
let host = "设置为自己Discuz! Q的访问地址，比如https://discuz.chat/";
```

### 发行

可发行为微信小程序和H5。H5请上传到自己的Discuz! Q服务器上，覆盖原public目录下的index.html和static目录。