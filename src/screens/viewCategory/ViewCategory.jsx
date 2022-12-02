import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import View from "./ViewCategory.module.css";

export const ViewCategory = () => {
	const { categories, deleteCategory } = useCategory();
	const navigate = useNavigate();
	const location = useLocation();

	return location.pathname != "/category" ? (
		<Outlet />
	) : (
		<div className={View.Container}>
			<div className={View.Header}>Your Categories</div>
			{categories.length !== 0 ? (
				<div className={View.categoryList}>
					{categories.map((category) => {
						return (
							<div key={category.id} className={View.categoryBox}>
								<div
									className={View.categoryHeader}
									onClick={() => navigate(`${category.categoryName}`)}>
									{category.categoryName}
								</div>
								<div
									className={View.deleteCategory}
									onClick={() => deleteCategory(category.id)}>
									X
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<h1 className={View.emptyState}>
					No Categories found. Add new{" "}
					<span onClick={() => navigate("/add")}> Category </span>
				</h1>
			)}

			<button className={View.back} onClick={() => navigate("/")}>
				Back
			</button>
		</div>
	);
};
