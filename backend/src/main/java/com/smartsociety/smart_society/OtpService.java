package com.smartsociety.smart_society;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private final JavaMailSender mailSender;

    private final Map<String, String> otpStorage =
            new ConcurrentHashMap<>();

    private final Map<String, Long> otpExpiry =
            new ConcurrentHashMap<>();

    public OtpService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtp(String email) {

        String otp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        otpStorage.put(email, otp);

        otpExpiry.put(
                email,
                System.currentTimeMillis() + 5 * 60 * 1000
        );

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Smart Society - Email Verification OTP");

        message.setText(
                "Your Smart Society verification OTP is: "
                        + otp
                        + "\n\n"
                        + "This OTP is valid for 5 minutes."
                        + "\n\n"
                        + "Please do not share this OTP with anyone."
        );

        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {

        String storedOtp = otpStorage.get(email);
        Long expiryTime = otpExpiry.get(email);

        if (storedOtp == null || expiryTime == null) {
            return false;
        }

        if (System.currentTimeMillis() > expiryTime) {
            otpStorage.remove(email);
            otpExpiry.remove(email);

            return false;
        }

        if (storedOtp.equals(otp)) {

            otpStorage.remove(email);
            otpExpiry.remove(email);

            return true;
        }

        return false;
    }
}