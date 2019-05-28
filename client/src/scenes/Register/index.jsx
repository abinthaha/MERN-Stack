import React from 'react';
import axios from 'axios';
import ListUsersComponent from './ListUsers';
import RegisterFormComponent from './RegisterForm';
import { connect } from 'react-redux';

import { getUserList } from './data/action';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditUser: false,
            listUsers: [],
            editUser: {
                name: 'sdasd',
                email: 'asd@sdad.com',
                password: 'asdsdasdsads'
            }
        }
        this.editUser = this.editUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    componentDidMount() {
        this.fetchUserList();
    }

    fetchUserList() {
        axios.get('http://localhost:5000/api/users')
        .then(response => {
            this.setState({
                ...this.state,
                listUsers: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
        // this.props.getUserList();
    }

    editUser(data) {
        const { email } = data;
        const editUser = this.state.listUsers.filter(user => user.email === email);
        this.setState({
            ...this.state,
            isEditUser: true,
            editUser: editUser[0]
        })
    }

    deleteUser(data) {
        debugger;
        axios.delete('http://localhost:5000/api/users', data)
        .then(response => {
            this.fetchUserList();
        })
        .catch(error => {
            // const { errors } = error.response.data;
            console.log(error);
            // alert(errors[0].msg)
        });
    }

    registerUser(data) {
        if (this.state.isEditUser) {
            this.updateUserDetails(data);
            return;
        }
        axios.post('http://localhost:5000/api/users', data)
        .then(response => {
            localStorage.setItem('token', response.token);
            this.fetchUserList();
        })
        .catch(error => {
            const { errors } = error.response.data;
            console.log(errors);
            alert(errors[0].msg)
        });
    }

    updateUserDetails(data) {
        axios.put('http://localhost:5000/api/users', data)
        .then(response => {
            this.fetchUserList();
        })
        .catch(error => {
            const { errors } = error.response.data;
            console.log(errors);
            alert(errors[0].msg)
        });
    }

    cancelEdit() {
        this.setState({
            ...this.state,
            editUser: {},
            isEditUser: false,
        })
    }

    render() {
        return (
            <main className='main-wrapper'>
                <RegisterFormComponent
                    registerUser={this.registerUser}
                    cancelEdit={this.cancelEdit}
                    isEditUser={this.state.isEditUser}
                    editUser={this.state.editUser}
                />

                <ListUsersComponent
                    listUsers={this.state.listUsers}
                    editUser={this.editUser}
                    deleteUser={this.deleteUser}
                />
            </main>
        )
    }
}




const mapStateToProps = state => ({
    count: state.registerReducer.count
})

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => dispatch(getUserList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);