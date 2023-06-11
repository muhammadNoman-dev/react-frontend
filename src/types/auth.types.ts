
export interface LoginInterface {
	email: string;
	password: string;
}

export interface SigupInterface {
    email: string;
}

export interface ProfileInterface {
	token: string;
	_id: string;
	firstName?: string;
	lastName?: string;
	email: string;
}
