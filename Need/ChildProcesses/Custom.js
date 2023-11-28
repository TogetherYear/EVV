//此文件 您自定义 文件名称都可以改 我会自动运行 并且收发消息 ( 内置代码请勿删除 )
process.parentPort.postMessage({
    message: `Custom.js 丨 Run`
})

process.parentPort.on('message', (e) => {
    /**
     * e.data 为数据 类型为 { message: string, [key: string]: any }
     */
})