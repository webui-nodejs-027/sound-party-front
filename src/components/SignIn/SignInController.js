import React from 'react';
import SignIn from './SignIn';

export default class SignInController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputEmail: 'test@gmail.com',
            inputPassword: '123321Anton',
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({
            inputEmail: e.target.value
        })
    }

    handleChangePassword(e) {
        this.setState({
            inputPassword: e.target.value
        })
    }

    async handleSubmitForm(e) {
        e.preventDefault();
        const data = {
            password: this.state.inputPassword,
            email: this.state.inputEmail,
        };

        const response = await fetch('http://localhost:3001/api/users/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }

        }
        );
        const dataResponse = await response.json();
        localStorage.setItem('token', dataResponse.token);
        this.props.setAuth(true);
    }

    render() {
        return <SignIn onHandleChangeEmail={this.handleChangeEmail}
                       onHandleChangePassword={this.handleChangePassword}
                       onHandleSubmitForm={this.handleSubmitForm}
                       inputEmail={this.state.inputEmail}
                       inputPassword={this.state.inputPassword}
                       auth={this.props.auth}
                       changeStage={this.props.changeStage}
        />
    }
}
