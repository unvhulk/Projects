import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import Add from "./AddCategory.module.css";

export const AddCategory = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	const { addCategory, findCategory } = useCategory();

	const validate = (value) => {
		//Max 30 characters, Alphabets, Unique
		if (!/^[a-zA-Z]+$/.test(value)) {
			alert("All characters should be Alphabets");
			return false;
		}
		if (!(value.length <= 30)) {
			alert("Characters length must be at most 30 characters");
			return false;
		}
		if (findCategory(value) !== -1) {
			alert("Category already exists, Please choose another name");
			return false;
		}

		return true;
	};

	const saveHandler = (e) => {
		e.preventDefault();
		if (validate(input)) {
			addCategory({
				id: Date.now(),
				createdAt: Date(),
				categoryName: input,
				titles: [],
			});
			setInput("");
			alert("Category added successfully");
		}
	};

	return (
		<div className={Add.Container}>
			<div className={Add.Header}>Enter Category Name</div>
			<form onSubmit={saveHandler}>
				<div className={Add.inputContainer}>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						required
					/>
				</div>
				<div className={Add.buttons}>
					<button className={Add.save}>Save</button>
					<button className={Add.save} onClick={() => navigate("/")}>
						Back
					</button>
				</div>
			</form>
		</div>
	);
};
