package com.smartsociety.smart_society.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.Visitor;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    List<Visitor> findByResidentEmail(String residentEmail);

    Optional<Visitor> findByQrPass(String qrPass);
}