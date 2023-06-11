import { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Button, FormInput } from '../components';
import useAppDispatch from '../hooks/useAppDispatch';
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { selectCategoryList } from '../store/category.slice';
import useAppSelector from '../hooks/useAppSelector';
import { deleteCar, saveCar, selectCarList } from '../store/car.slice';
import { GetCarInterface } from '../types/car.types';
import FormSelect from '../components/FormSelect';

export interface Car {
    color: string;
    model: string;
    make: string;
    registrationNumber: string;
    category: string;
}

const sigupValidationSchema = Yup.object().shape({
    color: Yup.string().required().label("Color"),
    model: Yup.string().required().label("Model"),
    make: Yup.string().required().label("Make"),
    registrationNumber: Yup.string().required().label("Registration number"),
    category: Yup.string().required().label("Category"),
});

const Car = () => {
    const dispatch = useAppDispatch();
    const cars = useAppSelector(selectCarList())
    const categories = useAppSelector(selectCategoryList())
    const [updateData, setUpdateData] = useState<any>(null)
    const methods = useForm<Car>({ resolver: yupResolver(sigupValidationSchema) });


    const columns: ColumnsType<GetCarInterface> = [
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Registration Number',
            dataIndex: 'registrationNumber',
            key: 'registrationNumber',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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
                        <div className="" onClick={() => dispatch(deleteCar(record._id))}>Delete</div>
                    </div>
                </Space>
            ),
        },

    ];

    const onSubmit = (data: any) => {
        dispatch(saveCar({ ...data, _id: updateData?._id }));
        methods.reset({ color: "", make: "", category: "", registrationNumber: "", model: "" })
        setUpdateData(null)
    };

    useEffect(() => {
        methods.reset({ color: updateData?.color, make: updateData?.make, model: updateData?.model, registrationNumber: updateData?.registrationNumber, category: updateData?.category })
    }, [updateData])


    return (
        <div className='p-6'>
            <FormProvider {...methods}>
                <div>Car</div>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col items-center mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <div className='flex flex-row space-x-2'>
                        <FormInput placeholder="Color" name="color" />
                        <FormInput placeholder="Make" name="make" />
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <FormInput placeholder="Model" name="model" />
                        <FormInput placeholder="Registration Number" name="registrationNumber" />
                    </div>
                    <div>
                        <FormSelect
                            className='w-40'
                            name='category'
                            options={categories.map(category => ({ label: category.name, value: category._id }))}
                            register={methods.register}
                        />
                    </div>
                    {updateData ? <div className='flex space-x-2'>
                        <Button className="bg-blue-400" type="submit">Update</Button>
                        <Button className="bg-blue-400" type="reset" onClick={() => setUpdateData(null)}>New</Button>
                    </div> : <Button className="bg-blue-400" type="submit" >Create</Button>}
                    {/* <Button className="bg-blue-400" type="submit" >Submit</Button> */}
                </form>
            </FormProvider>

            <Table pagination={{
                pageSize: 5,
            }} columns={columns} dataSource={cars} />

        </div>
    )
}

export default Car