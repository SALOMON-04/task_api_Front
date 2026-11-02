import { Search } from "lucide-react";
import { Input } from "../ui/input";

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
	return (
		<div className="relative">
			<Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-neutral-500" />
			<Input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-11 rounded-full border-neutral-400 bg-white pl-11 text-base text-neutral-900 placeholder:text-neutral-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
				type="search"
				placeholder="Rechercher une tâche"
			/>
		</div>
	);
};

export default SearchBar;