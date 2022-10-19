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

import com.sonmez.entity.Users;
import com.sonmez.service.UsersService;

@RestController
@CrossOrigin(origins = "http://localhost:3001")
public class UsersController {

	@Autowired
	private UsersService usersService;

	@PostMapping("/saveUser")
	public Users addUser(@Valid @RequestBody Users user) {
		return usersService.saveUsers(user);
	}

	@GetMapping("/getUsers")
	public List<Users> findAllUsers() {
		return usersService.getUsers();
	}

	@GetMapping("/getUsers/{id}")
	public Optional<Users> findUserById(@Valid @PathVariable int id) {
		return usersService.getUserById(id);
	}

	@PutMapping("/updateUser")
	public Users updateUser(@Valid @RequestBody Users user) {
		return usersService.updateUser(user);
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Users> deleteUser(@PathVariable int id) {
		return usersService.deleteUser(id);
	}
}
