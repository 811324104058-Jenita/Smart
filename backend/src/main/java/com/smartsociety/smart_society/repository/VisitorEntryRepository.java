package com.smartsociety.smart_society.repository;

import com.smartsociety.smart_society.entity.VisitorEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorEntryRepository
        extends JpaRepository<VisitorEntry, Long> {
}