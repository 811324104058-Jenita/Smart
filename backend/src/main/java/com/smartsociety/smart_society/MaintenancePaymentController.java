package com.smartsociety.smart_society;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.MaintenancePayment;
import com.smartsociety.smart_society.repository.MaintenancePaymentRepository;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class MaintenancePaymentController {

    private final MaintenancePaymentRepository paymentRepository;

    public MaintenancePaymentController(
            MaintenancePaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping
    public MaintenancePayment makePayment(
            @RequestBody MaintenancePayment payment) {

        payment.setPaymentStatus("SUCCESS");
        payment.setPaymentDate(LocalDate.now());

        return paymentRepository.save(payment);
    }

    @GetMapping
    public List<MaintenancePayment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/resident/{email}")
    public List<MaintenancePayment> getResidentPayments(
            @PathVariable String email) {

        return paymentRepository.findByResidentEmail(email);
    }
}