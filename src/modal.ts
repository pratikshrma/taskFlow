export interface Todo {
	id: string;
	title: string;
	description: string;
	dueDate: string;
	priority: "Low" | "Medium" | "High";
	status: "Pending" | "In Progress" | "Completed";
}
