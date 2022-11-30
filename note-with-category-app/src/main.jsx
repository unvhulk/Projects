import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CategoryProvider } from "./contexts/category-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<CategoryProvider>
				<App />
			</CategoryProvider>
		</BrowserRouter>
	</React.StrictMode>
);
