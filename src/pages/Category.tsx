import { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, FormInput } from '../components';
import useAppDispatch from '../hooks/useAppDispatch';
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteCategory, saveCategory, selectCategoryList } from '../store/category.slice';
import useAppSelector from '../hooks/useAppSelector';
import { GetCategoryInterface } from '../types/category.types';



export interface Category {
    name: string;
}

const categoryValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Category Name"),
});

const Category = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategoryList())
    const [updateData, setUpdateData] = useState<any>(null)

    const columns: ColumnsType<GetCategoryInterface> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle"  >
                    <div className='flex space-x-2 cursor-pointer'>
                        <div onClick={() => setUpdateData(record)}>Update</div>
                        <div className='border-b border-l-2'></div>
                        <div className="" onClick={() => dispatch(deleteCategory(record._id))}>Delete</div>
                    </div>

                </Space>
            ),
        },

    ];


    const methods = useForm<Category>({ resolver: yupResolver(categoryValidationSchema) });

    useEffect(() => {
        methods.reset({ name: updateData?.name })
    }, [updateData])



    const onSubmit = (data: any) => {
        dispatch(saveCategory({ ...data, _id: updateData?._id }));
        methods.reset({ name: "" })
        setUpdateData(null)
    };

    return (
        <div className='p-6' >
            <FormProvider {...methods}>
                <div className='font-bold text-lg' >Category</div>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col items-center mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <FormInput placeholder="Enter email" name="name" />
                    {updateData ? <div className='flex space-x-2'>
                        <Button className="bg-blue-400" type="submit">Update</Button>
                        <Button className="bg-blue-400" type="reset" onClick={() => setUpdateData(null)}>New</Button>
                    </div> : <Button className="bg-blue-400" type="submit" >Create</Button>}

                </form>
            </FormProvider>

            <Table pagination={{
                pageSize: 5,
            }} columns={columns} dataSource={categories}
            />

        </div>
    )
}

export default Category