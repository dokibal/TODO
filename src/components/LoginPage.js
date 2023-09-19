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

    activityKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.login();
        }
    };

    login = async (event) => {

        //Check emptiness of user name.
        if(!this.state.user.userName){
            console.log("User name is empty string. It is an invalid user name.")
            return;
        }
        //If the user does not exist then create a new user
        let user = await UserService.getUserByName(this.state.user.userName);
        if(!user.id){
            console.log("No user exists with the given user name. Creating new user...");
            user = await UserService.addUser(this.state.user);
        }

        if(user && user.id){
            this.props.navigate('/todos/'+user.id);
        }
        else{
            console.log("Unable to obtain the id of the user.");
        }
    }

    render() {
        return (
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