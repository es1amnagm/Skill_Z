# 🎓 Skill_Z – Learning Management System Backend

Skill_Z is a backend API for a modern Learning Management System (LMS) built with **Node.js**, **Express.js**, and **MongoDB**.

The platform connects **Students**, **Instructors**, and **Administrators** through a secure role-based system, allowing instructors to publish courses, administrators to review and approve them, students to purchase courses using **Stripe Checkout**, and automatically enroll after successful payment. The application also provides real-time support chat using **Socket.io** and interactive API documentation with **Swagger**.

---

## 🚀 Features

### Authentication & Authorization
- JWT Authentication
- Role-Based Access Control (Student, Instructor, Admin)
- Secure password hashing with bcrypt

### Course Management
- Instructor course creation
- Course approval workflow
- Course rejection
- Course cancellation within 24 hours (only while pending)
- Course browsing with pagination

### Student Features
- Purchase courses using Stripe
- Automatic enrollment after successful payment
- View enrolled courses
- Unenroll from courses

### Payment System
- Stripe Checkout
- Secure Stripe Webhooks
- Payment history storage

### Real-Time Communication
- Socket.io support chat
- Typing indicators
- Join/leave notifications

### File Uploads
- Avatar uploads using Multer

### Documentation
- Swagger / OpenAPI documentation

### Logging
- Winston structured logging

---

# 🏗 Architecture

The project follows a modular MVC architecture.
