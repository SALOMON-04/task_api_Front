import type { SubmitEvent } from "react";
import { useState } from "react";
import type { Priority, Task, TaskValues } from "../type/task";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PriorityPicker from "../choix_priority/choix_priority";

type TaskEditFormProps = {
	task: Task;
	onSave: (id: number, values: TaskValues) => Promise<void>;
	onComplete: (id: number) => Promise<void>;
	onCancel: () => void;
};

const TaskEditForm = ({
	task,
	onSave,
	onComplete,
	onCancel,
}: TaskEditFormProps) => {
	// Les champs démarrent avec les valeurs de la tâche
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description ?? "");
	const [priority, setPriority] = useState<Priority>(task.priority);
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			await onSave(task.id, {
				title,
				description: description || undefined,
				priority,
			});
		} catch {
			setError("Impossible d'enregistrer la tâche.");
			setSubmitting(false);
		}
	};

	const handleComplete = async () => {
		setError("");
		setSubmitting(true);

		try {
			await onComplete(task.id);
		} catch {
			setError("Impossible de terminer la tâche.");
			setSubmitting(false);
		}
	};

	return (
		<>
			<p className="font-medium">Modifier la tâche</p>

			<form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
				<Input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="h-11 rounded-xl border-neutral-400 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
					type="text"
					placeholder="Titre"
					required
				/>

				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="h-24 resize-none rounded-xl border border-neutral-400 bg-white px-4 py-2 text-base text-neutral-900 outline-none placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-teal-700 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
					placeholder="Description (facultative)"
				/>

				<PriorityPicker value={priority} onChange={setPriority} />

				{error && (
					<p className="text-sm text-red-700 dark:text-red-400">{error}</p>
				)}

				<div className="flex gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						className="h-11 flex-1 cursor-pointer rounded-full border-neutral-900 bg-transparent text-base text-neutral-900 hover:bg-neutral-100 dark:border-white dark:text-white dark:hover:bg-neutral-700"
					>
						Annuler
					</Button>

					<Button
						type="submit"
						disabled={submitting}
						className="h-11 flex-1 cursor-pointer rounded-full bg-teal-700 text-base font-medium text-white hover:bg-teal-600"
					>
						{submitting ? "Envoi…" : "Enregistrer"}
					</Button>
				</div>

				{!task.completed && (
					<Button
						type="button"
						variant="outline"
						disabled={submitting}
						onClick={handleComplete}
						className="h-11 cursor-pointer rounded-full border-neutral-900 bg-transparent text-base text-neutral-900 hover:bg-neutral-100 dark:border-white dark:text-white dark:hover:bg-neutral-700"
					>
						Marquer comme terminée
					</Button>
				)}
			</form>
		</>
	);
};

export default TaskEditForm;