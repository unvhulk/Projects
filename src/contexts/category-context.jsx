import { useEffect, useRef } from "react";
import { useContext, createContext } from "react";
import { useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState(
		JSON.parse(localStorage.getItem("categories")) ?? []
	);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedTitle, setSelectedTitle] = useState({});
	const [open, setOpen] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		localStorage.setItem("categories", JSON.stringify(categories));
	}, [categories]);

	const findCategory = (category) => {
		return categories.findIndex(
			(currCategory) => category === currCategory.categoryName
		);
	};

	const addCategory = (newCategory) => {
		setCategories([...categories, newCategory]);
	};

	const selectCategory = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const deleteCategory = (categoryID) => {
		setCategories(
			categories.filter((currCategory) => currCategory.id !== categoryID)
		);
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
	};

	return (
		<CategoryContext.Provider
			value={{
				categories,
				findCategory,
				selectedCategory,
				addCategory,
				selectCategory,
				deleteCategory,
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
