package com.smartsociety.smart_society;

import java.util.HashMap;
import java.util.Map;

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
    public Map<String, Object> login(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        User existingUser = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser == null) {

            response.put("success", false);
            response.put("message", "Invalid email or password");

            return response;
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {

            response.put("success", false);
            response.put("message", "Invalid email or password");

            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("email", existingUser.getEmail());
        response.put("name", existingUser.getName());
        response.put("role", existingUser.getRole());

        return response;
    }
}