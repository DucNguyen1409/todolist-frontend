import axios from "axios";
import { API_AUTH, API_TODOS, FLASH } from "../utils/ApiConstants";

// API authenticate
export const registerUserAPI = async (endpoint, requestData) => {
    return await axios.post(`${API_AUTH.API_REGISTER_LOGIN}${FLASH}${endpoint}`, requestData);
}

// API Todo
export const fetchToDosAPI = async (userId) => {
    return await axios.get(`${API_TODOS.API_GET_TODOS}${FLASH}${userId}`)
}

export const createToDoAPI = async (requestData) => {
    return await axios.post(`${API_TODOS.API_CREATE_TODOS}`, requestData)
}

export const editToDoTask = async (taskId, requestData) => {
    return await axios.put(`${API_TODOS.API_EDIT_TODOS}${FLASH}${taskId}`, requestData)
}

export const deleteToDoTask = async (taskId) => {
    return await axios.delete(`${API_TODOS.API_DELETE_TODOS}${FLASH}${taskId}`)
}

export const updateToDoStatus = async (taskId, status) => {
    return await axios.patch(`${API_TODOS.API_UPDATE_STATUS}${FLASH}${taskId}?status=${status}`, {})
}
