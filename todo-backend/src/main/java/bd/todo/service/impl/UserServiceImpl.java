package bd.todo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import bd.todo.exception.ResourceNotFoundException;
import bd.todo.exception.UnexpectedRecordsFoundException;
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
	public User getUserById(Long id) {
		return this.userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User does not exist with id:" + id));
	}

	@Override
	public User getUserByName(String userName) {

		List<User> users = userRepository.findUsersWithUserName(userName);

		// Handle different number of users
		switch (users.size()) {
		case 0:
			User user = new User();
			return user;
		case 1:
			return users.get(0);
		default:
			throw new UnexpectedRecordsFoundException("Multiple user found the given user name.");
		}

	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

}
