import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from "../TodoItem"
import "./index.css"

class Todo extends Component{
    state = {newTask: "",todoList: [{id: uuidv4(), content:"Created by", isChecked: false},{id: uuidv4(), content:"Jasswanth", isChecked: false}, {id: uuidv4(), content:"using React JS", isChecked: false}]}

    componentDidMount(){
        const todo = JSON.parse(localStorage.getItem("todo"));
        if (todo !== null){
            this.setState({todoList: todo})
        }   
    }

    updateTask = (event) => {
        this.setState({newTask: event.target.value})
    }

    deleteTodo = (id) => {
        const {todoList} = this.state
        const newTodoList = todoList.filter(each => each.id !== id)

        this.setState({todoList: newTodoList})
    }

    saveTodo = () => {
        const {todoList} = this.state 
        localStorage.setItem("todo" , JSON.stringify(todoList))
    }

    onStatusChange = (id) => {
        const {todoList} = this.state
        const newTodoList = todoList.map(each => {
            if (each.id === id){
                each.isChecked = !each.isChecked
            }
            return each
        })
        this.setState({todoList: newTodoList})
    }

    addTodo = (event) => {
        event.preventDefault()

        const {newTask, todoList} = this.state
        const newTodo = {id: uuidv4(), content: newTask, isChecked: false}
        const newTodoList = [...todoList,newTodo]

        this.setState({newTask: "", todoList: newTodoList})
    }

    render(){
        const {todoList, newTask} = this.state
        return(
            
            <div className="resposive-todo-container">
                <h1>Todo</h1>
                <form onSubmit={this.addTodo}>
                    <input onChange={this.updateTask} value={newTask}  placeholder='Task Todo' className='task-input'/>
                    <button type='button' onClick={this.addTodo} className="btn btn-primary">Add</button>
                    <button type='button' onClick={this.saveTodo} className="btn btn-success">Save</button>
                </form>  
                <ul className='todo-unordered-list'>
                    {todoList.map(each => <TodoItem todo={each} key={each.id} deleteTodo={this.deleteTodo} onStatusChange={this.onStatusChange}/>)}
                </ul>
            </div>
        )
    }
}

export default Todo