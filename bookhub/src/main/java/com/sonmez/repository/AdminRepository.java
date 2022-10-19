package com.sonmez.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sonmez.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
