import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, FormInput } from '../components';
import useAppDispatch from '../hooks/useAppDispatch';
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CategoryType {
    id: string;
    name: string;
}

const columns: ColumnsType<CategoryType> = [
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
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: CategoryType[] = [
    {
        id: '1',
        name: 'John Brown',

    },
    {
        id: '2',
        name: 'Jim Green',

    },
    {
        id: '3',
        name: 'Joe Black',
    },
];

export interface Category {
    categoryName: string;
}

const sigupValidationSchema = Yup.object().shape({
    categoryName: Yup.string().required().label("Name"),
});

const Category = () => {
    const [clickedRowId, setClickedRowId] = useState<string>();

    const dispatch = useAppDispatch();
    const methods = useForm<Category>({ resolver: yupResolver(sigupValidationSchema) });

    const onSubmit = (data: any) => {
        console.log("data", data)
    };

    const handleRowClick = (record: CategoryType) => {
        console.log(record.id); // Log the clicked row's ID
        setClickedRowId(record.id); // Update the state with the clicked row's ID
    };
    return (
        <div>

            <div>Category</div>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col items-center mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <FormInput placeholder="Enter email" name="categoryName" />

                    <Button className="bg-blue-400" type="submit" >Submit</Button>
                </form>
            </FormProvider>

            <Table columns={columns} dataSource={data} onRow={(record) => ({
                onClick: () => handleRowClick(record), // Attach event handler to each row
            })} />

        </div>
    )
}

export default Category