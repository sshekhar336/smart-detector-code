import React, { Component } from 'react';
import './SignInForm.css'

class SignInForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        document.getElementById('loginInErrorMessage').style.display = 'none';
    }

    emailChangeHandler = (e) => {
        document.getElementById('loginInErrorMessage').style.display = 'none';
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        document.getElementById('loginInErrorMessage').style.display = 'none';
        this.setState({
            password: e.target.value
        })
    }

    onSubmitSignIn = () => {

        let signinData = {
            email: this.state.email.toLowerCase(),
            password: this.state.password
        }

        fetch('https://guarded-bastion-64378.herokuapp.com/signin/', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(signinData)
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRoutChange('home')
                }
                else {
                    document.getElementById('loginInErrorMessage').style.background = 'red';
                    document.getElementById('loginInErrorMessage').style.display = 'block';
                    //alert("Wrong Email/Password")
                }
            }
            )
    }

    render() {
        return (
            
            <div className="signInForm">
                <h2>Sign In</h2>
                <div id="loginInErrorMessage">
                    Wrong Email/Password
                </div>
                <div className="email">
                    <label className="labelHere">Email:</label>
                    <input type='text'
                        className="inputtage"
                        placeholder="  Enter Your Email Here"
                        value={this.state.email}
                        onChange={this.emailChangeHandler}
                        autoComplete="on"
                    />
                </div>
                <div>
                    <label className="labelHere">Password:</label>
                    <input type='password'
                        className="inputtage"
                        placeholder="  Enter Password"
                        value={this.state.password}
                        onChange={this.passwordChangeHandler}
                    />
                </div>
                <div>
                    <button type="submit"
                        className="signin"
                        onClick={this.onSubmitSignIn}
                    >
                        Sign In
                    </button>
                </div>

                <label>Don't have an account?</label>
                <div>
                    <button className="registerLabel" onClick={() => this.props.onRoutChange('register')}>Let's Register</button>
                </div>
            </div>

        )
    }
}

export default SignInForm
