package bd.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bd.todo.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
