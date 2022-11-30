import { useLocation } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import { Modal } from "../../components/Modal/Modal";
import Title from "./TitlesPage.module.css";

export function TitlesPage() {
	const {
		categories,
		selectedCategory,
		selectedTitle,
		setSelectedTitle,
		setOpen,
		setEdit,
		deleteTitle,
	} = useCategory();

	console.log(categories.current);

	return (
		<div className={Title.Container}>
			<header className={Title.header}>Titles List</header>
			<main className={Title.main}>
				{categories.current
					.filter((category) => category.categoryName === selectedCategory)[0]
					?.titles.map((title) => (
						<div key={title.id} className={Title.list}>
							<Modal />
							<span
								className={Title.name}
								onClick={() => {
									setSelectedTitle(title);
									setOpen(true);
									setEdit(false);
								}}>
								{title.title}
							</span>
							<div
								className={Title.edit}
								onClick={() => {
									setSelectedTitle(title);
									setOpen(true);
									setEdit(true);
								}}>
								🖊
							</div>
							<div className={Title.delete} onClick={deleteTitle}>
								X
							</div>
						</div>
					))}
			</main>
		</div>
	);
}
