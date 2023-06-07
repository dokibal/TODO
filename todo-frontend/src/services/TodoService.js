import axios from 'axios';

const TODO_API_BASE_URL = "http://localhost:8080/api/v1/todos";

class TodoService{

    getTodos(){
        return axios.get(TODO_API_BASE_URL);
    }

    saveTodo(todo){
        if(todo.id){
            let url = TODO_API_BASE_URL+ "/" + todo.id;
            return axios.put(url, todo);
        }
        else{
            return axios.post(TODO_API_BASE_URL, todo);
        }
    }
    
    removeTodo(id){
        let url = TODO_API_BASE_URL+ "/" + id;
        return axios.delete(url);
    }
}
export default new TodoService();