import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css"; // Tailwind base utilities (compiled by PostCSS)
import "./styles/index.css"; // Additional global styles

/*
	Application bootstrap (entrypoint)

	Responsibilities:
	- Locate the DOM container (id="root") and mount the React tree into it.
	- Import global CSS once so that Vite/PostCSS/Tailwind compile them during
		development and include them in the final build.

	Notes for developers:
	- Keep this file minimal; business logic and providers belong in `App.jsx`.
	- When writing tests you can import `App` directly and render it into a
		test DOM renderer instead of using the real root element.
*/

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
