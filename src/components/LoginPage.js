import React from 'react'
import './LoginPage.css'
import UserService from '../services/UserService';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                userName: ""
            },
            loading: false
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

    activityKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    toggleLoading = (loading) => {
        this.setState({
            loading: loading
        });
    }

    login = async (event) => {

        //Check emptiness of user name.
        if (!this.state.user.userName) {
            console.log("User name is empty string. It is an invalid user name.")
            return;
        }

        this.toggleLoading(true);

        //If the user does not exist then create a new user
        let user = await UserService.getUserByName(this.state.user.userName);
        if (!user.id) {
            console.log("No user exists with the given user name. Creating new user...");
            user = await UserService.addUser(this.state.user);
        }

        this.toggleLoading(false);

        if (user && user.id) {
            this.props.navigate('/todos/' + user.id);
        }
        else {
            console.log("Unable to obtain the id of the user.");
        }
    }

    render() {
        return (
            this.state.loading ?
                <div className="centered-content">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div> :
                <div className="centered-content">
                    <input
                        className="userTextBox form-control"
                        type="text"
                        value={this.state.user.userName}
                        onChange={this.typeUserName}
                        onKeyPress={this.activityKeyPress}
                        placeholder='User name'
                    />
                    <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                </div>
        )
    }
}
export default LoginPage;