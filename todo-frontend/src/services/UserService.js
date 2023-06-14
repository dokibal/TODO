import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

class UserService {
    async addUser(user) {
        try{

            const addUserApiUrl = API_BASE_URL + "/users";
            const response = await axios.post(addUserApiUrl, user);
            return response.data;
        }
        catch(error){
            console.log("Unable to add user." + error);
            return {};
        }
    }
    async getUserById(userId) {
        try{
            const userByIdUrl = API_BASE_URL + "/user/" + userId;
            const response = await axios.get(userByIdUrl);
            return response.data;
        }
        catch(error){
            console.log(error);
            return {};
        }
    }
    async getUserByName(userName) {
        try{
            const userByNameUrl = API_BASE_URL + "/userByName";
            const response = await axios.get(userByNameUrl,{
                params:{
                    userName: userName
                }
            });
            return response.data;
        }
        catch(error){
            console.log(error);
            return {};
        }
    }
}
export default new UserService();