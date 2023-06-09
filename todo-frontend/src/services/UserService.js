import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const USER_API_BASE_URL = API_BASE_URL + "/users";

class UserService {
    addUser(user){
        axios.post(USER_API_BASE_URL, user);
    }
}
export default new UserService();