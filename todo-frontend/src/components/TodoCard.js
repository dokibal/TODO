import React, { Component } from "react";
import "./TodoCard.css"
import TodoService from "../services/TodoService";

class TodoCard extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.todo) {
            this.state = {
                todo: {
                    id: props.todo.id,
                    done: props.todo.done,
                    activity: props.todo.activity,
                }
            };
        }
        else {
            this.state = {
                todo: {
                    id: 0,
                    done: false,
                    activity: "",
                }
            };
        }
    }

    toggleTodoDone = (event) => {
        this.setState({
            todo: {
                ...this.state.todo,
                done: event.target.checked
            }
        });
    };

    editActivity = (event) => {
        console.log(this.state.todo.id);
        this.setState({
            todo: {
                ...this.state.todo,
                activity: event.target.value
            }
        });
    };

    save = (event) => {
        if (event.key === 'Enter') {
            TodoService.saveTodo(this.state.todo).then(res => {
                if (!this.state.todo.id) {
                    //Empty the component
                    this.setState({
                        todo: {
                            id: 0,
                            done: false,
                            activity: ""
                        }
                    })
                }
                this.props.refresh();
            })
            console.log('Enter billentyű lenyomva');
        }
    };

    remove = (event) => {
        event.preventDefault();
        TodoService.removeTodo(this.state.todo.id).then(res => {
            this.props.refresh();
        });
    }

    render() {
        return (
            <div className="card mb-2 ">
                <div className="row no-gutters">
                    <div className="col-md-1 text-center my-auto">
                        <input className="form-check-input" type="checkbox" checked={this.state.todo.done} onChange={this.toggleTodoDone}></input>
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <input className="form-control" type="text" value={this.state.todo.activity} onChange={this.editActivity} onKeyPress={this.save} />

                        </div>
                    </div>
                    {
                        this.state.todo.id ? 
                        <div className="col-md-1 text-center my-auto">
                            <div className="removeIcon bi-x-circle-fill bi-2x" onClick={this.remove}></div>
                        </div> : 
                        <div></div>
                    }
                </div>
            </div>
        )
    }
}
export default TodoCard;