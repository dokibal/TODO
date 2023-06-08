package bd.todo.service;

import java.util.List;

import bd.todo.model.Todo;

public interface TodoService {
	public List<Todo> getTodos();

	public List<Todo> getTodosByStatus(boolean done);

	public Todo getTodoById(Long id);

	public Todo addTodo(Todo todo);

	public Todo updateTodo(Long id, Todo todo);

	public void removeTodo(Long id);
}
