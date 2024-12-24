import { AppRequest } from '@Render/Plugins/AppRequest';

const ToLogin = (data: Record<string, any>) => {
    return AppRequest.Post('/system/auth/login', data);
};

export { ToLogin };
