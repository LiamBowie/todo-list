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

    return (
        <div>
            {showModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <input 
                            type="text" 
                            className="border w-full p-2 rounded-md outline-none mb-8"
                            value={newTask}
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
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="bg-orange-500 rounded-md text-white py-3 px-6"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Add
                                    </button>
                                </>
                            )}
                        </div>
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
    )
}

export default ToDoList;