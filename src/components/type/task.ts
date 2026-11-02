export type Priority = "low" | "medium" | "high";

export const priorities: Priority[] = ["low", "medium", "high"];

export type Task = {
	id: number;
	title: string;
	description?: string | null;
	priority: Priority;
	completed: boolean;
};

// Les champs qu'un formulaire envoie à l'API
export type TaskValues = {
	title: string;
	description?: string | null;
	priority: Priority;
};