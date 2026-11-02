import { ListChecks } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row">
				{/* Logo et description à gauche */}
				<div className="flex flex-col items-center gap-2 md:items-start">
					<Link to="/" className="flex items-center gap-2">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
							<ListChecks className="h-4 w-4 text-white dark:text-neutral-900" />
						</span>

						<span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
							TaskFlow
						</span>
					</Link>

					<p className="text-sm text-neutral-600 dark:text-neutral-400">
						Organise tes tâches simplement.
					</p>
				</div>

				{/* Liens au centre */}
				<nav className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
					<Link
						to="/login"
						className="transition-colors hover:text-teal-700 dark:hover:text-teal-400"
					>
						Connexion
					</Link>
					<Link
						to="/register"
						className="transition-colors hover:text-teal-700 dark:hover:text-teal-400"
					>
						Créer un compte
					</Link>
				</nav>

				{/* Copyright à droite */}
				<p className="text-sm text-neutral-500">
					© 2026 TaskFlow. Tous droits réservés.
				</p>
			</div>
		</footer>
	);
};

export default Footer;