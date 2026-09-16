package com.smartsociety.smart_society.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {

    Optional<Amenity> findByName(String name);
}