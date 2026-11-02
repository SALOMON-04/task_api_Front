import { type Priority, priorities } from "../type/task";

type PriorityPickerProps = {
	value: Priority;
	onChange: (value: Priority) => void;
};

const PriorityPicker = ({ value, onChange }: PriorityPickerProps) => {
	return (
		<div>
			<p className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
				Priorité
			</p>
			<div className="flex gap-2">
				{priorities.map((level) => (
					<button
						key={level}
						type="button"
						onClick={() => onChange(level)}
						className={`cursor-pointer rounded-full border px-4 py-1 text-sm ${
							value === level
								? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
								: "border-neutral-500 text-neutral-900 dark:text-white"
						}`}
					>
						{level}
					</button>
				))}
			</div>
		</div>
	);
};

export default PriorityPicker;