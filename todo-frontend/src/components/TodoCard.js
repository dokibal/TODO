import React, { Component } from "react";
import "./TodoCard.css"

class TodoCard extends React.Component {

    constructor(props){
        super(props);

        if(this.props.todo){
            this.state={
                done: props.todo.done,
                activity: props.todo.activity,
                new: false
            };
        }
        else{
            this.state={
                done: false,
                activity: "",
                new: true
            };
        }
    }

    toggleTodoDone = (event) => {
        this.setState({
            done:event.target.checked
        });
    };

    editActivity = (event) => {
        this.setState({
            activity:event.target.value
        });
    };

    render() {
        return (
            <div className="card mb-2 ">
                <div className="row no-gutters">
                    <div className="col-md-1 text-center my-auto">
                        <input className="form-check-input" type="checkbox" checked={this.state.done} onChange={this.toggleTodoDone}></input>
                    </div>
                    <div className="col-md-11">
                        <div className="card-body">
                        <input className="form-control" type="text" value={this.state.activity} onChange={this.editActivity}/>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default TodoCard;