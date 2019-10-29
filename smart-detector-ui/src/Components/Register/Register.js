import React, { Component } from 'react';
import './Register.css';

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmitRegistration = () => {
        let registraionData = {
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }

        if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
            alert("Please provide valid credentials.")
        }
        else {
            fetch('https://guarded-bastion-64378.herokuapp.com/register/', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(registraionData)
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRoutChange('home')
                    }
                    else {
                        alert("User already registered. Try Login")
                    }
                }
                )
        }

    }

    render() {
        return (
            <div className="completeForm">
                <div className="signInForm">
                    <h2>Registration</h2>
                    <div className="name">
                        <label className="labelHere">Name:</label>
                        <input type='text'
                            className="inputtage"
                            placeholder="  Enter Name"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div className="email">
                        <label className="labelHere">Email:</label>
                        <input type='email'
                            className="inputtage"
                            placeholder="  Enter Email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div>
                        <label className="labelHere">Password:</label>
                        <input type='password'
                            className="inputtage"
                            placeholder="  Enter Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <button type="submit" className="register" onClick={this.onSubmitRegistration}>Register</button>
                    </div>

                    <div>
                        <button className="registerLabel" onClick={() => this.props.onRoutChange('signIn')}>{"<- back to Sign In"}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
