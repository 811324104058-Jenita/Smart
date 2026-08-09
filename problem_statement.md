# Problem Statement

## 1. Title
Smart Society Management System

## 2. Domain
Community / Apartment Management

## 3. Who is the user?
The system has three users:
1. Resident
2. Security Guard
3. Admin

Residents can manage complaints, maintenance payments, amenity
bookings, profiles, and notices.

Security Guards can manage visitor registration, verification,
and entry/exit records.

Admins can manage residents, complaints, payments, amenities,
visitors, notices, and reports.

## 4. What problem are we solving?
Many apartment societies manage their daily operations using paper
records, spreadsheets, phone calls, and messaging applications.
This makes it difficult to track resident complaints, maintenance
payments, visitors, and amenity bookings efficiently.

Residents may not know the status of their complaints or payment
records, while administrators have to manually maintain multiple
records. Visitor management through manual registers is also
time-consuming and inefficient.

Therefore, a centralized digital platform is required to manage
apartment society activities securely and efficiently.

## 5. Proposed Solution
The Smart Society Management System is a web application that
centralizes apartment operations.

Key features:
- Secure login and role-based access
- Resident management
- Complaint management
- Maintenance payments
- Visitor management
- Amenity booking
- Notices and alerts
- Dashboard and reports
- QR-based visitor pass
- AI-based complaint categorization as an enhancement

## 6. Core Entities / Database Tables
- Users
- Residents
- Apartments
- Complaints
- Payments
- Visitors
- Amenities
- Bookings
- Notices

## 7. User Roles & Permissions

### Resident
- Manage profile
- Raise complaints
- Pay maintenance
- Book amenities
- View notices and payment history

### Security Guard
- Register and verify visitors
- Manage visitor entry/exit
- Track vehicles

### Admin
- Manage residents, complaints, payments, amenities, and visitors
- Publish notices
- Generate reports

## 8. Success Criteria
- Secure login and role-based access
- Complaint creation and tracking
- Maintenance payment management
- Conflict-free amenity booking
- Visitor entry/exit tracking
- Admin management and reporting
- Secure and accurate database records
- Deployment on a public URL

## 9. Out of Scope
- Hardware-based smart locks
- CCTV integration
- Facial recognition
- Automatic number plate recognition
- Native mobile applications
- Complete accounting system
- Advanced IoT management

## 10. Chosen Track
Java (Spring Boot)

### Technology Stack
Frontend: React.js, Axios, Bootstrap/Tailwind CSS  
Backend: Java, Spring Boot, Spring Security, JWT, JPA, Hibernate  
Database: MySQL  
Testing: JUnit 5  
API: Swagger/OpenAPI  
Build: Maven  
Version Control: Git/GitHub  
CI/CD: GitHub Actions  
Deployment: Render/Railway + Vercel/Netlify