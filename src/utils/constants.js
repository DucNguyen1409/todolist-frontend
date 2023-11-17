export const API_URL = 'http://localhost:8080/api/v1';
export const FLASH = '/';

// TO DO API
export const PREFIX_TODOS = "/todos";
export const API_TODOS = {
    API_GET_TODOS: API_URL + PREFIX_TODOS + "/by-user",
    API_CREATE_TODOS: API_URL + PREFIX_TODOS,
    API_EDIT_TODOS: API_URL + PREFIX_TODOS,
    API_DELETE_TODOS: API_URL + PREFIX_TODOS,
    API_UPDATE_STATUS: API_URL + PREFIX_TODOS
};

// AUTH API
export const API_AUTH = {
    API_REGISTER_LOGIN: API_URL + "/auth"
}