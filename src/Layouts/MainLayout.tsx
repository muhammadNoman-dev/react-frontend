import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks"; 
import { selectCurrentUser } from "../store/auth.slice";
import { getDashboardMainPageRoute, getLoginPageRoute,  } from "../config/routes";


const MainLayout: React.FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector(selectCurrentUser());

	useEffect(() => {
		if (!user) return navigate(getLoginPageRoute());
	}, [user, navigate]);

	return 	<Outlet />
};

export default MainLayout;
