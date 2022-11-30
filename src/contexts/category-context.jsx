import { useEffect, useRef } from "react";
import { useContext, createContext } from "react";
import { useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
	// const categories = useRef(
	// 	JSON.parse(localStorage.getItem("categories")) ?? []
	// );
	const [categories, setCategories] = useState(
		JSON.parse(localStorage.getItem("categories")) ?? []
	);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedTitle, setSelectedTitle] = useState({});
	const [index, setIndex] = useState(null);
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		setIndex(
			categories.findIndex(
				(category) => selectedCategory === category.categoryName
			)
		);
	}, [selectedCategory]);

	const addCategory = (newCategory) => {
		setCategories([...categories, newCategory]);
		localStorage.setItem("categories", JSON.stringify(categories));
	};

	const selectCategory = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const addTitle = (title) => {
		setCategories((categories) =>
			categories.map((category) =>
				category.categoryName === selectedCategory
					? {
							...category,
							titles: [
								...category.titles,
								{ id: Date.now(), title, description: "" },
							],
					  }
					: category
			)
		);

		localStorage.setItem("categories", JSON.stringify(categories));
	};

	const changeTitle = (newTitle) => {
		setCategories((categories) =>
			categories.map((category) =>
				category.categoryName === selectedCategory
					? {
							...category,
							titles: category.titles.map((currTitle) =>
								currTitle.id === newTitle.id ? newTitle : currTitle
							),
					  }
					: category
			)
		);

		localStorage.setItem("categories", JSON.stringify(categories));
	};

	const deleteTitle = (title) => {
		setCategories((categories) =>
			categories.map((category) =>
				category.categoryName === selectedCategory
					? {
							...category,
							titles: category.titles.filter(
								(currTitle) => currTitle.id !== title.id
							),
					  }
					: category
			)
		);

		localStorage.setItem("categories", JSON.stringify(categories));
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
				deleteTitle,
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
