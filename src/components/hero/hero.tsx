import { ArrowRight, Check, CircleCheck, Filter, Flag } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

// Fausse liste affichée dans la carte de droite
const tasks = [
	{ title: "Lire le cahier des charges", priority: "low", done: true },
	{ title: "Tester l'API avec Bruno", priority: "medium", done: false },
	{ title: "Finir la page d'accueil", priority: "high", done: false },
];

// Les trois petites cartes du bas
const features = [
	{ icon: Flag, title: "Priorités", text: "Low, medium ou high." },
	{ icon: Filter, title: "Filtres", text: "Terminées ou à faire." },
	{ icon: CircleCheck, title: "Suivi", text: "Coche et passe à la suite." },
];

const Hero = () => {
	const navigate = useNavigate();

	return (
		<section className="mx-auto max-w-6xl animate-in px-4 py-8 duration-700 fade-in slide-in-from-bottom-4 md:py-12">
			<div className="grid gap-4 lg:grid-cols-2">
				{/* Grande carte à gauche */}
				<div className="flex flex-col justify-center rounded-3xl bg-neutral-200 p-8 md:p-12 dark:bg-neutral-800">
					<h1 className="text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl dark:text-white">
						Tes tâches.
						<br />
						Rien d'autre.
					</h1>

					<p className="mt-4 max-w-md text-lg text-neutral-700 dark:text-neutral-300">
						Une liste, des priorités, et tu coches quand c'est fait. Chaque
						compte est privé.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button
							onClick={() => navigate("/register")}
							className="h-11 cursor-pointer rounded-full bg-teal-700 px-6 text-base font-medium text-white hover:bg-teal-600"
						>
							Créer un compte
							<ArrowRight className="ml-1 h-4 w-4" />
						</Button>

						<Button
							variant="outline"
							onClick={() => navigate("/login")}
							className="h-11 cursor-pointer rounded-full border-neutral-900 bg-transparent px-6 text-base text-neutral-900 hover:bg-neutral-100 dark:border-white dark:text-white dark:hover:bg-neutral-700"
						>
							Se connecter
						</Button>
					</div>
				</div>

				{/* Deux cartes empilées à droite */}
				<div className="grid gap-4">
					<div className="rounded-3xl bg-neutral-200 p-6 dark:bg-neutral-800">
						<p className="mb-2 font-medium text-neutral-900 dark:text-white">
							Mes tâches
						</p>

						{tasks.map((task) => (
							<div
								key={task.title}
								className="flex items-center gap-3 border-t border-neutral-400/50 py-3"
							>
								<span
									className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
										task.done
											? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
											: "border-neutral-500"
									}`}
								>
									{task.done && <Check className="h-3 w-3" />}
								</span>

								<span
									className={
										task.done
											? "text-neutral-500 line-through"
											: "text-neutral-900 dark:text-white"
									}
								>
									{task.title}
								</span>

								<span
									className={`ml-auto rounded-full border px-2 py-0.5 text-xs ${
										task.priority === "high"
											? "border-red-600 text-red-700 dark:border-red-400 dark:text-red-400"
											: "border-neutral-500 text-neutral-700 dark:text-neutral-300"
									}`}
								>
									{task.priority}
								</span>
							</div>
						))}
					</div>

					<div className="rounded-3xl bg-neutral-200 p-6 dark:bg-neutral-800">
						<p className="font-medium text-neutral-900 dark:text-white">
							Des tâches vraiment privées
						</p>
						<p className="mt-1 text-neutral-700 dark:text-neutral-300">
							Connexion sécurisée : toi seul vois ce que tu écris.
						</p>
					</div>
				</div>
			</div>

			{/* Trois petites cartes en dessous */}
			<div className="mt-4 grid gap-4 sm:grid-cols-3">
				{features.map((feature) => (
					<div
						key={feature.title}
						className="rounded-3xl bg-neutral-200 p-6 dark:bg-neutral-800"
					>
						<feature.icon className="h-5 w-5 text-neutral-900 dark:text-white" />
						<p className="mt-3 font-medium text-neutral-900 dark:text-white">
							{feature.title}
						</p>
						<p className="text-sm text-neutral-700 dark:text-neutral-300">
							{feature.text}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Hero;