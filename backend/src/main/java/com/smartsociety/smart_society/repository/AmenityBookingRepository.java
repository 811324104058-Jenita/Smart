package com.smartsociety.smart_society.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.AmenityBooking;

public interface AmenityBookingRepository
        extends JpaRepository<AmenityBooking, Long> {

    List<AmenityBooking> findByResidentEmail(String residentEmail);

}