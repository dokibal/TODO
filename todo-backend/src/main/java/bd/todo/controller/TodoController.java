package bd.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bd.todo.model.Todo;
import bd.todo.service.TodoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TodoController {

	private TodoService todoService;

	public TodoController(TodoService todoService) {
		super();
		this.todoService = todoService;
	}

	@GetMapping("/todos/{userId}")
	public ResponseEntity<List<Todo>> getTodos(@PathVariable Long userId) {
		return ResponseEntity.ok(todoService.getTodos(userId));
	}

	@GetMapping("/todosByStatus/{userId}")
	public ResponseEntity<List<Todo>> getTodosByStatus(@PathVariable Long userId, @RequestParam("done") boolean done) {
		return ResponseEntity.ok(todoService.getTodosByStatus(userId, done));
	}

	@PostMapping("/todos")
	public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
		return ResponseEntity.ok(todoService.addTodo(todo));
	}

	@PutMapping("/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
		return ResponseEntity.ok(todoService.updateTodo(id, todo));
	}

	@DeleteMapping("/todos/{id}")
	public ResponseEntity<Boolean> removeTodo(@PathVariable Long id) {
		todoService.removeTodo(id);
		return ResponseEntity.ok(Boolean.TRUE);
	}
}
