package com.sonmez.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sonmez.entity.Admin;
import com.sonmez.exceptions.ResourceNotFoundException;
import com.sonmez.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	public Admin saveAdmin(Admin admin) {

		if (admin.getEmail() == null) {
			throw new ResourceNotFoundException("Admin email can not be null");

		}
		return adminRepository.save(admin);
	}

	public List<Admin> getAdmin() {
		return adminRepository.findAll();
	}

	public ResponseEntity<Admin> deleteAdmin(int id) {
		Admin existingAuthor = adminRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Admin info did not find to delete by id number: " + id));

		adminRepository.delete(existingAuthor);
		return ResponseEntity.ok().build();
	}

	public Admin updateAdmin(Admin admin) {
		Admin existingAdmin = adminRepository.findById(admin.getId())
				.orElseThrow(() -> new ResourceNotFoundException("There is no admin with this id: " + admin.getId()));
		existingAdmin.setEmail(admin.getEmail());

		return adminRepository.save(admin);

	}
}
