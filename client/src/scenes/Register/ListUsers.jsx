import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles/index.scss';
// import { change } from './data/action';

class ListUsersComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUsers: []
        }
    }

    componentDidMount() {
        this.setUsers(this.props)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.count);
        this.setUsers(nextProps)
    }

    setUsers(props) {
        this.setState({
            ...this.state,
            listUsers: props.listUsers
        })
    }

    editUser(user) {
        this.props.editUser(user);
    }

    deleteUser(user) {
        this.props.deleteUser(user);
    }

    changeFnc() {
        this.props.change();
    }

    render() {
        const usersList = this.state.listUsers.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <span className='edit-user' onClick={ev => this.editUser(user)}>Edit</span>
                        <span className='edit-user' onClick={ev => this.deleteUser(user)}>Delete</span>
                    </td>
                </tr>
            )
        })
        return (
            <section>
                <h2>List Users</h2>
                <table className='list-user'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList}
                    </tbody>
                </table>
                <div>
                    <button onClick={ev => this.changeFnc()}>Increment</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    count: state.registerReducer.count
})

const mapDispatchToProps = dispatch => {
    return {
        // change: () => dispatch(change())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsersComponent);