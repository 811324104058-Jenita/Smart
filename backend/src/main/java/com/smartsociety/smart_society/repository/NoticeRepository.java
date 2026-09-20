package com.smartsociety.smart_society.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartsociety.smart_society.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}