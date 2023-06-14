import TodoService from "../services/TodoService";
import UserService from "../services/UserService";
import React from "react"
import TodoCard from './TodoCard.js'
import "./TodoList.css"
import { useParams,useNavigate } from 'react-router-dom';

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
            doneTodos: []
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
                    user: res
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

    render() {
        return (
            <div>
                <div className="container-lg">
                    <div className="header">
                        <div 
                        className="logoutIcon bi-2x bi-box-arrow-right"
                        onClick={this.logout}
                        ></div>
                    </div>
                    <TodoCard user={this.state.user} refresh={this.refresh} key={0} />
                    {
                        this.state.undoneTodos.map((todo) => {
                            return (
                                <TodoCard user={this.state.user} refresh={this.refresh} todo={todo} key={todo.id} />
                            )
                        })
                    }
                    <div className="spacer"></div>
                    {
                        this.state.doneTodos.map((todo) => {
                            return (
                                <TodoCard user={this.state.user} refresh={this.refresh} todo={todo} key={todo.id} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default withParams(TodoList);