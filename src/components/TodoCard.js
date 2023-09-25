import React from "react";
import "./TodoCard.css"
import "./LoginPage.css"
import TodoService from "../services/TodoService";

class TodoCard extends React.Component {

    constructor(props) {
        super(props);

        //Existing TODO
        if (props.todo && props.todo.id) {
            this.state = {
                todo: props.todo,
                creationDate: new Date(props.todo.creationDate).toLocaleString()
            };
        }
        //Empty TODO candidate
        else {
            this.state = {
                todo: {
                    activity: "",
                    done: false,
                    user: null
                },
                loading: false
            };
        }
    }

    toggleLoading = (loading) => {
        this.setState({ loading: loading });
    }

    toggleTodoDone = (event) => {
        this.setState({
            todo: {
                ...this.state.todo,
                done: event.target.checked
            }
        },
            //Save TODO immediately
            () => {
                this.save()
            }
        );
    };

    editActivity = (event) => {
        this.setState({
            todo: {
                ...this.state.todo,
                activity: event.target.value
            }
        });
    };

    save = async () => {
        let todoToSave = {
            ...this.state.todo,
            user: this.props.user
        }
        try {
            this.toggleLoading(true);
            await TodoService.saveTodo(todoToSave);
            if (!this.state.todo.id) {
                //Empty the component so that it can be used for another new TODO
                this.setState({
                    todo: {
                        id: 0,
                        done: false,
                        activity: ""
                    },
                    creationDate: null
                })
            }
            //Get all the TODOs in the list as we have a new TODO
            this.props.refresh();
            this.toggleLoading(false);
        }
        catch (err) {
            console.log(err);
        }

    }

    activityKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.save();
        }
    };

    remove = async (event) => {
        event.preventDefault();
        try {
            this.toggleLoading(true);
            await TodoService.removeTodo(this.state.todo.id);
            this.props.refresh();
            this.toggleLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className={"card mb-2 " + (this.state.todo.done ? "done" : "undone")}>
                {
                    this.state.loading ?
                        <div className="centered-content loading-spinner">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                        :
                        <div></div>
                }
                <div className="card-body d-flex flex-row justify-content-between align-items-center">
                    <div>
                        {
                            // Do not show checkbox for an empty TODO
                            this.state.todo.id ?
                                <div className="custom-control form-control-lg custom-checkbox">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={this.state.todo.done}
                                        onChange={this.toggleTodoDone}
                                    >
                                    </input>
                                </div>
                                :
                                <div></div>
                        }
                    </div>
                    <div className="flex-grow-1">
                        <div className="card-body">
                            <input
                                className="form-control"
                                type="text"
                                disabled={this.state.todo.done}
                                value={this.state.todo.activity}
                                onChange={this.editActivity}
                                onKeyPress={this.activityKeyPress}
                                placeholder="Write new task..."
                            />
                        </div>
                    </div>
                    <div>
                        {
                            this.state.todo.id ?
                                <div className="removeIcon bi-trash bi-2x" onClick={this.remove}></div> :
                                <button type="button" className="btn btn-primary" onClick={this.save}>Add</button>
                        }
                    </div>
                </div>
                <div className="date text-end mt-2 right-margin">
                    {this.state.creationDate}
                </div>

            </div>

        )
    }
}
export default TodoCard;