import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../services/index";
import { AppThunk, RootState } from "./index";
import { ProfileInterface, LoginInterface, SigupInterface } from "../types/auth.types";
import { apiConfig } from "../config";

export interface AuthStateInterface {
	authDone: boolean;
	accessToken: string;
	user: ProfileInterface | null;
	loading: boolean;
}

const initialState: AuthStateInterface = {
	accessToken: "",
	user: null,
	authDone: false,
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggingIn: state => {
			state.loading = true;
		},
		loggedIn: (state, action: PayloadAction<ProfileInterface>) => {
			state.accessToken = action.payload.token;
			state.user = action.payload;
			state.loading = false;
			state.authDone = true;
		},
		loggingInFailed: state => {
			state.user = null;
			state.loading = false;
		},
		clearAuthState: state => {
			state.authDone = false;
			state.accessToken = "";
			state.user = null;
			state.loading = false;
		},

	},
});

// REDUCER
export default authSlice.reducer;

const { loggedIn, loggingIn, loggingInFailed, clearAuthState } =
	authSlice.actions;

const signup = ( credentials: SigupInterface ) : AppThunk => async dispatch => {
	 await authService.signup(credentials);
}

const login =
	(credentials: LoginInterface ): AppThunk =>
	async dispatch => {
		try {
			dispatch(loggingIn());
			const { data: loginResponse } = await authService.login(credentials);
			const profileResponse = await reLogin(loginResponse.token);
			dispatch(loggedIn({ ...loginResponse, ...profileResponse }));
		} catch (error) {
			dispatch(loggingInFailed());
		}
	};

const logout = (): AppThunk => async dispatch => {
	authService.logout();
	dispatch(clearAuthState());
};

const reLogin = async (token: string) => {
	authService.setAuthToken(token);
	apiConfig.setAuthToken(token);
	const { data: profileResponse } = await authService.getProfile();
	return profileResponse;
};


const fetchUserProfile = (): AppThunk => async dispatch => {
	const token = authService.getAuthToken();
	if (token)
		try {
			dispatch(loggingIn());
			const profileResponse = await reLogin(token);
			dispatch(loggedIn(profileResponse));
		} catch (error) {
			dispatch(loggingInFailed());
		}
};


const selectAuthState = (state: RootState) => state.auth;
const selectCurrentUser = () => (state: RootState) => selectAuthState(state).user;
const selectLoadingAuth = () => (state: RootState) => selectAuthState(state).loading;
const selectInitialAuthDone = () => (state: RootState) => selectAuthState(state).authDone;
const selectAccessToken = () => (state: RootState) => selectAuthState(state).accessToken;
const selectSignedIn = () => (state: RootState) => selectAccessToken()(state) && selectInitialAuthDone()(state);


export {
	login,
	logout,
	signup,
	selectAuthState,
	selectCurrentUser,
	selectLoadingAuth,
	selectInitialAuthDone,
	selectAccessToken,
	selectSignedIn,
	fetchUserProfile
};
