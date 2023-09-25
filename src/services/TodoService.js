import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const TODO_API_GENERAL_TODOS_URL = API_BASE_URL + "/todos";
const TODO_API_STATUS_TODOS_URL = API_BASE_URL + "/todosByStatus";

class TodoService {

    toLocaleIsoString(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
    }

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
            todo.creationDate = this.toLocaleIsoString(new Date());
            return axios.post(TODO_API_GENERAL_TODOS_URL, todo);
        }
    }

    removeTodo(id) {
        let url = TODO_API_GENERAL_TODOS_URL + "/" + id;
        return axios.delete(url);
    }
}
const todoService = new TodoService();
export default todoService;