

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./config/routes";
import { Login, Signup } from "./pages";
import { fetchUserProfile } from "./store/auth.slice";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import useAppDispatch from "./hooks/useAppDispatch";
import { AuthLayout, MainLayout } from "./Layouts";


const App: React.FC = () => {

  const ProfileTrigger = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchUserProfile());
    }, [dispatch]);
    return null;
  };


  return (

    <BrowserRouter>
      <ProfileTrigger />
      <Routes>
        <Route path={APP_ROUTES.AUTH} element={<AuthLayout />}>
          <Route path={APP_ROUTES.LOGIN} element={<Login />} />
          <Route path={APP_ROUTES.SIGNUP} element={<Signup />} />
        </Route>
        <Route path={APP_ROUTES.DASHBOARD} element={<MainLayout />} >
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<AuthLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
