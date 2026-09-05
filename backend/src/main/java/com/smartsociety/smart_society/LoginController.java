package com.smartsociety.smart_society;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.User;
import com.smartsociety.smart_society.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (existingUser == null) {
            return "Invalid email or password";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid email or password";
        }

        return "Login successful";
    }
}