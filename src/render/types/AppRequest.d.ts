import { AxiosRequestConfig, AxiosResponse } from "axios";

declare namespace AppRequest {
    export function ResetAccount(): void;

    export function GetAuthToken(): string;

    export function SetAuthToken(token: string): void;

    export function GetUserName(): string;

    export function SetUserName(name: string): void;

    export function GetRemember(): boolean;

    export function SetRemember(b: boolean): void;

    export function Get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;

    export function Post(url: string, data?: Record<any, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;

}