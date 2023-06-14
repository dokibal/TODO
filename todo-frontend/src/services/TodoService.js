import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const TODO_API_GENERAL_TODOS_URL = API_BASE_URL + "/todos";
const TODO_API_STATUS_TODOS_URL = API_BASE_URL + "/todosByStatus";

class TodoService {

    getTodos(userId) {
        return axios.get(TODO_API_GENERAL_TODOS_URL + "/" + userId);
    }

    getTodosByStatus(userId, done) {
        return axios.get(TODO_API_STATUS_TODOS_URL + "/" + userId, {
            params: {
                done: done
            }
        }
        );
    }

    saveTodo(todo) {
        if (todo.id) {
            let url = TODO_API_GENERAL_TODOS_URL + "/" + todo.id;
            return axios.put(url, todo);
        }
        else {
            return axios.post(TODO_API_GENERAL_TODOS_URL, todo);
        }
    }

    removeTodo(id) {
        let url = TODO_API_GENERAL_TODOS_URL + "/" + id;
        return axios.delete(url);
    }
}
export default new TodoService();