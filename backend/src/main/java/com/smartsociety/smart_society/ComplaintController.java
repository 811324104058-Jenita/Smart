package com.smartsociety.smart_society;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.Complaint;
import com.smartsociety.smart_society.repository.ComplaintRepository;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {

        complaint.setStatus("OPEN");

        return complaintRepository.save(complaint);
    }

    @GetMapping("/resident/{email}")
    public List<Complaint> getResidentComplaints(
            @PathVariable String email) {

        return complaintRepository.findByResidentEmail(email);
    }
}