
import axios from "axios"
import { CreateCarInterface, GetCarInterface,DeleteCarInterface } from "../types/car.types"


const ROOTPATH="cars"


export default class CarService {
	static createCar = (car: Partial<GetCarInterface>) => axios.post<Partial<GetCarInterface>>(`${ROOTPATH}`, car)

    static updateCar = (id: string, car: Partial<CreateCarInterface>) =>
    axios.put<GetCarInterface>(`${ROOTPATH}/${id}`, car)

    static getCars = () => axios.get(`${ROOTPATH}`)

    static deleteCar = (carId: DeleteCarInterface | string ) => axios.delete(`${ROOTPATH}/${carId}` )
}