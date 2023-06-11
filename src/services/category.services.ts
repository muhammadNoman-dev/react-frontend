
import axios from "axios"
import { CreateCategoryInterface, DeleteCategoryInterface, GetCategoryInterface } from "../types/category.types"

const ROOTPATH= "categories"


export default class CategoryService {
	static createCategory = (category: Partial<GetCategoryInterface>) => axios.post<Partial<GetCategoryInterface>>(`${ROOTPATH}`, category)

    static updateCategory = (id: string, category: Partial<CreateCategoryInterface>) =>
    axios.put<GetCategoryInterface>(`categories/${id}`, category)

    static getCategories = () => axios.get(`${ROOTPATH}`)

    static deleteCategory = (categotyId: DeleteCategoryInterface | string ) => axios.delete(`${ROOTPATH}/${categotyId}` )
}