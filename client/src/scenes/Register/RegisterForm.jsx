import React, { Component } from 'react';

import './styles/index.scss';

class RegisterFormComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'sd',
            email: 'sd',
            password: 'sad'
        }
        this.submitForm = this.submitForm.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.cancelRegistration = this.cancelRegistration.bind(this);
    }

    componentDidMount() {
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.editUser) {
            let { name, email, password } = nextProps.editUser;
            password = '';
            this.setState({
                ...this.state,
                name,
                email,
                password,
                isEditUser: nextProps.isEditUser
            })
        }
    }

    onTextChange(type, ev) {
        this.setState({
            ...this.state,
            [type]: ev.target.value
        })
    }

    submitForm(ev) {
        ev.preventDefault();
        const { name, email, password } = this.state;
        const data = {
            name,
            email,
            password
        };
        this.props.registerUser(data);
    }

    cancelRegistration() {
        this.setState({
            ...this.state,
            name: '',
            email: '',
            password: ''
        }, () => {
            this.props.cancelEdit();
        })
    }

    render() {
        return (
            <form className='register-form' onSubmit={ev => this.submitForm(ev)}>
                <div 
                    className='form-row'
                    value={this.state.name}
                    onChange={ev => this.onTextChange('name', ev)}
                >
                    <label>Name</label>
                    <input type="text" required/>
                </div>
                <div 
                    className='form-row'
                    value={this.state.email}
                    onChange={ev => this.onTextChange('email', ev)}
                >
                    <label>Email</label>
                    <input type="email" required/>
                </div>
                <div 
                    className='form-row'
                    value={this.state.password}
                    onChange={ev => this.onTextChange('password', ev)}
                >
                    <label>Password</label>
                    <input type="password" required/>
                </div>
                <div className='form-footer'>
                    <input type="submit" name="" id="submit-btn" value="Submit"/>
                    <input type="button" name="" id="cancel-btn" value="Cancel" onClick={ev => this.cancelRegistration()} />
                </div>
            </form>
        )
    }
}

export default RegisterFormComponent;