import axios, { AxiosError, AxiosResponse } from "axios";
import env from "./env"

axios.defaults.baseURL = env.apiRoot;

axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		console.error(error);
		return Promise.reject(error);
	}
);

export const setAuthToken = (token: string) => {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
