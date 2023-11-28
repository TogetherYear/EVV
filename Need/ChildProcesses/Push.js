let current = 0

setInterval(() => {
    process.parentPort.postMessage({
        type: 'Push',
        message: `Log.js 丨 ${current}`
    })
    current++
}, 5000);