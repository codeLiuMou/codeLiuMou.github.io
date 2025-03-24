---
title: vite-plugin-vue-devtools
date: 2023-03-26 18:55:44
main_color: "#c0e0e0"
tags: Infrastructure
updated: 2025-02-13 18:55:44
keywords: vite-plugin-vue-devtools 插件
---
# vite-plugin-vue-devtools


## 前言
之前的版本工具webpack使用的是浏览器的插件vue-devtools，可能大家都不陌生，但是有些同学由于网络问题无法下载安装插件，所以今天给大家推荐一款更好用的插件 vite-plugin-vue-devtools，无需浏览器安装。

vite - plugin - vue - devtools 是一个 Vite 插件。
Vite 是一个现代化的前端构建工具，而这个插件是为了在 Vite 构建的 Vue 项目中更好地集成 Vue Devtools 而开发的。


## 功能与作用
它能够确保在 Vite 项目中，Vue Devtools 能够快速、准确地连接到应用程序。在 Vite 的热更新（HMR）过程中，及时地将组件状态更新等信息反馈给 Vue Devtools，使得开发者在使用 Vue Devtools 进行调试时，能够实时观察到组件数据和状态的最新变化。

当使用 Vite 构建 Vue 应用时，该插件有助于解决一些可能出现的兼容性问题，保证 Vue Devtools 在 Vite 环境下可以顺利地查看组件的 props、data、computed 属性等各种信息。例如，它可以帮助调整 Vite 开发服务器与 Vue Devtools 之间的通信方式，使得在开发过程中能够更加顺畅地利用 Vue Devtools 进行诸如检查组件树结构、监听组件事件等操作。

## 安装
```javascript
 pnpm add vite-plugin-vue-devtools -D
```
 由于vite插件可以通过pnpm，npm等安装，所以也可以全局安装，这里我们只针对我们现有的项目，做项目的安装，只需要本地调试。
 然后，将内容天假到vite.config.ts文件中。
 由于项目略有不同，现在就只以运营侧为基准。
 
 ```javascript
打开 /build/plugins.ts

//引入
import VueDevTools from 'vite-plugin-vue-devtools'

并添加到 plugins 中
```
如下图

![1735557247666](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=b2ec23be4a914eaebff715d0de784fbc.png&path=mdrichtext.picture.&name=1735557247554.png)

启动成功后会发现多了 vue-devtools
http://localhost:8848/__devtools__/ 这个地址可以在单独的浏览器中打开调试工具

![1735560009746](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=7c38cdef11ef48ec89c73d36add17d3a.png&path=mdrichtext.picture.&name=1735560009053.png)

就是这样！当你用pnpm dev运行应用程序时，你应该在页面底部看到一个小按钮，当你点击它时，它会展开dev tools页面：
展示应用程序的快速概览，扩展应用正在使用的 **vue 版本**、**页面**和**组件数量**。

![1735557492218](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=aaa8e711f8b94c34b8ec2dee8041d30b.png&path=mdrichtext.picture.&name=1735557492099.png)

页面数量和组件数量可变的，当你未登录，点开查看的是未登录的数量，登陆以后获取动态路由，显示的则是获取后的页面数量和组件数量


### 组件 components
Components 展示了你在应用程序使用的组件和它们的层级关系。你可以选中相应的组件来查看它的详细信息(例如 data、props 等)。

![1735557994737](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=8d53188d7a4c42c6a98c3d1de4171fee.png&path=mdrichtext.picture.&name=1735557994527.png)

### 页面 pages
Pages 展示了当前注册的路由并且提供了一个快捷的方式进行路由导航。

对于动态路由，它还提供了一个表单来交互式地填写每个参数。

你还可以在搜索框输入指定的路径来匹配相应的路由。

![1735558333016](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=d088f06e48a14f18a194c6fe7c56d534.png&path=mdrichtext.picture.&name=1735558332874.png)

###  时间线 timeline
这里可以看到鼠标，按键，组件事件，性能
![1735559301278](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=5e1c81cec0ac4d1a9958a8be98302659.png&path=mdrichtext.picture.&name=1735559301026.png)

### 资源 Assets
Assets 展示了你的静态资源列表(目前只展示 Vite config.publicDir 目录下资源)以及它们的详细信息，你可以在浏览器打开或下载它们。 还可以查看静态资源的内容，路径，大小，下载
![1735559355537](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=3e5633c9dc7c45618b8d59512cf91e4c.png&path=mdrichtext.picture.&name=1735559355376.png)

### 路由 routes
Routes 是一个与 Vue Router 进行集成的功能，它允许你查看你所注册的路由及相关详细信息。

![1735559688982](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=1999c68cdefb46e0a61345c7bb17d803.png&path=mdrichtext.picture.&name=1735559688860.png)

### 状态管理 pinia 
Pinia 是一个与 Pinia 进行集成的功能，它允许你查看你所注册的模块及相关详细信息。
![1735559736188](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=734a2115fd4d4740bea86c0372fcec20.png&path=mdrichtext.picture.&name=1735559736080.png)

### 依赖图 Graph
Graph 提供了显示组件之间关系的依赖视图。

![1735560273788](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=67e45c38a1024fc9af7a97142aeac18a.png&path=mdrichtext.picture.&name=1735560273539.png)

### 审视 Inspect
Inspect 集成了 Vite -plugin- Inspect，允许你检查 Vite 的转换步骤。了解每个插件如何转换你的代码并发现潜在问题是很有帮助的。
![1735560468955](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=de1ddb477f3f4f9bbda09c898c7a2aff.png&path=mdrichtext.picture.&name=1735560468804.png)

### Toggle Components Inspector
你也可以使用 Inspector 特性来检查 DOM 树，看看是哪个组件在渲染它。单击以转到特定行的编辑器。使更改更容易，而不需要彻底了解项目结构。

如果想要单独使用此功能，可以直接安装 vite-plugin-vue-inspector 

此功能，在箭头所指位置，点击可以直接跳转当前点击的组件并在编辑器中打开。 （前提：正确安装，并且路径正确的情况下）
![1735560776391](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=b26f634089f84d748b2ba7b2cf1fd3e3.png&path=mdrichtext.picture.&name=1735560776315.png)

有了以上这些功能，都大大提高了调试速度。以上这些功能，大都是可以单独安装的。

例如：Vite-plugin-Inspect， vite-plugin-inspect 等

如果想单独使用某个功能，直接单独安装即可

注意： 

  插件仅作用域开发模式  安装时添加 -D
  仅支持Vue3.0+
  目前仅支持单实例Vue应用


