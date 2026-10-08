package com.smartsociety.smart_society;

import com.smartsociety.smart_society.entity.EmergencyAlert;
import com.smartsociety.smart_society.repository.EmergencyAlertRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/security/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class EmergencyAlertController {

    private final EmergencyAlertRepository alertRepository;

    public EmergencyAlertController(
            EmergencyAlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    @GetMapping
    public List<EmergencyAlert> getAlerts() {
        return alertRepository.findAll();
    }

    @PostMapping
    public EmergencyAlert createAlert(
            @RequestBody EmergencyAlert alert) {

        alert.setStatus("ACTIVE");
        alert.setCreatedAt(LocalDateTime.now());

        return alertRepository.save(alert);
    }

    @PutMapping("/{id}/resolve")
    public EmergencyAlert resolveAlert(
            @PathVariable Long id) {

        EmergencyAlert alert =
                alertRepository.findById(id).orElse(null);

        if (alert == null) {
            throw new RuntimeException("Alert not found");
        }

        alert.setStatus("RESOLVED");

        return alertRepository.save(alert);
    }
}