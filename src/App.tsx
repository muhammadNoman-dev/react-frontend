

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./config/routes";
import { Login, Signup } from "./pages";
import useAppSelector from "./hooks/useAppSelector";
import { selectInitialAuthDone } from "./store/auth.slice";
import Dashboard from "./pages/Dashboard";


const App: React.FC = () => {

  const isLoggedIn = useAppSelector(selectInitialAuthDone())
  return (

    <BrowserRouter>
      {
        !isLoggedIn ?
          <Routes>
            <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} /> :
          </Routes> 
          :
          <Routes>
            <Route path={APP_ROUTES.LOGIN} element={<Login />} />
            <Route path={APP_ROUTES.SIGNUP} element={<Signup />} />
          </Routes>
      }
    </BrowserRouter>
  );
};

export default App;
