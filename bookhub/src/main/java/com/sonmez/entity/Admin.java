package com.sonmez.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "admin")
public class Admin {

	@Id
	// @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotEmpty(message = "Email must be provided")
	private String email;

	public Admin() {
	}

	public Admin(int id, String email) {
		super();
		this.id = id;
		this.email = email;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
