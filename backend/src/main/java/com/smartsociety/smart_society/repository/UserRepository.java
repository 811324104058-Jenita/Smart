package com.smartsociety.smart_society.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}