import axios from "axios";
import { ProfileInterface, LoginInterface, SigupInterface } from "../types/auth.types";

const ROOT_PATH = "auth";

export default class AuthService {
	static login = (credentials: LoginInterface) => axios.post<ProfileInterface>(`localhost:8081/api/auth/login`, credentials);

	static signup = (credentials:SigupInterface ) => axios.post<ProfileInterface>(`localhost:8081/api/auth/signup`, credentials);

	static getProfile = () => axios.get<ProfileInterface>(`${ROOT_PATH}/profile`);

	static setAuthToken = (token: string) => localStorage.setItem("token", token);

	static getAuthToken = (): string => localStorage.getItem("token") || "";

	static logout = () => localStorage.clear();
}
