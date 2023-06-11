import { useNavigate } from "react-router-dom"
import { Button, FormInput } from "../components"
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useAppDispatch from "../hooks/useAppDispatch";
import { signup } from "../store/auth.slice";
import { SigupInterface } from "../types/auth.types";
import { getLoginPageRoute } from "../config/routes";

const sigupValidationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
});



const Signup = () => {

    const dispatch = useAppDispatch();
    const methods = useForm<SigupInterface>({ resolver: yupResolver(sigupValidationSchema) });
    const navigate = useNavigate()

    const onSubmit = (data: SigupInterface) => {
        dispatch(signup(data));
    };


    return (
        <FormProvider {...methods}>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Sign Up
                    </h1>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="flex flex-col items-center mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <FormInput placeholder="Enter email" name="email" />

                        <Button className="bg-blue-400" type="submit" >Submit</Button>
                        <p className="text-center text-sm text-gray-500">
                            Already have account?
                            <div className="underline cursor-pointer " onClick={() => navigate(getLoginPageRoute())} >Log in</div>
                        </p>
                    </form>
                </div>
            </div>
        </FormProvider>
    )
}

export default Signup