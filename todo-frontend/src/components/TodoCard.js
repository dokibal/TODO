import React from "react";
import "./TodoCard.css"
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

            await TodoService.removeTodo(this.state.todo.id);
            this.props.refresh();
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="card mb-2 ">

                <div className="card-body row no-gutters">
                    <div className="col-md-1 text-center my-auto">
                        {
                            //Do not show checkbox for an empty TODO
                            this.state.todo.id ?
                                <input className="form-check-input" type="checkbox" checked={this.state.todo.done} onChange={this.toggleTodoDone}></input>
                                :
                                <div></div>
                        }
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <input className="form-control" type="text" value={this.state.todo.activity} onChange={this.editActivity} onKeyPress={this.activityKeyPress} />
                            <div className="date">{this.state.creationDate}</div>
                        </div>
                    </div>
                    <div className="col-md-1 text-center my-auto">
                        {
                            this.state.todo.id ?
                                <div className="removeIcon bi-x-circle-fill bi-2x" onClick={this.remove}></div> :
                                <button type="button" className="btn btn-primary" onClick={this.save}>Add</button>
                            
                            }
                    </div>
                </div>
            </div>
        )
    }
}
export default TodoCard;