package com.sonmez.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

//	SerialVersionUID is a unique identifier for each class, JVM uses it to compare the versions
//	of the class ensuring that the same class was used during 
//	Serialization is loaded during Deserialization.
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
		super(message);

	}
}
