package com.smartsociety.smart_society;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.dto.UserResponse;
import com.smartsociety.smart_society.entity.User;
import com.smartsociety.smart_society.repository.UserRepository;

@RestController
@RequestMapping("/api/security")
@CrossOrigin(origins = "http://localhost:5173")
public class SecurityController {

    private final UserRepository userRepository;

    public SecurityController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/residents")
    public List<UserResponse> getResidents() {

        return userRepository.findAll()
                .stream()
                .filter(user -> "RESIDENT".equals(user.getRole()))
                .map(this::convertToResponse)
                .toList();
    }

    private UserResponse convertToResponse(User user) {
        return new UserResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getStatus()
        );
    }
}