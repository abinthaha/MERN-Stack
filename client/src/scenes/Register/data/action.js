import apiService from '../../../api/apiService';

const GET_USERS = 'GET_USERS';

export function getUserList() {
    return apiService(GET_USERS, '/users', 'GET', {}, false);
}