import React, { useEffect, useState } from "react";
import { Todo } from "./modal";
import TaskList from "./TaskList";
import style from "./styles/App.module.css"

const App: React.FC = () => {
	const [todo, setTodo] = useState<Todo>({
		id: crypto.randomUUID(),
		title: "",
		description: "",
		dueDate: "2002-09-02",
		priority: "Low",
		status: "Pending",
	});

	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAddTodo = (): void => {
		const newTodo: Todo = {
			...todo,
			id: crypto.randomUUID()
		}
		setTodos([...todos, newTodo])
	}


	useEffect(() => {
		console.log(todos);
	}, [todos]);

	return (
		<>
			<div>Task Flow</div>
			<div className={style.InputsHolder}>
				<input
					type="text"
					placeholder="Heading"
					value={todo.title}
					onChange={(e) =>
						setTodo({ ...todo, title: e.target.value })
					}
				/>
				<input
					type="text"
					placeholder="Description"
					value={todo.description}
					onChange={(e) =>
						setTodo({ ...todo, description: e.target.value })
					}
				/>
				<input
					type="date"
					value={todo.dueDate}
					onChange={(e) =>
						setTodo({ ...todo, dueDate: e.target.value })
					}
				/>
				<select
					name="priority"
					value={todo.priority}
					onChange={(e) =>
						setTodo({
							...todo,
							priority: e.target.value as
								| "Low"
								| "Medium"
								| "High",
						})
					}
				>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
				<select
					name="status"
					value={todo.status}
					onChange={(e) =>
						setTodo({
							...todo,
							status: e.target.value as
								| "Pending"
								| "In Progress"
								| "Completed",
						})
					}
				>
					<option value="Pending">Pending</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
				<button onClick={handleAddTodo}>Add Task</button>
			</div>
			<TaskList todos={todos} setTodos={setTodos} />
		</>
	);
};

export default App;
