export const baseURL = 'http://localhost:8080/api/v1';
export const FLASH = '/';

// TO DO API
export const PREFIX_TODOS = "/todos";
export const API_TODOS = {
    API_GET_TODOS: baseURL + PREFIX_TODOS + "/by-user",
    API_CREATE_TODOS: baseURL + PREFIX_TODOS,
    API_EDIT_TODOS: baseURL + PREFIX_TODOS,
    API_DELETE_TODOS: baseURL + PREFIX_TODOS,
    API_UPDATE_STATUS: baseURL + PREFIX_TODOS
};

// AUTH API
export const API_AUTH = {
    API_REGISTER_LOGIN: baseURL + "/auth"
}