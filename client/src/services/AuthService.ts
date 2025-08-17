import $api from '../http'
import {AxiosResponse} from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'
import { PasswordResetResponse } from '../models/response/PasswordResetResponse'

export default class AuthService{
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/user/login', {email, password})
    }
    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/user/registration', {email, password})
    }
    static async logout(): Promise<void>{
        return $api.post('/user/logout')
    }
    static async checkAdmin(): Promise<{ isAdmin: boolean }>{
        const response = await $api.get('/user/checkAdmin');
        return response.data;
    }

    static async forgotPassword(email: string): Promise<AxiosResponse<PasswordResetResponse>>{
        return $api.post<PasswordResetResponse>('/user/forgot-password', { email });
    }
    static async resetPassword(token: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/user/reset-password', {resetToken: token, newPassword: password}
    );
}

}

