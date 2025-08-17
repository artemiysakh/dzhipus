import Admin from "./pages/Admin";
import {ADMIN_ROUTE,LOGIN_ROUTE, SERVICE_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, FORGOT_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import ServicePage from "./pages/ServicePage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    
]
export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SERVICE_ROUTE + '/:typeName',
        Component: ServicePage
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotPassword
    },
    {
        path: RESET_PASSWORD_ROUTE + '/:token',
        Component: ResetPassword
    }
]