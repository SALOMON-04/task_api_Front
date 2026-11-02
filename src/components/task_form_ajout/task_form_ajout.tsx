import type { SubmitEvent } from "react";
import { useState } from "react";
import type { Priority, TaskValues } from "../type/task";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PriorityPicker from "../choix_priority/choix_priority";

type TaskFormProps = {
	onSubmit: (values: TaskValues) => Promise<void>;
};

const TaskForm = ({ onSubmit }: TaskFormProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<Priority>("medium");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const reset = () => {
		setTitle("");
		setDescription("");
		setPriority("medium");
		setError("");
	};

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			await onSubmit({
				title,
				description: description || undefined,
				priority,
			});
			reset();
		} catch {
			setError("Impossible d'ajouter la tâche.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<p className="font-medium">Nouvelle tâche</p>

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
						onClick={reset}
						className="h-11 flex-1 cursor-pointer rounded-full border-neutral-900 bg-transparent text-base text-neutral-900 hover:bg-neutral-100 dark:border-white dark:text-white dark:hover:bg-neutral-700"
					>
						Annuler
					</Button>

					<Button
						type="submit"
						disabled={submitting}
						className="h-11 flex-1 cursor-pointer rounded-full bg-teal-700 text-base font-medium text-white hover:bg-teal-600"
					>
						{submitting ? "Ajout…" : "Ajouter"}
					</Button>
				</div>
			</form>
		</>
	);
};

export default TaskForm;