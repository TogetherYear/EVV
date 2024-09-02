## Vue 3 + Typescript + Electron + Vite + ( ...args )

## 只有最基本的结构 其他发挥你自己的想法

### 安装

```
npm install
```

### 开发

```
npm run dev
```

### 打包

```
npm run build
```

### 额外说明

```
需要底层操作的通过 Ipc 发送给主进程去处理 别用渲染进程处理 ( 为了逻辑清晰 当然不强求 )

在渲染进程我没有配置 node 和 electron 的方法 ( 别用 ) 在主进程用 preload 暴露方法给渲染进程用 ( 在渲染进程自己填写类型说明 在 Renderer.d.ts )
```

```
环境变量 electron 在 Need/Configs 中配置 .env.development 和.env.production 是前端页面使用的 前端页面使用的变量添加后在 env.d.ts 中添加说明确保有代码提示
```

```
只适配 windows 其他暂不考虑
```

```
默认打包后本地服务器端口是 8676 可修改 避免重复
```

```
在 dependencies 只写入需要编译成 exe 额外的包 比如 .node 等无法打包的库 其余皆写入 devDependencies
```
