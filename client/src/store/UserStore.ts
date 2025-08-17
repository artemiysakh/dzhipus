import { IUser } from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";


export default class UserStore{
    
    user = {} as IUser
    isAuth = false
    isLoading = false;
    errors = '';
    
    constructor(){
        makeAutoObservable(this)
    }
    
    setAuth(bool: boolean){
        this.isAuth = bool;
    }
    setUser(user: IUser){
        this.user = user
    }
    setLoading(bool: boolean){
        this.isLoading = bool;
    }
    setErrors(str: string){
        this.errors = str;
    }
    
   async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setErrors('')
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrors(e.response?.data?.message || 'Ошибка авторизации')
        }
    }
    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setErrors('')
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrors(e.response?.data?.message) 
            
        }
    }
    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            this.setErrors('');
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrors(e.response?.data?.message);
        }
    }
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {withCredentials: true});
           
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.setErrors('');
        } catch (e: any) {
            console.log(e.response?.data?.message);
            this.setErrors(e.response?.data?.message);
        } finally{
            this.setLoading(false);
        }
    }
}


