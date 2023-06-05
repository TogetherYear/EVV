function Electron() {
    window.process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
}

export { Electron }