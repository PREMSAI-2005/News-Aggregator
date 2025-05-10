package com.example.flashnews.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.flashnews.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
