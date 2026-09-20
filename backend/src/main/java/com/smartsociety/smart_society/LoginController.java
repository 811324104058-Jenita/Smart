package com.smartsociety.smart_society;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public LoginController(
            UserRepository userRepository,
            JwtUtil jwtUtil,
            BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        Map<String, Object> response = new HashMap<>();

        User existingUser = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser == null ||
                !passwordEncoder.matches(
                        user.getPassword(),
                        existingUser.getPassword())) {

            response.put("success", false);
            response.put("message", "Invalid email or password");

            return response;
        }

        if (!"ACTIVE".equalsIgnoreCase(existingUser.getStatus())) {

            response.put("success", false);
            response.put("message",
                    "Your account is waiting for admin approval");

            return response;
        }

        String token = jwtUtil.generateToken(
                existingUser.getEmail(),
                existingUser.getRole()
        );

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("email", existingUser.getEmail());
        response.put("name", existingUser.getName());
        response.put("role", existingUser.getRole());
        response.put("token", token);

        return response;
    }
}