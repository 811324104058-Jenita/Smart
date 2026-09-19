package com.smartsociety.smart_society;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.AmenityBooking;
import com.smartsociety.smart_society.repository.AmenityBookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class AmenityBookingController {

    private final AmenityBookingRepository bookingRepository;

    public AmenityBookingController(AmenityBookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody AmenityBooking booking) {

        List<AmenityBooking> existingBookings =
                bookingRepository.findByAmenityIdAndBookingDateAndBookingStatus(
                        booking.getAmenityId(),
                        booking.getBookingDate(),
                        "CONFIRMED"
                );

        for (AmenityBooking existing : existingBookings) {

            boolean overlap =
                    booking.getStartTime().isBefore(existing.getEndTime())
                    && booking.getEndTime().isAfter(existing.getStartTime());

            if (overlap) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("This amenity is already booked for the selected time");
            }
        }

        booking.setBookingStatus("CONFIRMED");

        if (booking.getAmount() == null) {
            booking.setAmount(0.0);
        }

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @GetMapping
    public List<AmenityBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/resident/{email}")
    public List<AmenityBooking> getResidentBookings(
            @PathVariable String email) {

        return bookingRepository.findByResidentEmail(email);
    }
}