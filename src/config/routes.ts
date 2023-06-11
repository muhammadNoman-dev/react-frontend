export enum APP_ROUTES {
	AUTH = "auth",
	LOGIN = "login",
	SIGNUP = "signup",
	DASHBOARD = "dashboard",

}


export const getLoginPageRoute = () => `/${APP_ROUTES.AUTH}/${APP_ROUTES.LOGIN}`;
export const getSignupPageRoute = () => `/${APP_ROUTES.AUTH}/${APP_ROUTES.SIGNUP}`;
export const getDashboardMainPageRoute = () => `/${APP_ROUTES.DASHBOARD}`;
