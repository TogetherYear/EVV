const { ipcRenderer } = require("electron")
// const fs = require("fs")

window.Renderer = {
    widget: {
        id: -1
    },
    ipcRenderer: ipcRenderer,
    Screenshot: () => {
        return new Promise((resolve, reject) => {
            ipcRenderer.invoke('Tool:Screenshot').then(buffer => {
                // setTimeout(() => {
                //     fs.writeFile('文件位置/文件名.png', buffer, (err) => {
                //         if (err) throw err;
                //         console.log('The file has been saved!');
                //     });
                // }, 2000);
                resolve(buffer)
            })
        })
    }
}