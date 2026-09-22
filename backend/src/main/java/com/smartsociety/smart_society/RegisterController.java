package com.smartsociety.smart_society;

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
public class RegisterController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final OtpService otpService;

    public RegisterController(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            OtpService otpService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> request) {

        String name = request.get("name");
        String email = request.get("email");
        String password = request.get("password");
        String otp = request.get("otp");

        if (name == null || name.isBlank()) {
            return "Name is required";
        }

        if (email == null || email.isBlank()) {
            return "Email is required";
        }

        if (password == null || password.isBlank()) {
            return "Password is required";
        }

        if (otp == null || otp.isBlank()) {
            return "Email OTP verification is required";
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already registered";
        }

        if (password.length() < 8 ||
                !password.matches(".*[A-Z].*") ||
                !password.matches(".*[a-z].*") ||
                !password.matches(".*[0-9].*") ||
                !password.matches(".*[^a-zA-Z0-9].*")) {

            return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
        }

        boolean verified = otpService.verifyOtp(email, otp);

        if (!verified) {
            return "Invalid or expired OTP";
        }

        User user = new User();

        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // New registrations are always residents
        user.setRole("RESIDENT");

        // Account becomes active only after email verification
        user.setStatus("ACTIVE");

        userRepository.save(user);

        return "Registration successful. You can now login.";
    }
}