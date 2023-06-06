package bd.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bd.todo.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
