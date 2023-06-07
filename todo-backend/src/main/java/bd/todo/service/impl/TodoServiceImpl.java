package bd.todo.service.impl;

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
	public List<Todo> getTodos() {
		return todoRepository.findAll();
	}

	@Override
	public Todo getTodoById(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id:" + id));
		return todo;
	}

	@Override
	public Todo addTodo(Todo todo) {
		return todoRepository.save(todo);
	}

	@Override
	public Todo updateTodo(Long id, Todo todo) {

		Todo origTodo = getTodoById(id);
		origTodo.setActivity(todo.getActivity());
		origTodo.setDone(todo.isDone());

		return todoRepository.save(todo);
	}

	@Override
	public void removeTodo(Long id) {
		// Make sure that the TODO exists
		Todo todo = getTodoById(id);
		todoRepository.deleteById(todo.getId());
	}

}
