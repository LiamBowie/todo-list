import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted } from "../ToDoSlice";
import { selectTodoList, selectSortCriteria } from "../ToDoSlice";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";


const ToDoList = () => { 
    const dispatch = useDispatch();
    const todoList = useSelector(selectTodoList);
    const sortCriteria = useSelector(selectSortCriteria);
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            {showModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-slate-50 flex items-center justify-center">
                    
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