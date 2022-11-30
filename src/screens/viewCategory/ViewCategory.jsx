import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import View from "./ViewCategory.module.css";

export const ViewCategory = () => {
	const { categories } = useCategory();
	const navigate = useNavigate();
	const location = useLocation();

	return location.pathname != "/category" ? (
		<Outlet />
	) : (
		<div className={View.Container}>
			<div className={View.Header}>Your Categories</div>
			<div className={View.categoryList}>
				{categories.map((category) => {
					return (
						<div
							key={category.id}
							className={View.categoryBox}
							onClick={() => navigate(`${category.categoryName}`)}>
							{category.categoryName}
						</div>
					);
				})}
			</div>
		</div>
	);
};
