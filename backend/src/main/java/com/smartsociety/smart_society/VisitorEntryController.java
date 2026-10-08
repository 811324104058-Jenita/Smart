package com.smartsociety.smart_society;

import com.smartsociety.smart_society.entity.VisitorEntry;
import com.smartsociety.smart_society.repository.VisitorEntryRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/security/visitor-entries")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorEntryController {

    private final VisitorEntryRepository visitorEntryRepository;

    public VisitorEntryController(
            VisitorEntryRepository visitorEntryRepository) {
        this.visitorEntryRepository = visitorEntryRepository;
    }

    @GetMapping
    public List<VisitorEntry> getAllEntries() {
        return visitorEntryRepository.findAll();
    }

    @PostMapping
    public VisitorEntry recordEntry(
            @RequestBody VisitorEntry visitorEntry) {

        visitorEntry.setEntryTime(LocalDateTime.now());
        visitorEntry.setStatus("INSIDE");

        return visitorEntryRepository.save(visitorEntry);
    }

    @PutMapping("/{id}/exit")
    public VisitorEntry recordExit(
            @PathVariable Long id) {

        VisitorEntry visitorEntry =
                visitorEntryRepository.findById(id).orElse(null);

        if (visitorEntry == null) {
            throw new RuntimeException("Visitor entry not found");
        }

        visitorEntry.setExitTime(LocalDateTime.now());
        visitorEntry.setStatus("EXITED");

        return visitorEntryRepository.save(visitorEntry);
    }
}