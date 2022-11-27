import { EventSystem } from "@libs/EventSystem"
import axios, { AxiosInstance } from "axios";
import router from "@render/router"

/**
 * Axios请求
 */
class AppRequest extends EventSystem {
    private constructor() { super() }

    private static instance = new AppRequest()

    public static get Instance() { return this.instance }

    private request: AxiosInstance | null = null

    public get R() { return this.request }

    private static isLogSuccess = false

    private static outCode = 401

    public Run() {
        this.request = axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        })
        this.SetRequest()
        this.SetResponse()
    }

    private SetRequest() {
        this.R?.interceptors.request.use(
            config => {
                if (config && config.headers) {
                    config.headers['x-auth-token'] = this.GetAuthToken()
                    config.baseURL = import.meta.env.VITE_APP_SERVER_PORT
                    return config
                }

            },
            error => {
                return Promise.reject(error)
            },
        )
    }

    private SetResponse() {
        this.R?.interceptors.response.use(
            response => {
                if (AppRequest.isLogSuccess) {
                    console.info('URL: ' + response.config.baseURL + response.config.url, '\nData: ', response.data, '\nResponse:', response)
                }
                if (response.data.code && response.data.code !== 0) {
                    console.error(response.data.message)
                    Message.error(response.data.message)
                }
                return response
            },
            err => {
                // console.log(err.config)
                // console.log(err.response)
                if (err.response?.status == AppRequest.outCode) {
                    Dialog.destroyAll()
                    Dialog.error({
                        title: 'Token过期',
                        content: '请重新登录更新Token',
                        positiveText: '确定',
                        closable: false,
                        maskClosable: false,
                        onPositiveClick: () => {
                            this.ResetAccount()
                            router.push({ path: '/Login' })
                            setTimeout(() => {
                                location.reload()
                            }, 100);
                        }
                    })
                }
                return Promise.reject(err)
            },
        )
    }

    private ResetAccount() {
        this.SetAuthToken('')
        this.SetUserName('')
        this.SetWorkSpaceId('')
    }

    public GetAuthToken() {
        return localStorage.getItem('ELECTRONTOKEN') || ''
    }

    /**
     * 设置Token
     */
    public SetAuthToken(token: string) {
        localStorage.setItem('ELECTRONTOKEN', token)
    }

    public GetWorkSpaceId() {
        return localStorage.getItem('ELECTRONWORKSPACEID') || ''
    }

    public SetWorkSpaceId(id: string) {
        localStorage.setItem('ELECTRONWORKSPACEID', id)
    }

    public GetUserName() {
        return localStorage.getItem('ELECTRONUSERNAME') || ''
    }

    public SetUserName(name: string) {
        localStorage.setItem('ELECTRONUSERNAME', name)
    }

    public Get(url: string, config: {} = {}) {
        if (this.R) {
            return this.R.get(url, config)
        }
    }

    public Post(url: string, data: {} = {}, config: {} = {}) {
        if (this.R) {
            return this.R.post(url, data, config)
        }
    }
}

export { AppRequest }