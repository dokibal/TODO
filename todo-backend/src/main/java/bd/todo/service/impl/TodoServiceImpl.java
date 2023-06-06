package bd.todo.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

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
	public Todo addTodo(Todo todo) {
		// TODO Auto-generated method stub
		return todoRepository.save(todo);
	}

}
