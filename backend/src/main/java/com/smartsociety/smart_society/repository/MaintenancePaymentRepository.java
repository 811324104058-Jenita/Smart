package com.smartsociety.smart_society.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.MaintenancePayment;

public interface MaintenancePaymentRepository
        extends JpaRepository<MaintenancePayment, Long> {

    List<MaintenancePayment> findByResidentEmail(String residentEmail);

    Optional<MaintenancePayment> findByTransactionId(String transactionId);
}