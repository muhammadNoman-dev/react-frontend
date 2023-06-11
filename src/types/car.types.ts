export interface CreateCarInterface {
	category: string;
	color: string;
	make: string;
	model: string;
	registrationNumber: string;
}

export interface GetCarInterface {
	_id: string;
    category: string;
	color: string;
	make: string;
	model: string;
	registrationNumber: string;
}

export interface DeleteCarInterface {
	id: string;
}

