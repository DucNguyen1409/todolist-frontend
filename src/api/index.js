import axios from "axios";
import { API_AUTH, API_TODOS, FLASH } from "../utils/constants";

// API authenticate
export const registerUserAPI = async (endpoint, requestData) => {
    const response = await axios.post(`${API_AUTH.API_REGISTER_LOGIN}${FLASH}${endpoint}`, requestData, {
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    return response.data;
}

// API Todo
export const fetchToDosAPI = async (userId, accessToken) => {
    const response = await axios.get(`${API_TODOS.API_GET_TODOS}${FLASH}${userId}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return response.data; // axios return props is data.
}

export const createToDoAPI = async (requestData, accessToken) => {
    const response = await axios.post(`${API_TODOS.API_CREATE_TODOS}`, 
        requestData, 
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
}

export const editToDoTask = async (taskId, requestData, accessToken) => {
    const response = await axios.put(`${API_TODOS.API_EDIT_TODOS}${FLASH}${taskId}`, 
        requestData, 
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
}

export const deleteToDoTask = async (taskId, accessToken) => {
    const response = await axios.delete(`${API_TODOS.API_DELETE_TODOS}${FLASH}${taskId}`, 
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
}

export const updateToDoStatus = async (taskId, status, accessToken) => {
    const response = await axios.patch(`${API_TODOS.API_UPDATE_STATUS}${FLASH}${taskId}?status=${status}`, 
        {}, 
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
}
