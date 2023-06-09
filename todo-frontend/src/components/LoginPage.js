import React from 'react'
import './LoginPage.css'
import UserService from '../services/UserService';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: ""
            }
        }
    }

    typeUserName = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                userName: event.target.value
            }
        })
    }

    login = (event) => {
        UserService.addUser(this.state.user);
        
        this.props.navigate('/todos');
    }

    render() {
        return (
            <div className="centered-content">
                <input
                    className="userTextBox form-control"
                    type="text"
                    value={this.state.user.userName}
                    onChange={this.typeUserName}
                    placeholder='User name'
                />
                <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
            </div>
        )
    }
}
export default LoginPage;