package com.sonmez.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sonmez.entity.Users;
import com.sonmez.exceptions.ResourceNotFoundException;
import com.sonmez.repository.UsersRepository;

@Service
public class UsersService {

	@Autowired
	private UsersRepository usersRepository;

	public Users saveUsers(Users users) {
		return usersRepository.save(users);
	}

	public List<Users> getUsers() {
		return usersRepository.findAll();
	}

	public Optional<Users> getUserById(int id) {
		Users existingUser = usersRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("item not found! Cant get by id number: " + id));
		return usersRepository.findById(id);
	}

	public ResponseEntity<Users> deleteUser(int id) {
		Users existingUser = usersRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("item not found! Cant get by id number: " + id));

		usersRepository.delete(existingUser);
		return ResponseEntity.ok().build();
	}

	public Users updateUser(Users users) {
		Users existingUser = usersRepository.findById(users.getId()).orElseThrow(
				() -> new ResourceNotFoundException("item not found! Cant get by id number: " + users.getId()));
		existingUser.setEmail(users.getEmail());
		existingUser.setPassword(users.getPassword());
		return usersRepository.save(existingUser);

	}

}
