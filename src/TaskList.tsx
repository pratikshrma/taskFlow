import React, { useState } from 'react'
import style from './styles/TaskList.module.css'

import { Todo } from './modal'


interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TaskList: React.FC<Props> = ({ todos, setTodos }) => {
    const [isEditingList, setIsEditingList] = useState<string[]>([])
    const tempEdits: Map<string, Todo> = new Map()
    //make this tempEdits work for now on every rerender it is reinitializing it and that is what removing the cache

    const handleDeleteTodo = (target_todo_id: string): void => {
        const modifiedTodos: Todo[] = todos.filter((todo: Todo) => {
            if (todo.id !== target_todo_id) {
                return todo
            }
        })
        setTodos(modifiedTodos)
    }

    const handleEditButton = (todo_id: string): void => {
        setIsEditingList((p: string[]) => [...p, todo_id])
        const todoObject = todos.find((todo: Todo) => {
            if (todo.id === todo_id) return true
        })
        if (todoObject) {
            tempEdits.set(todo_id, todoObject)
            console.log(todo_id)
        } else {
            console.warn(`Todo Object with id #${todo_id} not found`)
        }
    }

    const handleSaveButton = (todo_id: string): void => {
        const modifiedIsEditingList = isEditingList.filter((id: string) => {
            if (todo_id !== id) return true
        })
        setIsEditingList(modifiedIsEditingList)
    }
    const handleCancelButton = (todo_id: string): void => {
        const modifiedTodos: Todo[] = todos.map((todo: Todo) => {
            if (todo.id === todo_id) {
                console.log(tempEdits.get(todo_id), tempEdits)
                return tempEdits.get(todo_id) || todo
            }
            return todo
        })
        setTodos(modifiedTodos)
        // tempEdits.delete(todo_id)
        handleSaveButton(todo_id)
    }

    const handleEdit = <k extends keyof Todo>(todo_id: string, prop_name: k, new_value: Todo[k]): void => {
        setTodos((todos: Todo[]) => {
            return todos.map((todo: Todo) => {
                if (todo.id === todo_id) {
                    return {
                        ...todo,
                        [prop_name]: new_value
                    }
                }
                return todo
            })
        })
    }


    return (
        <>
            <div className={style.taskListHolder}>
                <div className={style.row}>
                    <div>Title</div>
                    <div>Description</div>
                    <div>Due Date</div>
                    <div>Priority</div>
                    <div>Status</div>
                </div>

                {todos.map((todo, index) => {
                    //check if todo.id is in the isEditingList
                    const check = isEditingList.find((todo_id: string) => {
                        if (todo.id === todo_id) return true
                    })
                    if (check) {
                        //now we are in the editing mode 
                        return (
                            <div className={style.row} key={index}>
                                <div><input type="text" value={todo.title} onChange={(e) => handleEdit(todo.id, 'title', e.target.value)} /></div>
                                <div><input type="text" value={todo.description} onChange={(e) => handleEdit(todo.id, 'description', e.target.value)} /></div>
                                <div><input type="date" value={todo.dueDate} onChange={(e) => handleEdit(todo.id, 'dueDate', e.target.value)} /></div>
                                <div>
                                    <select name="priority" value={todo.priority} onChange={e => handleEdit(todo.id, 'priority', e.target.value as | 'Low' | 'Medium' | 'High')}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div>{todo.status}</div>
                                <div className={style.deleteButton} onClick={() => handleDeleteTodo(todo.id)}>Delete</div>
                                <div className={style.deleteButton} onClick={() => handleSaveButton(todo.id)}>Save</div>
                                <div className={style.deleteButton} onClick={() => handleCancelButton(todo.id)}>Cancel</div>
                            </div>
                        )
                    } else {
                        //just display normally
                        return (
                            <div className={style.row} key={index}>
                                <div>{todo.title}</div>
                                <div>{todo.description}</div>
                                <div>{todo.dueDate}</div>
                                <div>{todo.priority}</div>
                                <div>{todo.status}</div>
                                <div className={style.deleteButton} onClick={() => handleDeleteTodo(todo.id)}>Delete</div>
                                <div className={style.deleteButton} onClick={() => handleEditButton(todo.id)}>Edit</div>
                            </div>
                        )
                    }


                })}
            </div >
        </>
    )
}

export default TaskList