package bd.todo.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import bd.todo.exception.ResourceNotFoundException;
import bd.todo.model.Todo;
import bd.todo.repository.TodoRepository;
import bd.todo.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService {

	private TodoRepository todoRepository;

	public TodoServiceImpl(TodoRepository todoRepository) {
		super();
		this.todoRepository = todoRepository;
	}

	@Override
	public List<Todo> getTodos(Long userId) {
		return todoRepository.findTodos(userId);
	}

	@Override
	public List<Todo> getTodosByStatus(Long userId, boolean done) {
		return todoRepository.findTodosByStatus(userId, done);
	}

	@Override
	public Todo getTodoById(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo does not exist with id:" + id));
		return todo;
	}

	@Override
	public Todo addTodo(Todo todo) {
		LocalDateTime date = LocalDateTime.now();
		todo.setCreationDate(date);
		return todoRepository.save(todo);
	}

	@Override
	public Todo updateTodo(Long id, Todo todo) {

		Todo origTodo = getTodoById(id);

		origTodo.setActivity(todo.getActivity());
		origTodo.setDone(todo.isDone());
		// We don't overwrite the creationDate

		return todoRepository.save(origTodo);
	}

	@Override
	public void removeTodo(Long id) {
		// Make sure that the TODO exists
		Todo todo = getTodoById(id);
		todoRepository.deleteById(todo.getId());
	}

}
