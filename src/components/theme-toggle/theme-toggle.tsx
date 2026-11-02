import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

// Choix gardé dans localStorage, sinon réglage du système
const getInitialDark = () => {
	const saved = localStorage.getItem("theme");
	if (saved) return saved === "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle = () => {
	const [dark, setDark] = useState(getInitialDark);

	// Ajoute ou retire la classe "dark" sur <html> et garde le choix
	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	return (
		<Button
			variant="ghost"
			onClick={() => setDark(!dark)}
			aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
			className="h-9 w-9 cursor-pointer rounded-full p-0 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
		>
			{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
		</Button>
	);
};

export default ThemeToggle;