package bd.todo.service;

import bd.todo.model.User;

public interface UserService {

	User getUserById(Long id);

	User getUserByName(String userName);

	User addUser(User user);
}
