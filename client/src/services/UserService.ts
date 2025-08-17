import $api from '../http'
import {AxiosResponse} from 'axios'
import { IUser } from '../models/IUser'

export default class UserService{
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return $api.get<IUser[]>('/user/users')
    }
    static async makeAdmin(userId: string): Promise<IUser>{
         const { data } = await $api.post<IUser>(`/user/users/makeAdmin`,{ userId });
         return data
    }
   static async resendActivation(userId: string): Promise<{ success: boolean; email: string }> {
    const { data } = await $api.post<{ 
        success: boolean;
        email: string;
    }>('/user/users/resend-activation', { userId });
    return data;
}
}

