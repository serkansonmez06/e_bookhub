package com.sonmez.controller;

import java.util.List;

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

import com.sonmez.entity.Admin;
import com.sonmez.service.AdminService;

@RestController

@CrossOrigin(origins = "http://localhost:3001")
public class AdminController {

	// inject service
	@Autowired
	private AdminService adminService;

	@PostMapping("/saveAdmin") // save method
	public Admin addAdmin(@Valid @RequestBody Admin admin) {
		return adminService.saveAdmin(admin);
	}

	// method get all data from db
	@GetMapping("/admin")
	public List<Admin> findAllAdmins() {
		return adminService.getAdmin();
	}

	// Delete item by id
	@DeleteMapping("/admin/{id}")
	public ResponseEntity<Admin> deleteAdmin(@PathVariable int id) {
		return adminService.deleteAdmin(id);
	}

	@PutMapping("/adminUpdate") // update
	public Admin updateAdmin(@Valid @RequestBody Admin admin) {
		return adminService.updateAdmin(admin);
	}

}
