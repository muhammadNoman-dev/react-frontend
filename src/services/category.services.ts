
import axios from "axios"
import { CreateCategoryInterface, DeleteCategoryInterface, GetCategoryInterface } from "../types/category.types"

const ROOT_PATH = "localhost:8081/api"


export default class CategoryService {
	static createCategory = (category: Partial<GetCategoryInterface>) => axios.post<Partial<GetCategoryInterface>>(ROOT_PATH, category)

    static updateCategory = (id: string, category: Partial<CreateCategoryInterface>) =>
    axios.put<GetCategoryInterface>(`${ROOT_PATH}/${id}`, category)

    static deleteCategory = (categotyId: DeleteCategoryInterface ) => axios.delete(`${ROOT_PATH}/${categotyId}` )
}