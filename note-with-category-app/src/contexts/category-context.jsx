import { useEffect, useRef } from "react";
import { useContext, createContext } from "react";
import { useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
	const categories = useRef(
		JSON.parse(localStorage.getItem("categories")) ?? []
	);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedTitle, setSelectedTitle] = useState({});
	const [index, setIndex] = useState(null);
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setIndex(
			categories.current.findIndex(
				(category) => selectedCategory === category.categoryName
			)
		);
	}, [selectedCategory]);

	const addCategory = (newCategory) => {
		categories.current = [...categories.current, newCategory];
		localStorage.setItem("categories", JSON.stringify(categories.current));
	};

	const selectCategory = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const addTitle = (title) => {
		categories.current[index] = {
			...categories.current[index],
			titles: [
				...categories.current[index].titles,
				{ id: Date.now(), title, description: "" },
			],
		};

		localStorage.setItem("categories", JSON.stringify(categories.current));
	};

	const changeTitle = (newTitle) => {
		categories.current[index].titles = categories.current[index].titles.map(
			(currTitle) => (currTitle.id === newTitle.id ? newTitle : currTitle)
		);

		localStorage.setItem("categories", JSON.stringify(categories.current));
	};

	return (
		<CategoryContext.Provider
			value={{
				categories,
				selectedCategory,
				addCategory,
				selectCategory,
				addTitle,
				selectedTitle,
				setSelectedTitle,
				changeTitle,
				open,
				setOpen,
				edit,
				setEdit,
			}}>
			{children}
		</CategoryContext.Provider>
	);
};

const useCategory = () => useContext(CategoryContext);

export { CategoryProvider, useCategory };
