import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../type/task";

type TaskItemProps = {
	task: Task;
	selected: boolean;
	onEdit: (task: Task) => void;
	onDelete: (id: number) => void;
};

const TaskItem = ({ task, selected, onEdit, onDelete }: TaskItemProps) => {
	return (
		<div
			className={`flex items-center gap-3 rounded-xl border-t border-neutral-400/50 px-2 py-3 ${
				selected ? "bg-neutral-300 dark:bg-neutral-700" : ""
			}`}
		>
			<span
				className={`flex-1 ${
					task.completed
						? "text-neutral-500 line-through"
						: "text-neutral-900 dark:text-white"
				}`}
			>
				{task.title}
			</span>

			<span
				className={`rounded-full border px-2 py-0.5 text-xs ${
					task.priority === "high"
						? "border-red-600 text-red-700 dark:border-red-400 dark:text-red-400"
						: "border-neutral-500 text-neutral-700 dark:text-neutral-300"
				}`}
			>
				{task.priority}
			</span>

			<button
				type="button"
				aria-label="Modifier la tâche"
				onClick={() => onEdit(task)}
				className="cursor-pointer text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
			>
				<Pencil className="h-4 w-4" />
			</button>

			<button
				type="button"
				aria-label="Supprimer la tâche"
				onClick={() => onDelete(task.id)}
				className="cursor-pointer text-neutral-600 hover:text-red-700 dark:text-neutral-400 dark:hover:text-red-400"
			>
				<Trash2 className="h-4 w-4" />
			</button>
		</div>
	);
};

export default TaskItem;