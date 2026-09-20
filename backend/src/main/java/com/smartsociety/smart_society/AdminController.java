package com.smartsociety.smart_society;

import com.smartsociety.smart_society.dto.UserResponse;
import com.smartsociety.smart_society.entity.User;
import com.smartsociety.smart_society.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @PutMapping("/users/{id}/approve")
    public String approveUser(@PathVariable Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return "User not found";
        }

        user.setStatus("ACTIVE");
        userRepository.save(user);

        return "User approved successfully";
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