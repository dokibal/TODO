package bd.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class UnexpectedRecordsFoundException extends RuntimeException {

	private static final long serialVersionUID = -8506104218130751916L;

	public UnexpectedRecordsFoundException(String message) {
		super(message);
	}
}
