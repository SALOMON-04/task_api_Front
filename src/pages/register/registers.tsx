import type { SubmitEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { authClient } from "../../lib/auth-client";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";



const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault(); // empêche le rechargement de la page
		setError("");

		const { error } = await authClient.signUp.email({ name, email, password });

		if (error) {
			setError(error.message ?? "Impossible de créer le compte");
			return;
		}

		navigate("/login");
	};

	return (
		<div className="flex flex-col min-h-screen bg-white p-4 text-neutral-900 dark:bg-neutral-950 dark:text-white">

			<DashboardHeader/>


			<main  className="flex flex-1 items-center justify-center p-4">
					<div className="w-full max-w-md rounded-3xl bg-neutral-200 p-8 dark:bg-neutral-800">
						<h1 className="text-3xl font-medium tracking-tight">Créer un compte</h1>
						<p className="mt-2 text-neutral-700 dark:text-neutral-300">
							Remplis les champs pour continuer.
						</p>

						<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="h-12 rounded-xl border-neutral-400 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
								type="text"
								placeholder="Nom"
							/>

							<Input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="h-12 rounded-xl border-neutral-400 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
								type="email"
								placeholder="Email"
							/>

							<Input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="h-12 rounded-xl border-neutral-400 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
								type="password"
								placeholder="Mot de passe"
							/>

							{error && (
								<p className="text-sm text-red-700 dark:text-red-400">{error}</p>
							)}

							<Button
								type="submit"
								className="h-12 w-full cursor-pointer rounded-full bg-teal-700 text-base font-medium text-white hover:bg-teal-600"
							>
								S'inscrire
							</Button>
						</form>

						<p className="mt-6 text-center text-sm text-neutral-700 dark:text-neutral-300">
							Déjà un compte ?{" "}
							<Link
								to="/login"
								className="font-medium text-teal-700 hover:underline dark:text-teal-400"
							>
								Se connecter
							</Link>
						</p>
					</div>
			</main>
		</div>
	);
};

export default Register;