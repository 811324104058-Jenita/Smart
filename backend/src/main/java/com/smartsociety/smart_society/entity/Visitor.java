package com.smartsociety.smart_society.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "visitors")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String residentEmail;

    private String visitorName;

    private String phone;

    private String purpose;

    private String vehicleNumber;

    @Column(unique = true)
    private String qrPass;

    private String verificationStatus;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    private LocalDateTime createdAt;

    public Visitor() {
    }

    public Visitor(
            String residentEmail,
            String visitorName,
            String phone,
            String purpose,
            String vehicleNumber,
            String qrPass,
            String verificationStatus,
            LocalDateTime entryTime,
            LocalDateTime exitTime,
            LocalDateTime createdAt) {

        this.residentEmail = residentEmail;
        this.visitorName = visitorName;
        this.phone = phone;
        this.purpose = purpose;
        this.vehicleNumber = vehicleNumber;
        this.qrPass = qrPass;
        this.verificationStatus = verificationStatus;
        this.entryTime = entryTime;
        this.exitTime = exitTime;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getResidentEmail() {
        return residentEmail;
    }

    public void setResidentEmail(String residentEmail) {
        this.residentEmail = residentEmail;
    }

    public String getVisitorName() {
        return visitorName;
    }

    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getQrPass() {
        return qrPass;
    }

    public void setQrPass(String qrPass) {
        this.qrPass = qrPass;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public LocalDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}