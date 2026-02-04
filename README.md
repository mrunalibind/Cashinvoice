# 🎓 Student Management System (Full Stack)

A full-stack Student Management System built using **React (Vite)** for the frontend and **Node.js + Express** for the backend.  
The application supports **JWT authentication**, **role-based access control**, and **CRUD operations** with search and pagination.

---

## 🔗 Live Demo

- **Frontend (UI)**: https://cashinvoice-frontend.onrender.com/  
- **Backend (API)**: https://cashinvoice-backend.onrender.com

---

## 👥 Test Users (Already Seeded)

### 1️⃣ Normal User
- **Email**: `siri123@gmail.com`
- **Password**: `siri`
- **Role**: `user`

### 2️⃣ Admin User
- **Email**: `jane123@gmail.com`
- **Password**: `jane`
- **Role**: `admin`

---

## 🔐 Role-Based Access Control (RBAC)

### 👩‍💼 Admin (Jane)
- Login
- View student list
- Create new student
- Edit student details
- Delete student
- Search students
- Pagination (server-side)

### 👩‍🎓 User (Siri)
- Login
- View student list
- View student details only
- ❌ Cannot create, edit, or delete students

---

## ✨ Features

### Authentication
- JWT-based login
- Token stored in localStorage
- Protected routes
- Auto logout on token expiry (backend handled)

### Student Management
- Create student
- View student details
- Edit student
- Delete student (confirmation required)
- Email validation & uniqueness
- Search by name or email
- Server-side pagination

### UI
- React + Vite
- Axios with interceptor
- Context API for authentication
- Protected routes
- Clean folder structure

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API
- Basic CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Role-based middleware

---

