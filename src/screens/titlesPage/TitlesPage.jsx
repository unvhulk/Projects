import { useNavigate } from "react-router-dom";
import { useCategory } from "../../contexts/category-context";
import { Modal } from "../../components/Modal/Modal";
import Title from "./TitlesPage.module.css";

export function TitlesPage() {
	const {
		categories,
		selectedCategory,
		setSelectedTitle,
		setOpen,
		setEdit,
		deleteTitle,
	} = useCategory();

	const navigate = useNavigate();

	return (
		<div className={Title.Container}>
			<header className={Title.header}>Titles List</header>
			<main className={Title.main}>
				{categories?.filter(
					(category) => category.categoryName === selectedCategory
				)[0]?.titles.length !== 0 ? (
					categories
						?.filter(
							(category) => category.categoryName === selectedCategory
						)[0]
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
								<div
									className={Title.delete}
									onClick={() => deleteTitle(title)}>
									X
								</div>
							</div>
						))
				) : (
					<div className={Title.emptyState}>
						<h1>
							No Titles here yet. Add some{" "}
							<span
								className={Title.span}
								onClick={() => navigate(`/category/${selectedCategory}`)}>
								Titles
							</span>
						</h1>
					</div>
				)}
			</main>
		</div>
	);
}
