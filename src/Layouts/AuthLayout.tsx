import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks"; 
import { selectCurrentUser } from "../store/auth.slice";
import { getDashboardMainPageRoute, getLoginPageRoute,  } from "../config/routes";


const AuthLayout: React.FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectCurrentUser());
    const location = useLocation()


	useEffect(() => {
        if (location.pathname === "/") navigate(getLoginPageRoute())
		if (user) navigate(getDashboardMainPageRoute())
	}, [user, navigate]);

	return 	<Outlet />
};

export default AuthLayout;
