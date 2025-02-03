import { RiDeleteBin6Line } from "react-icons/ri";
import "./index.css"

const TodoItem = (props) => {
    const {todo, deleteTodo, onStatusChange} = props
    const {id,content, isChecked} = todo
    const onDelete = () => {
        deleteTodo(id)
    }

    const changeStatus = () => {
        onStatusChange(id)
    }

    return (
        <li className="todo-list-item">
            <div>
                <input id={`checkbox-${id}`} type="checkbox" onChange={changeStatus} className="checkbox" checked={isChecked}/>
                <label htmlFor={`checkbox-${id}`} className={isChecked ? "completed" : ''}>{content}</label>
            </div>
            <button type="button" onClick={onDelete} className="delete-btn"><RiDeleteBin6Line /></button>
        </li>
    )
}

export default TodoItem