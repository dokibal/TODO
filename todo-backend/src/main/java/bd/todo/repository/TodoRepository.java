package bd.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bd.todo.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

	@Query("SELECT t FROM Todo t WHERE t.user.id = :userId ORDER BY creationDate DESC")
	List<Todo> findTodos(@Param("userId") Long userId);

	@Query("SELECT t FROM Todo t WHERE (t.done = :done AND t.user.id = :userId) ORDER BY creationDate DESC")
	List<Todo> findTodosByStatus(@Param("userId") Long userId, @Param("done") boolean done);
}
