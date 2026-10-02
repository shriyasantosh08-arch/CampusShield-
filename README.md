🛡️ CampusShield – Campus Emergency & Incident Management System

CampusShield is a full-stack campus emergency and incident management system designed to enable students to report incidents quickly and help security and administrators coordinate responses efficiently.

The system connects Students, Security Staff, and Administrators through a centralized platform with real-time incident updates and notifications.

🚨 Problem Statement

Campus incidents may be reported through different channels such as phone calls, messages, or in-person communication, which can cause delays and make tracking difficult.

CampusShield provides a structured digital workflow for:

Incident Reporting → Alert → Assignment → Response → Status Update → Resolution

🎯 Objectives

- Enable students to report campus incidents quickly.
- Allow students to provide incident type, priority, photo, and location.
- Notify security staff and administrators about new incidents.
- Allow administrators to assign incidents to security personnel.
- Enable security staff to accept and handle incidents.
- Provide real-time incident status updates.
- Maintain a centralized record of campus incidents.
- Provide administrators with reports and analytics.

👥 User Roles

👨‍🎓 Student Module

- Student registration and login
- Report an incident
- Select incident type
- Set incident priority
- Upload incident photo
- Share incident location
- Track incident status
- Receive incident updates

🛡️ Security Module

- Security staff login
- Security dashboard
- Receive real-time incident alerts
- View incident details
- View incident location
- Accept assigned incidents
- Handle incidents
- Update incident status

👨‍💼 Admin Module

- Admin login and dashboard
- View all incidents
- Assign incidents to security staff
- Manage users
- Manage incident priorities
- Monitor incident progress
- View reports and analytics

⚡ Backend & Real-Time Module

- Database management
- Authentication and authorization
- REST APIs
- Real-time data synchronization
- Real-time notifications
- Integration of Student, Security, and Admin modules

🔄 System Workflow

Student
   ↓
Reports Incident
   ↓
Incident Stored in Database
   ↓
Real-Time Alert
   ↓
Security / Admin
   ↓
Incident Assigned
   ↓
Security Accepts & Handles
   ↓
Status Updated
   ↓
Incident Resolved
   ↓
Student Notified

✨ Key Features

- 🔐 Role-based authentication
- 🚨 Incident reporting
- 📍 Location sharing
- 📷 Photo upload
- ⚡ Real-time incident alerts
- 👮 Security incident assignment
- 📊 Admin dashboard and analytics
- 🔄 Real-time status tracking
- 🔔 Notifications
- 🗂️ Centralized incident management

🏗️ Project Architecture

                ┌──────────────────┐
                │     Student      │
                │    Web / App     │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    Backend API   │
                │   Authentication │
                └────────┬─────────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
        ┌─────────┐ ┌─────────┐ ┌─────────┐
        │ Student │ │Security │ │  Admin  │
        │ Module  │ │ Module  │ │ Module  │
        └─────────┘ └─────────┘ └─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     Database     │
                └──────────────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ Real-Time Layer  │
                │  Notifications   │
                └──────────────────┘

👨‍💻 Team Division

Member| Responsibility
Member 1| Student Module
Member 2| Security Module
Member 3| Admin Module
Member 4| Backend & Real-Time Module

🛠️ Technology Stack

Frontend

- HTML
- CSS
- JavaScript / React

Backend

- Node.js
- Express.js

Database

- PostgreSQL / MongoDB

Authentication

- JWT

Real-Time Communication

- WebSockets / Socket.IO

Other Technologies

- REST APIs
- Geolocation API
- File Upload
- Git & GitHub

📌 Future Enhancements

- Emergency SOS button
- Push notifications
- Mobile application
- Incident heat maps
- Advanced analytics
- Incident history and audit logs
- Multiple campus support
- Emergency contact integration

👥 Team

CampusShield – Campus Emergency & Incident Management System

Developed as a collaborative full-stack project for campus safety and incident response management.

---

📄 License

This project is developed for educational and academic purposes.
