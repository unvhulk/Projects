import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import Cat from "./CategoryPage.module.css";

export const CategoryPage = () => {
	const [title, setTitle] = useState("");
	const { name } = useParams();
	const navigate = useNavigate();
	const { selectCategory, addTitle } = useCategory();
	const location = useLocation();

	useEffect(() => {
		selectCategory(name);
	}, []);

	const handleAddTitle = (e) => {
		e.preventDefault();
		addTitle(title);
		setTitle("");
	};

	const showTitles = (e) => {
		e.preventDefault();
		navigate("titles");
	};

	return location.pathname !== `/category/${name}` ? (
		<Outlet />
	) : (
		<div className={Cat.Container}>
			<header className={Cat.header}>
				You have selected <span> {name} </span> Category
			</header>
			<form className={Cat.form} onSubmit={handleAddTitle} aria-hidden='true'>
				<div className={Cat.label}>Add new title</div>
				<input
					type='text'
					className={Cat.input}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<div className={Cat.buttons}>
					<button className={Cat.add}>Add Title</button>
					<button className={Cat.add} onClick={() => navigate("/category")}>
						Back
					</button>
				</div>
				<div className={Cat.view} onClick={showTitles}>
					View Added Titles
				</div>
			</form>
		</div>
	);
};
