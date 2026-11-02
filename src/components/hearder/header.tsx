import { ListChecks } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import ThemeToggle from "../theme-toggle/theme-toggle";


const Header = () => {
	const navigate = useNavigate();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				{/* Logo à gauche */}
				<Link to="/" className="flex items-center gap-2">
					<span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
						<ListChecks className="h-5 w-5 text-white dark:text-neutral-900" />
					</span>
					<span className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
						TaskFlow
					</span>
				</Link>

				{/* Boutons à droite */}
				<div className="flex items-center gap-2">
					{/* Le bouton clair/sombre viendra ici */}


					<ThemeToggle/>

					<Button
						variant="ghost"
						onClick={() => navigate("/login")}
						className="h-9 cursor-pointer rounded-full px-5 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
					>
						Connexion
					</Button>

					<Button
						onClick={() => navigate("/register")}
						className="h-9 cursor-pointer rounded-full bg-teal-700 px-5 font-medium text-white hover:bg-teal-600"
					>
						Créer un compte
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;