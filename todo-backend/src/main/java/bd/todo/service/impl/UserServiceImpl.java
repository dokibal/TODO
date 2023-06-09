package bd.todo.service.impl;

import org.springframework.stereotype.Service;

import bd.todo.model.User;
import bd.todo.repository.UserRepository;
import bd.todo.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public User addUser(User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

}
