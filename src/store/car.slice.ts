import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { carService } from "../services/index";
import { AppThunk, RootState } from "./index";
import { DeleteCarInterface, GetCarInterface } from "../types/car.types";

export interface CategoryStateInterface {
	list: GetCarInterface[]
	loading: boolean
	saving: boolean
	newDetail: null | GetCarInterface
}

const initialState: CategoryStateInterface = {
	list: [],
	loading: false,
	saving: false,
	newDetail: null
};

const carSlice = createSlice({
	name: "car",
	initialState,
	reducers: {
		requestCars: car => {
			car.loading = true
		},
		receiveCars: (car, action: PayloadAction<GetCarInterface[]>) => {
			car.loading = false
			car.list = action.payload
		},
		receiveCarsFailed: car => {
			car.loading = false
		},
		requestSavingCar: carData => {
			carData.saving = true
		},
		savingCarSuccess: (car, action: PayloadAction<GetCarInterface>) => {
			car.saving = false
			const Updated = car.list?.find(e => e._id === action.payload._id) as GetCarInterface
			if (Updated) {
				const CarIndex = car.list.findIndex((list) => list._id === action.payload._id)
				car.list.splice(CarIndex, 1, action.payload)
			} else car.list.unshift(action.payload)
		},
		savingFailed: (car, action: PayloadAction) => {
			car.saving = false
		},
		deleteCarSuccess: (car, action) => {
			const CarIndex = car.list.findIndex((list) => list._id === action.payload.id)
			car.list.splice(CarIndex, 1)
		}


	},
});

// REDUCER
export default carSlice.reducer;

export const { requestSavingCar, savingCarSuccess, receiveCarsFailed, savingFailed, deleteCarSuccess, requestCars, receiveCars } =
	carSlice.actions;

const getCar = (): AppThunk => async dispatch => {
	try {
		dispatch(requestCars())
		const { data: carResponse } = await carService.getCars()
		dispatch(receiveCars(carResponse))
	} catch (error) {
		dispatch(receiveCarsFailed())
	}
}


const saveCar = (
	carData: Partial<GetCarInterface>,
): AppThunk =>
	async dispatch => {
		let data = null
		try {
			dispatch(requestSavingCar())
			if (carData?._id) {
				data = await carService.updateCar(carData._id, carData)
			} else {
				data = await carService.createCar(carData)
			}
			const { data: CarResponse } = data
			dispatch(savingCarSuccess(CarResponse as GetCarInterface))
		} catch (error) {
			dispatch(savingFailed())
		}
	}

const deleteCar = (id: DeleteCarInterface | string): AppThunk => async dispatch => {
	try {
		const response = await carService.deleteCar(id)
		const { data } = response
		dispatch(deleteCarSuccess(data._id))
	} catch (error) {
		console.log("failed delete")
	}
}


const selectCarState = (state: RootState) => state.car;
const selectCarList = () => (state: RootState) => selectCarState(state).list;


export {
	saveCar,
	getCar,
	deleteCar,
	selectCarList
};
