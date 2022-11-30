import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import Add from "./AddCategory.module.css";

export const AddCategory = () => {
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	const { addCategory } = useCategory();

	const saveHandler = (e) => {
		e.preventDefault();
		if (input.length !== 0) {
			addCategory({ id: Date.now(), categoryName: input, titles: [] });
			navigate("/");
		}
	};

	return (
		<div className={Add.Container}>
			<div className={Add.Header}>Enter Category Name</div>
			<form onClick={saveHandler}>
				<div className={Add.inputContainer}>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
				<button className={Add.save}>Save</button>
			</form>
		</div>
	);
};
