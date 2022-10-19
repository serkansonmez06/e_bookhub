package com.sonmez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sonmez.entity.Author;
import com.sonmez.exceptions.ResourceNotFoundException;
import com.sonmez.repository.AuthorRepository;

@Service
public class AuthorService {

	@Autowired
	private AuthorRepository authorRepository;

	public Author saveAuthor(Author author) {

		return authorRepository.save(author);
	}

	public List<Author> getAuthors() {
		return authorRepository.findAll();
	}

	// get by id
	public Optional<Author> getAuthor(int id) {
		Author existingAuthor = authorRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("item not found! Cant get by id number: " + id));

		return authorRepository.findById(id);
	}

	public ResponseEntity<Author> deleteAuthor(int id) {
		Author existingAuthor = authorRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("there is no id number to delete by id number: " + id));

		authorRepository.delete(existingAuthor);
		return ResponseEntity.ok().build();
	}

	public Author updateItem(Author author) {
		Author existingAuthor = authorRepository.findById(author.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Cant update data for requested id number: " + author.getId()));
		existingAuthor.setAuthor(author.getAuthor());
		existingAuthor.setNameOfTheBook(author.getNameOfTheBook());
		existingAuthor.setUsername(author.getUsername());
		existingAuthor.setDescription(author.getDescription());
		existingAuthor.setTargetDate(author.getTargetDate());
		return authorRepository.save(existingAuthor);

	}

}

//.orElseThrow(() -> new ResourceNotFoundException("Item is not found by id number: " + id));// spring
// boot
// provides
// exceptions

//public List<Author> saveAuthors(List<Author> authors) {
//return authorRepository.saveAll(authors);
//}