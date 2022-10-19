package com.sonmez.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sonmez.entity.Author;
import com.sonmez.service.AuthorService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class AuthorController {

	// inject service
	@Autowired
	private AuthorService authorService;

	// @PostMapping("/save") // save method
	@PostMapping("/save")
	public Author addAuthor(@Valid @RequestBody Author author) {
		return authorService.saveAuthor(author);
	}

	// method get all data from db
	@GetMapping("/authors")
	public List<Author> findAllAuthors() {
		return authorService.getAuthors();
	}

	@GetMapping("/authors/{id}")
	public Optional<Author> findAuthorById(@PathVariable int id) {
		return authorService.getAuthor(id);
	}

	@PutMapping("/update") // update
	public Author updateAuthor(@Valid @RequestBody Author author) {
		return authorService.updateItem(author);
	}

	// Delete item by id
	@DeleteMapping("/authors/{id}")
	public ResponseEntity<Author> deleteAuthor(@PathVariable int id) {
		return authorService.deleteAuthor(id);
	}

}

//
//@PostMapping("/saveAll") // save all method
//public List<Author> addAuthors(@Valid @RequestBody List<Author> author) {
//	return authorService.saveAuthors(author);
//}
