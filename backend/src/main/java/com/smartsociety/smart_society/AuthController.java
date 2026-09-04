package com.smartsociety.smart_society;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		boolean validLogin = "demo@smartsociety.com".equalsIgnoreCase(request.email())
				&& "password".equals(request.password());

		if (!validLogin) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new LoginResponse("Invalid email or password", null, null));
		}

		return ResponseEntity.ok(new LoginResponse("Login successful", request.email(), request.role()));
	}

	public record LoginRequest(String email, String password, String role) {}

	public record LoginResponse(String message, String email, String role) {}
}