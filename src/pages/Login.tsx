import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormInput } from "../components"
import { Link, Navigate, useNavigate } from "react-router-dom"
import * as Yup from "yup";
import useAppDispatch from "../hooks/useAppDispatch";
import { LoginInterface } from "../types/auth.types";
import { login } from "../store/auth.slice";
import { FormProvider, useForm } from "react-hook-form";



const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<LoginInterface>({ resolver: yupResolver(loginValidationSchema) });

  const onSubmit = (data: LoginInterface) => {
    dispatch(login(data, () => navigate("./dashboard") ) );
  };


  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Sign In
          </h1>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col items-center mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >

            <FormInput placeholder="Enter email" name="email" />
            <FormInput placeholder="Enter password" name="password" />
            <Button className="bg-blue-400" type="submit" >Submit</Button>


            <p className="text-center text-sm text-gray-500">
              No account?
              <Link to="/signup" className="underline cursor-pointer " >Sign up</Link>
            </p>
          </form>
        </div>
      </div>
   </FormProvider>
  )
}

export default Login