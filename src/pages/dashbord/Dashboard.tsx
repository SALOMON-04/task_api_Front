import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "../../components/seach/seach";
import TaskEditForm from "../../components/task_modif_form/task_modif_form"; 
import TaskForm from "../../components/task_form_ajout/task_form_ajout"; 
import TaskItem from "../../components/task-item/task-item";
import Footer from "../../components/footer/footer";
import DashboardHeader from "../../components/dashboard-header/dashboard-header";
import TaskApi from "../../lib/axios";
import type { Task, TaskValues } from "../../components/type/task"; 

const Dashboard = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const [actionError, setActionError] = useState("");
	const [search, setSearch] = useState("");
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	// Charge les tâches une seule fois, à l'affichage de la page
	useEffect(() => {
		const loadTasks = async () => {
			try {
				const { data } = await TaskApi.get<Task[]>("/tasks");
				setTasks(data);
			} catch (err) {
				if (axios.isAxiosError(err) && err.response?.status === 401) {
					setLoadError("Session expirée, reconnecte-toi.");
				} else {
					setLoadError("Impossible de charger les tâches.");
				}
			} finally {
				setLoading(false);
			}
		};

		loadTasks();
	}, []);

	// Ajout : si l'appel échoue, l'erreur remonte au formulaire
	const handleAdd = async (values: TaskValues) => {
		const { data } = await TaskApi.post<Task>("/tasks", values);
		setTasks((previous) => [data, ...previous]);
	};

	// Modification (route PUT /tasks/:id à ajouter dans l'API)
	const handleUpdate = async (id: number, values: TaskValues) => {
		await TaskApi.patch(`/tasks/${id}`, values);
		setTasks((previous) =>
			previous.map((task) => (task.id === id ? { ...task, ...values } : task)),
		);
		setEditingTask(null);
	};

	// Terminer une tâche
	const handleComplete = async (id: number) => {
		await TaskApi.patch(`/tasks/${id}`, { completed: true });
		setTasks((previous) =>
			previous.map((task) =>
				task.id === id ? { ...task, completed: true } : task,
			),
		);
		setEditingTask(null);
	};

	// Suppression
	const handleDelete = async (id: number) => {
		setActionError("");

		try {
			await TaskApi.delete(`/tasks/${id}`);
			setTasks((previous) => previous.filter((task) => task.id !== id));
			if (editingTask?.id === id) setEditingTask(null);
		} catch {
			setActionError("Impossible de supprimer la tâche.");
		}
	};

	// Recherche côté React, dans les tâches déjà chargées
	const query = search.trim().toLowerCase();
	const visibleTasks = tasks.filter(
		(task) =>
			task.title.toLowerCase().includes(query) ||
			(task.description ?? "").toLowerCase().includes(query),
	);

	return (
		<div className="flex min-h-screen flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
			
			<DashboardHeader />

			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
				<h1 className="text-3xl font-medium tracking-tight">Mes tâches</h1>

				<div className="mt-4">
					<SearchBar value={search} onChange={setSearch} />
				</div>

				<div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
					{/* Liste des tâches */}
					<div className="rounded-3xl bg-neutral-200 p-6 dark:bg-neutral-800">
						<p className="mb-2 font-medium">Mes tâches</p>

						{loading && <p>Chargement…</p>}

						{loadError && (
							<p className="text-sm text-red-700 dark:text-red-400">
								{loadError}
							</p>
						)}

						{actionError && (
							<p className="text-sm text-red-700 dark:text-red-400">
								{actionError}
							</p>
						)}

						{!loading && !loadError && tasks.length === 0 && (
							<p className="text-neutral-700 dark:text-neutral-300">
								Aucune tâche pour le moment.
							</p>
						)}

						{!loading && tasks.length > 0 && visibleTasks.length === 0 && (
							<p className="text-neutral-700 dark:text-neutral-300">
								Aucun résultat pour cette recherche.
							</p>
						)}

						{visibleTasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								selected={editingTask?.id === task.id}
								onEdit={setEditingTask}
								onDelete={handleDelete}
							/>
						))}
					</div>

					{/* Formulaire d'ajout ou de modification */}
					<div className="rounded-3xl bg-neutral-200 p-6 dark:bg-neutral-800">
						{editingTask ? (
							<TaskEditForm
								key={editingTask.id}
								task={editingTask}
								onSave={handleUpdate}
								onComplete={handleComplete}
								onCancel={() => setEditingTask(null)}
							/>
						) : (
							<TaskForm onSubmit={handleAdd} />
						)}
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Dashboard;