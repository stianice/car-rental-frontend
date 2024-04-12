import axios from 'axios'
import Router from '../router'

const API_BASE_URL = import.meta.env.VITE_APP_API_ENDPOINT || 'http://localhost:3000/api/v1';

export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const setToken = (token) => {
    sessionStorage.setItem('token', token);
}

export const decodeToken = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) { 
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        login(response.data.data.email, userData.password, 'User');
        
    } catch (err) {
        console.log(err);
       
    }
}

export const login = async (email, password, userType) => {
    const loginData = {
        'email': email,
        'password': password,
    };

    try {
        if(userType === 'User'){
            const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
            const token = response.data.data;
            setToken(token);
            // redirect to user account 
            Router.push('/useraccount');
        }else if(userType === 'Manager'){
            const response = await axios.post(`${API_BASE_URL}/managers/login`, loginData);
            const token = response.data.data;
            setToken(token);
            Router.push('/manager');
        }
        
    } catch (err) {
      
       
      
    }
}

export const logout = () => {
    sessionStorage.clear();
    Router.push('/login');
}

