let current = 0

setInterval(() => {
    process.parentPort.postMessage(`Log.js 丨 ${current}`)
    current++
}, 5000);