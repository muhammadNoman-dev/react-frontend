import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  categoryService } from "../services/index";
import { AppThunk, RootState } from "./index";
import { DeleteCategoryInterface, GetCategoryInterface } from "../types/category.types";
import { deleteCarSuccess } from "./car.slice";

export interface CategoryStateInterface {
	list: GetCategoryInterface[]
	loading: boolean
	saving: boolean
	newDetail: null | GetCategoryInterface
}

const initialState: CategoryStateInterface = {
	list: [],
	loading: false,
	saving: false,
	newDetail: null 
};

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
        requestCategories: category => {
			category.loading = true
		},
		receiveCategories: (category, action: PayloadAction<GetCategoryInterface[]>) => {
			category.loading = false
			category.list = action.payload
		},
		receiveCategoriesFailed: category => {
			category.loading = false
		},
        requestSavingCategory: categoryData => {
			categoryData.saving = true
		},
        savingCategorySuccess: (category, action: PayloadAction<GetCategoryInterface>) => {
			category.saving = false
			const Updated = category.list?.find(e => e._id === action.payload._id) as GetCategoryInterface
            if(Updated){
                const categoryIndex = category.list.findIndex((list) => list._id === action.payload._id )
                category.list.splice(categoryIndex,1,action.payload)
            }else category.list.unshift(action.payload)
		},
        savingFailed:( category,action:PayloadAction) =>{
            category.saving= false
        },
        deleteCategorySuccess: (category, action)=>{
            const categoryIndex = category.list.findIndex((list) => list._id === action.payload._id )
            if (categoryIndex >= 0) {
				category.list.splice(categoryIndex,1)
			}
        }


	},
});

// REDUCER
export default categorySlice.reducer;

const { requestSavingCategory,savingCategorySuccess,receiveCategoriesFailed, savingFailed, deleteCategorySuccess, requestCategories,receiveCategories  } =
	categorySlice.actions;

const getCategory =():AppThunk => async dispatch => {
	try {
		dispatch(requestCategories())
		const { data: categoryResponse } = await categoryService.getCategories()
		dispatch(receiveCategories(categoryResponse))
	} catch (error) {
		dispatch(receiveCategoriesFailed())
	}
} 


const saveCategory =(
    categoryData: Partial<GetCategoryInterface>,
	): AppThunk =>
	async dispatch => {
		let data = null
		try {
			dispatch(requestSavingCategory())
			if (categoryData?._id) {
				data = await categoryService.updateCategory(categoryData._id, categoryData)
			} else {
				data = await categoryService.createCategory(categoryData)
			}
			const { data: categoryResponse } = data
			dispatch(savingCategorySuccess(categoryResponse as GetCategoryInterface))
		} catch (error) {
			dispatch(savingFailed())
		}
	}

    const deleteCategory =(id:DeleteCategoryInterface | string ):AppThunk => async dispatch => {
        try {
            const response = await categoryService.deleteCategory(id)
			const {data} = response
            dispatch(deleteCategorySuccess(data))
			data.deletedCarsIds.forEach((id: string) => {
				dispatch(deleteCarSuccess(id))
			})
        } catch (error) {
            console.log("failed delete")
        }
    }


const selectCategoryState = (state: RootState) => state.category;
const selectCategoryList = () => (state: RootState) => selectCategoryState(state).list;


export {
	saveCategory,
	getCategory,
    deleteCategory,
	selectCategoryList
};
