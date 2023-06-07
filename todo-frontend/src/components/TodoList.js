import TodoService from "../services/TodoService";
import React, { Component } from "react"
import TodoCard from './TodoCard.js'

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        TodoService.GetTodos().then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">TODO List</h2>
                <div className="container-lg">
                    {
                        this.state.todos.map((todo) => {
                            return (
                                <TodoCard todo={todo} key={todo.id}/>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default TodoList;