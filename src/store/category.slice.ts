import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  categoryService } from "../services/index";
import { AppThunk, RootState } from "./index";
import { DeleteCategoryInterface, GetCategoryInterface } from "../types/category.types";

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
			const Updated = category.list?.find(e => e.id === action.payload.id) as GetCategoryInterface
            if(Updated){
                const categoryIndex = category.list.findIndex((list) => list.id === action.payload.id )
                category.list.splice(categoryIndex,1,action.payload)
            }else category.list.unshift(action.payload)
		},
        savingFailed:( category,action:PayloadAction) =>{
            category.saving= false
        },
        deleteCategorySuccess: (category, action:PayloadAction<DeleteCategoryInterface>)=>{
            const categoryIndex = category.list.findIndex((list) => list.id === action.payload.id )
            category.list.splice(categoryIndex,1)
        }


	},
});

// REDUCER
export default categorySlice.reducer;

const { requestSavingCategory,savingCategorySuccess, savingFailed, deleteCategorySuccess  } =
	categorySlice.actions;

const saveCategory =(
    categoryData: Partial<GetCategoryInterface>,
	): AppThunk =>
	async dispatch => {
		let data = null
		try {
			dispatch(requestSavingCategory())
			if (categoryData.id) {
				data = await categoryService.updateCategory(categoryData.id, categoryData)
			} else {
				data = await categoryService.createCategory(categoryData)
			}
			const { data: categoryResponse } = data
			dispatch(savingCategorySuccess(categoryResponse as GetCategoryInterface))
		} catch (error) {
			dispatch(savingFailed())
		}
	}

    const deleteCategory =(id:DeleteCategoryInterface):AppThunk => async dispatch => {
        try {
            const response = categoryService.deleteCategory(id)
            dispatch(deleteCategorySuccess(id))
        } catch (error) {
            console.log("failed delete")
        }
    }


const selectCategoryState = (state: RootState) => state.category;
const selectCategoryList = () => (state: RootState) => selectCategoryState(state).list;


export {
	saveCategory,
    deleteCategory,
	selectCategoryList
};
