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

在渲染进程我没有配置 node 我只配置了 electron 也就是渲染进程可以 import 出 electron 的模块 而 node 不行 你只能 require 因为我不推荐使用 所以我也就没有配置
```

```
如果你在主进程使用自己安装的模块想要使用 import 去 script/build-main.ts 中的 external 添加额外的模块 ( 在 'electron' 后面接着写 )
```

```
环境变量 electron 在 Need/Configs 中配置 .env.development 和.env.production 是前端页面使用的 前端页面使用的变量添加后在 env.d.ts 中添加说明确保有代码提示
```