import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useCategory } from "../../contexts/category-context";
import modal from "./Modal.module.css";

export const Modal = () => {
	const { open, setOpen, edit, selectedTitle, setSelectedTitle, changeTitle } =
		useCategory();

	const submitHandler = (e) => {
		e.preventDefault();
		changeTitle(selectedTitle);
		setOpen(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSelectedTitle((selectedTitle) => {
			return { ...selectedTitle, [name]: value };
		});
	};

	const closeHandler = (e) => {
		setOpen(false);
	};

	return (
		<div style={{ display: `${open ? "grid" : "none"}` }}>
			<div className={modal.Overlay}></div>
			<form className={modal.Modal} onSubmit={(e) => e.preventDefault()}>
				<input
					type='text'
					name='title'
					className={`${modal.addTitle} ${modal.input}`}
					placeholder='Add Title'
					value={selectedTitle?.title}
					onChange={handleChange}
					readOnly={!edit}
				/>
				<textarea
					name='description'
					className={`${modal.addDesc} ${modal.input}`}
					placeholder='Add Description'
					value={selectedTitle?.description}
					onChange={handleChange}
					readOnly={!edit}
				/>
				<div className={modal.btns}>
					{edit && (
						<button
							className={`${modal.submit} ${modal.input}`}
							onClick={submitHandler}>
							Submit
						</button>
					)}
					<button
						className={`${modal.close} ${modal.input}`}
						onClick={closeHandler}>
						Close
					</button>
				</div>
			</form>
		</div>
	);
};
