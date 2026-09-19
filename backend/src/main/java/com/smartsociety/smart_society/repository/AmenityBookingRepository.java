package com.smartsociety.smart_society.repository;

import com.smartsociety.smart_society.entity.AmenityBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AmenityBookingRepository extends JpaRepository<AmenityBooking, Long> {

    List<AmenityBooking> findByResidentEmail(String residentEmail);

    List<AmenityBooking> findByAmenityIdAndBookingDateAndBookingStatus(
            Long amenityId,
            LocalDate bookingDate,
            String bookingStatus
    );
}