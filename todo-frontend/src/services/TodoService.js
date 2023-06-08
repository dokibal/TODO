import axios from 'axios';

const TODO_API_BASE_URL = "http://localhost:8080/api/v1";
const TODO_API_GENERAL_TODOS_URL = TODO_API_BASE_URL + "/todos";
const TODO_API_STATUS_TODOS_URL = TODO_API_BASE_URL + "/todosByStatus";

class TodoService {

    getTodos() {
        return axios.get(TODO_API_GENERAL_TODOS_URL);
    }

    getTodosByStatus(done) {
        return axios.get(TODO_API_STATUS_TODOS_URL, {
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