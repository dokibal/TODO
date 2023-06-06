package bd.todo.service;

import java.util.List;

import bd.todo.model.Todo;

public interface TodoService {
	public List<Todo> getTodos();

	public Todo addTodo(Todo todo);
}
