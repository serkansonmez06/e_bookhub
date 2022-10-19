package com.sonmez.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonmez.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {

}
