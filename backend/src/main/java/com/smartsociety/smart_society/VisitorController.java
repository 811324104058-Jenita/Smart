package com.smartsociety.smart_society;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.Visitor;
import com.smartsociety.smart_society.repository.VisitorRepository;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorController {

    private final VisitorRepository visitorRepository;

    public VisitorController(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @PostMapping
    public ResponseEntity<Visitor> registerVisitor(
            @RequestBody Visitor visitor) {

        visitor.setQrPass(UUID.randomUUID().toString());
        visitor.setVerificationStatus("PENDING");
        visitor.setCreatedAt(LocalDateTime.now());

        Visitor savedVisitor = visitorRepository.save(visitor);

        return ResponseEntity.ok(savedVisitor);
    }

    @GetMapping
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @GetMapping("/resident/{email}")
    public List<Visitor> getResidentVisitors(
            @PathVariable String email) {

        return visitorRepository.findByResidentEmail(email);
    }

    @GetMapping("/qr/{qrPass}")
    public ResponseEntity<?> getVisitorByQr(
            @PathVariable String qrPass) {

        return visitorRepository.findByQrPass(qrPass)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifyVisitor(
            @PathVariable Long id) {

        return visitorRepository.findById(id)
                .map(visitor -> {

                    visitor.setVerificationStatus("VERIFIED");

                    if (visitor.getEntryTime() == null) {
                        visitor.setEntryTime(LocalDateTime.now());
                    }

                    return ResponseEntity.ok(
                            visitorRepository.save(visitor)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/exit")
    public ResponseEntity<?> recordExit(
            @PathVariable Long id) {

        return visitorRepository.findById(id)
                .map(visitor -> {

                    visitor.setExitTime(LocalDateTime.now());

                    return ResponseEntity.ok(
                            visitorRepository.save(visitor)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }
}