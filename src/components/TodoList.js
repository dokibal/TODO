import TodoService from "../services/TodoService";
import UserService from "../services/UserService";
import React from "react"
import TodoCard from './TodoCard.js'
import "./TodoList.css"
import { useParams } from 'react-router-dom';

//Trick to wrap TodList class component inside a function component so that we can use the useParams hook
function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            undoneTodos: [],
            doneTodos: [],
            showUndoneTodos: true,
            showDoneTodos: true
        };
    }

    loadUser = async () => {
        try {
            const res = await UserService.getUserById(this.props.params.userId);
            this.setState({
                user: res,
                emptyTodo:
                {
                    id: 0,
                    activity: "",
                    done: false,
                    user: res,
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    loadTodos = async () => {
        try {
            //Handle done TODOs and undone TODOs separately
            const undoneTodos = await TodoService.getTodosByStatus(this.props.params.userId, false);
            this.setState({
                undoneTodos: undoneTodos.data
            });
            const doneTodos = await TodoService.getTodosByStatus(this.props.params.userId, true);
            this.setState({
                doneTodos: doneTodos.data
            });
        }
        catch (error) {

        }
    }

    async componentDidMount() {
        await this.loadUser();
        await this.loadTodos();
    }

    refresh = async () => {
        await this.loadTodos();
    }

    logout = () => {
        this.props.navigate(-1);
    };

    toggleDoneTodoVisibility = (event) => {
        this.setState({
            showDoneTodos: event.target.checked
        });
    };

    toggleUndoneTodoVisibility = (event) => {
        this.setState({
            showUndoneTodos: event.target.checked
        });
    };

    render() {
        return (
            <div>
                <div className="container-lg">
                    <div className="right-aligner">
                        <div className="user-name-div">
                            {this.state.user?.userName}
                        </div>
                        <div
                            className="logout-icon bi-2x bi-box-arrow-right"
                            onClick={this.logout}
                        ></div>
                    </div>
                    <TodoCard user={this.state.user} refresh={this.refresh} key={0} />
                    <div className="spacer"></div>
                    <div className="right-aligner">
                        <input
                            className="form-check-input todo-checkbox"
                            id="undoneTodoCheckbox"
                            type="checkbox"
                            checked={this.state.showUndoneTodos}
                            onChange={this.toggleUndoneTodoVisibility}
                        >
                        </input>
                        <label htmlFor="undoneTodoCheckbox" style={{ marginRight: 20 }}> Show active tasks</label>
                        <input
                            className="form-check-input todo-checkbox"
                            type="checkbox"
                            checked={this.state.showDoneTodos}
                            onChange={this.toggleDoneTodoVisibility}
                        >
                        </input>
                        <label htmlFor="doneTodoCheckbox"> Show finished tasks</label>
                    </div>
                    <div className="spacer"></div>
                    {
                        this.state.showUndoneTodos ?
                            <div>
                                <h4>Active tasks</h4>
                                {this.state.undoneTodos.map((todo) => {
                                    return (
                                        <TodoCard user={this.state.user} refresh={this.refresh} todo={todo} key={todo.id} />
                                    )
                                })
                                }
                                <div className="spacer"></div>
                            </div> :
                            <div></div>

                    }
                    {
                        this.state.showDoneTodos ?
                            <div>
                                <h4>Finished tasks</h4>
                                {this.state.doneTodos.map((todo) => {
                                    return (
                                        <TodoCard user={this.state.user} refresh={this.refresh} todo={todo} key={todo.id} />
                                    )
                                })
                                }
                            </div> :
                            <div></div>
                    }
                </div>
            </div>
        )
    }
}
export default withParams(TodoList);