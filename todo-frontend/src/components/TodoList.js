import TodoService from "../services/TodoService";
import React from "react"
import TodoCard from './TodoCard.js'

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            undoneTodos: [],
            doneTodos: []
        };
    }

    loadTodos = () =>{
        TodoService.getTodosByStatus(false).then(res => {
            this.setState({
                undoneTodos: res.data
            });
        });
        TodoService.getTodosByStatus(true).then(res => {
            this.setState({
                doneTodos: res.data
            });
        });
    }

    componentDidMount() {
        this.loadTodos();
    }

    refresh = () =>{
        this.loadTodos();
    }

    render() {
        return (
            <div>
                <h2 className="text-center">TODO List</h2>
                <div className="container-lg">
                    <TodoCard refresh={this.refresh} key={0}/>
                    {
                        this.state.undoneTodos.map((todo) => {
                            console.log(todo.creationDate);
                            return (
                                <TodoCard refresh={this.refresh} todo={todo} key={todo.id}/>
                                )
                        })
                    }
                    {
                        this.state.doneTodos.map((todo) => {
                            console.log(todo.creationDate);
                            return (
                                <TodoCard refresh={this.refresh} todo={todo} key={todo.id}/>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default TodoList;