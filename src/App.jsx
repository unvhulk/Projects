import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import {
	Homepage,
	AddCategory,
	ViewCategory,
	CategoryPage,
	TitlesPage,
} from "./screens";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Homepage />} />
			<Route path='/add' element={<AddCategory />} />
			<Route path='/category' element={<ViewCategory />}>
				<Route path=':name' element={<CategoryPage />}>
					<Route path='titles' element={<TitlesPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
