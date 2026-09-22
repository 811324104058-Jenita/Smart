package com.smartsociety.smart_society;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendOtp(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }

        try {

            otpService.sendOtp(email);

            return ResponseEntity.ok(
                    "OTP sent successfully to your email"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Failed to send OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");

        if (email == null || email.isBlank()
                || otp == null || otp.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email and OTP are required");
        }

        boolean verified =
                otpService.verifyOtp(email, otp);

        if (verified) {

            return ResponseEntity.ok(
                    "Email verified successfully"
            );
        }

        return ResponseEntity
                .badRequest()
                .body("Invalid or expired OTP");
    }
}