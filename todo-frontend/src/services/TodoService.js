import axios from 'axios';

const TODO_API_BASE_URL = "http://localhost:8080/api/v1/todos";

class TodoService{

    GetTodos(){
        return axios.get(TODO_API_BASE_URL);
    }
}
export default new TodoService();