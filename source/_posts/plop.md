---
title: 自动化工具plop
date: 2023-03-26 18:55:44
main_color: "#c0e0e0"
tags: Infrastructure
updated: 2025-02-13 18:55:44
keywords: plop 自动化工具 module 模板
comments: true
---
<!-- title	【必需】页面标题
date	【必需】页面创建日期
type	【必需】标签、分类、关于、音乐馆、友情链接、相册、相册详情、朋友圈、即刻页面需要配置
updated	【可选】页面更新日期
description	【可选】页面描述
keywords	【可选】页面关键字
comments	【可选】显示页面评论模块(默认 true)
top_img	【可选】页面顶部图片
mathjax	【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false)
katex	【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)
aside	【可选】显示侧边栏 (默认 true)
aplayer	【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置
highlight_shrink	【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置) -->

**​​​plopjs​​​** 是一个基于node js开发的小工具，主要作用是根据模板代码生成目标代码。

## 什么是plpo

它是一个命令行工具，专门用于构建生成器，这些生成器可以帮助开发者快速生成代码模板，特别是对于大型的后台管理系统，页面很多相似的内容，重复率很高的项目，我们可以设立一个模板（列表、详情、路由等）（vue、js、css文件等），一次构建重复创建。

## 用到的文档链接
[Handlebars](https://handlebarsjs.com/zh/guide/#%E4%BB%80%E4%B9%88%E6%98%AF-handlebars%EF%BC%9F "Handlebars")
[Plop插件](https://www.npmjs.com/package/plop "Plop")
[plop](https://plopjs.com/documentation/#main-methods "plop")


## 安装

### 1.将plop添加到您的项目
```bash
npm install plop -D
```

### 2.创建入口文件
``` javascript
// plop 的入口文件 plopfile.js
    // 需要导出一个函数，函数接收一个plop对象，用于创建生成器任务
	import { promises as fs } from 'node:fs'
	
	export default async function (plop) { //导出一个默认函数-异步
  	plop.setWelcomeMessage('请选择需要创建的模式：') // 设置欢迎消息
  	const items = await fs.readdir('./plop-templates')  // 获取plop-templates文件夹下的所有文件
  	for (const item of items) {
    	const stat = await fs.lstat(`./plop-templates/${item}`) //使用 fs.lstat 方法获取 plop-templates 文件夹中每个元素的状态（文件或目录），并将结果存储在 stat 变量中。
    	if (stat.isDirectory()) { //判断 stat 对象是否表示一个目录。如果是目录，则执行后续代码。
     	 const prompt = await import(`./plop-templates/${item}/prompt.js`) //
    	  plop.setGenerator(item, prompt.default)  //循环设置生成器
   	 }
 	 }
	}
```

![1736406539445](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=56bd3f7a512246aea259ec54ba1e9ce4.png&path=mdrichtext.picture.&name=1736406539345.png)

plop-templates文件夹下的文件夹必须得有prompt.js,要不然执行会报错，上面判断了只有文件夹才会设置生成器
别的文件不会设置

### 3.添加命令

在package.json中添加命令

![1736409976741](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=fd77f1442f084a7f840334b80872af8a.png&path=mdrichtext.picture.&name=1736409976468.png)

##### 注意，这里添加完，记得看一下package.json的type是不是module。因为我采用的是es的module模块，并不是 CommonJS。 
``` javascript
  	//package.json中添加
	"type": "module"
```

## 添加模板

### 1.在根目录下创建 plop-templates 文件夹
![1736410929950](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=77fb4c159c8a472ca912522486aae68d.png&path=mdrichtext.picture.&name=1736410929905.png)

### 2.在plop-templates文件夹下创建所需要的模板

![1736411002807](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=5d8a55202aa24e26a509eee226c4b88c.png&path=mdrichtext.picture.&name=1736411002772.png)

这里创建了3种模板

### 3.hbs模板
 在对应的文件夹下创建hbs模板（Handlebars模板语法）
 
 ![1736411289400](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=3966a738146e43448151377ccc10a0ae.png&path=mdrichtext.picture.&name=1736411289348.png)
 
``` javascript
{{#if isFilesystem}}
<route lang="yaml">
meta:
  title: 页面标题
</route>

{{/if}}
<script setup lang="ts">
defineOptions({
  name: '{{ properCase componentName }}',
})
</script>

<template>
  <div>
    <!-- 布局 -->
  </div>
</template>

<style scoped>
/* 样式 */
</style>

```

### 4.创建对应的生成器文件

``` javascript
import fs from 'node:fs'
import path from 'node:path'

function getFolder(path) {
  const components = []
  const files = fs.readdirSync(path)

  files.forEach((item) => {
    console.log('item',item)
    const stat = fs.lstatSync(`${path}/${item}`)
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`)
      components.push(...getFolder(`${path}/${item}`))
    }
  })
  return components
}

export default {
  description: '创建页面',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder('src/views'),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v) => {
        if (!v || v.trim === '') {
          return '文件名不能为空'
        }
        else {
          return true
        }
      },
    },
    {
      type: 'confirm',
      name: 'isFilesystem',
      message: '是否为基于文件系统的路由页面',
      default: false,
    },
    {
      type: 'confirm', // 问题的类型
      name: 'hasDetail', // 问题对应得到答案的变量名，可以在actions中使用该变量
      message: '是否需要详情抽屉：', // 在命令行中的问题
      default: true // 问题的默认答案
    },
  ],
  actions: (data) => {
    const relativePath = path.relative('src/views', data.path)
    const actions = [
      {
        type: 'add', // 操作类型，这里是添加文件
        path: `${data.path}/{{dotCase name}}.vue`,// 模板生成的路径
        templateFile: 'plop-templates/page/index.hbs',
        data: {
          componentName: `${relativePath} ${data.name}`,
        },
      },

    ]
    if (data.hasDetail) {
      actions.push({
        type: 'add',
        path: `${data.path}/detail.vue`, // 模板生成的路径
        templateFile: 'plop-templates/page/detail.hbs', // 模板的路径
        data: {
          componentName: `${relativePath} ${data.name}`,
        },
      })
    }
    return actions
  },
}

```

##### 前期准备工作已经基本完成

##### 现在可以在控制台执行命令了

![1736412326108](https://data.metchain.com/DCP/fileupload/downloadfile.htm?id=e6bdeb180dba423f8607eb65aec2bfa2.png&path=mdrichtext.picture.&name=1736412326031.png)



``` javascript
import fs from 'node:fs';
import path from 'node:path';

function getFolder(path) {
  const components = [];
  const files = fs.readdirSync(path);

  files.forEach((item) => {
    const stat = fs.lstatSync(`${path}/${item}`);
    if (stat.isDirectory() === true && item !== 'components') {
      components.push(`${path}/${item}`);
      components.push(...getFolder(`${path}/${item}`));
    }
  });
  return components;
}

export default {
  description: '创建页面',
  prompts: [
    {
      type: 'list',
      name: 'path',
      message: '请选择页面创建目录',
      choices: getFolder('src/views'),
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入文件名',
      validate: (v) => {
        if (!v || v.trim() === '') {
          return '文件名不能为空';
        } else {
          return true;
        }
      },
    },
    {
      type: 'confirm',
      name: 'isFilesystem',
      message: '是否为基于文件系统的路由页面',
      default: false,
    },
    {
      type: 'confirm',
      name: 'hasDetail',
      message: '是否需要详情抽屉：',
      default: true,
    },
  ],
  actions: (data) => {
    const relativePath = path.relative('src/views', data.path);
    const actions = [
      {
        type: 'add',
        path: `${data.path}/{{dotCase name}}.vue`,
        templateFile: 'plop-templates/page/index.hbs',
        data: {
          componentName: `${relativePath} ${data.name}`,
        },
      },
    ];

    if (data.hasDetail) {
      actions.push({
        type: 'add',
        path: `${data.path}/detail.vue`,
        templateFile: 'plop-templates/page/detail.hbs',
        data: {
          componentName: `${relativePath} ${data.name}`,
        },
      });
    }

    // 添加 modify 操作
    actions.push({
      type: 'modify',
      path: 'src/router/index.js',
      pattern: /const routes = \[/,
      template: `const routes = [\n  $1  {\n    path: '/${data.name}',\n    name: '${data.name}',\n    component: () => import('../views/${relativePath}/${data.name}.vue'),\n  },`,
    });

    return actions;
  },
};
```