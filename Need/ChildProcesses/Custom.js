//此文件 您自定义 文件名称都可以改 我会自动运行 并且收发消息
process.send({
    message: `Custom.js 丨 Run`
});

process.on('message', (e) => {});

process.parentPort;
