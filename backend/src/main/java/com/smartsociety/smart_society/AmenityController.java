package com.smartsociety.smart_society;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartsociety.smart_society.entity.Amenity;
import com.smartsociety.smart_society.repository.AmenityRepository;

@RestController
@RequestMapping("/api/amenities")
@CrossOrigin(origins = "http://localhost:5173")
public class AmenityController {

    private final AmenityRepository amenityRepository;

    public AmenityController(AmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    @PostMapping
    public Amenity createAmenity(@RequestBody Amenity amenity) {
        return amenityRepository.save(amenity);
    }

    @GetMapping
    public List<Amenity> getAllAmenities() {
        return amenityRepository.findAll();
    }

    @GetMapping("/{id}")
    public Amenity getAmenity(@PathVariable Long id) {
        return amenityRepository.findById(id).orElse(null);
    }
}