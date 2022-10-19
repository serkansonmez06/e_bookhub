package com.sonmez.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "authorRecord")
public class Author {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	private int id;

	private String author;
	private String nameOfTheBook;

	@NotEmpty
	@Size(min = 6)
	private String username;

	@Size(min = 5, message = "Description must be at least 5 characters")
	private String description;
	@DateTimeFormat(pattern = "YYYY-MM-DD")
	private Date targetDate;

	public Author() {
	};

	public Author(int id, String author, String nameOfTheBook, String username, String description, Date targetDate) {
		super();
		this.id = id;
		this.author = author;
		this.nameOfTheBook = nameOfTheBook;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public void setNameOfTheBook(String nameOfTheBook) {
		this.nameOfTheBook = nameOfTheBook;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public int getId() {
		return id;
	}

	public String getAuthor() {
		return author;
	}

	public String getNameOfTheBook() {
		return nameOfTheBook;
	}

	public String getUsername() {
		return username;
	}

	public String getDescription() {
		return description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	@Override
	public String toString() {
		return "Author [id=" + id + ", author=" + author + ", nameOfTheBook=" + nameOfTheBook + ", username=" + username
				+ ", description=" + description + ", targetDate=" + targetDate + "]";
	}

}
