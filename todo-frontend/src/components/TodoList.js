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
        TodoService.getTodos().then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    refresh = () =>{
        TodoService.getTodos().then(res => {
            this.setState({
                todos: res.data
            });
        });
        console.log("refresh");
    }

    render() {
        return (
            <div>
                <h2 className="text-center">TODO List</h2>
                <div className="container-lg">
                    <TodoCard refresh={this.refresh} key={0}/>
                    {
                        this.state.todos.map((todo) => {
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