import home from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
	const navigate = useNavigate();
	return (
		<div className={home.Container}>
			<div className={home.Header}>Welcome User</div>
			<div className={home.Categories}>
				<button className={home.addCategory} onClick={() => navigate("/add")}>
					Add Category
				</button>
				<button
					className={home.viewCategory}
					onClick={() => navigate("/category")}>
					View Category
				</button>
			</div>
		</div>
	);
};
