import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } from "../ToDoSlice";
import { selectTodoList, selectSortCriteria } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";


const ToDoList = () => { 
    const dispatch = useDispatch();
    const todoList = useSelector(selectTodoList);
    const sortCriteria = useSelector(selectSortCriteria);
    const [showModal, setShowModal] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        if(todoList.length > 0) {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }, [todoList]);

    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem("todoList"));
        if(localTodoList) {
            dispatch(setTodoList(localTodoList));
        }
    }, []);

    const handleAddTodo = (task) => { 
        if(task.trim().length === 0) { 
            alert("Please enter a task");
        } else { 
            dispatch(addTodo({
                task: task,
                id: Date.now()
            }))
        }
        setNewTask("");
    }
    
    const handleSort = (sortCriteria) => { 
        dispatch(sortTodo(sortCriteria));
    }
    const sortToDoList = todoList.filter((todo) => { 
        if (sortCriteria === "All") return true;
        if (sortCriteria === "Completed" && todo.completed) return true;
        if (sortCriteria === "Not Completed" &&!todo.completed) return true;
        return false;
    });

    return (
        <div>
            {showModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded-md outline-none mb-8"
                            value={newTask}
                            onChange={(e) => {setNewTask(e.target.value)}}
                            placeholder={currentTodo ? "Update your task here" : "Enter your task here"} />
                        <div className="flex justify-between">
                            {currentTodo ? (
                                <>
                                    <button 
                                        className="bg-orange-500 rounded-md text-white py-3 px-6"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="bg-teal-700 rounded-md text-white py-3 px-6"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        className="bg-teal-700 rounded-md text-white py-3 px-6"
                                        onClick={() => {setShowModal(false)}}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="bg-orange-500 rounded-md text-white py-3 px-6"
                                        onClick={() => {
                                            setShowModal(false);
                                            handleAddTodo(newTask);
                                        }}
                                    >
                                        Add
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="flex items-center justify-center flex-col">
                {todoList.length === 0 ? (
                    <div className="my-8 text-center text-gray-500">
                            You have nothing on your todo list! 
                    </div>
                ) : (
                    <div className="container mx-auto mt-6">
                        <div>
                            {sortToDoList.map((todo) => (
                                <div key={todo.id} className="flex items-center justify-between mb-6 bg-sky-100 mx-auto w-full md:w-[75%] rounded-md p-4">
                                    <div>{todo.task}</div>
                                    <div>
                                        <button className="bg-amber-400 text-white p-1 rounded-md ml-2">
                                            <TiPencil />
                                        </button>
                                        <button className="bg-red-400 text-white p-1 rounded-md ml-2">
                                            <BsTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button 
                    className="bg-orange-500 text-center text-white py-3 px-10 rounded-md"
                    onClick={() => setShowModal(true)}
                >
                    Add Task
                </button>
            </div>
        </div>
    )
}

export default ToDoList;