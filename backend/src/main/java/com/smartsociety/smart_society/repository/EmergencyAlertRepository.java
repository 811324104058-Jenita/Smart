package com.smartsociety.smart_society.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.EmergencyAlert;

public interface EmergencyAlertRepository
        extends JpaRepository<EmergencyAlert, Long> {
}