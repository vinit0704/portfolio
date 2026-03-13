# 🚀 Professional Portfolio Website - Complete Guide

**Full-Stack MERN Portfolio with Admin Dashboard**

A modern, production-ready portfolio website built with React, Node.js, Express, and MongoDB. Features include admin authentication, project management, skills showcase, contact form, and optimized deployment configurations.



## ✨ Features

### Public Features
- 🎨 **Cyberpunk-themed Design** - Modern, animated UI with neon aesthetics
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Code splitting, lazy loading, image optimization
- 🔍 **SEO Optimized** - Meta tags, sitemap, Open Graph support
- 📊 **Projects Gallery** - Filterable project showcase with modal details
- 💼 **Skills Display** - Categorized skills with proficiency levels
- 📧 **Contact Form** - Real-time validation with email notifications
- 📄 **Resume Download** - PDF resume download functionality
- 🌐 **About Section** - Bio, stats, tech stack display

### Admin Features
- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Dashboard** - Analytics and overview statistics
- ✏️ **Project Management** - Full CRUD operations for projects
- ⚡ **Skills Management** - Add, edit, delete skills
- 📬 **Message Management** - View and manage contact submissions
- 🖼️ **Image Upload** - Project image upload with optimization
- 📈 **Real-time Stats** - Live counts and recent activity

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router 6** - Navigation
- **Axios** - HTTP client
- **React Helmet Async** - SEO management
- **Framer Motion** - Animations (optional)
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Nodemailer** - Email sending
- **Sharp** - Image optimization
- **Helmet** - Security headers
- **Express Rate Limit** - API protection

### DevOps & Tools
- **Git** - Version control
- **MongoDB Atlas** - Cloud database
- **Render** - Backend hosting
- **Vercel/Netlify** - Frontend hosting
- **Postman** - API testing

---

## 📁 Project Structure

```
portfolio-website/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── multer.js                # File upload config
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   └── cache.js                 # API caching (Week 4)
│   ├── models/
│   │   ├── Profile.js               # Profile schema
│   │   ├── Skill.js                 # Skill schema
│   │   ├── Project.js               # Project schema
│   │   ├── Contact.js               # Contact schema
│   │   └── User.js                  # User schema
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── profile.js               # Profile routes
│   │   ├── skills.js                # Skills routes
│   │   ├── projects.js              # Projects routes
│   │   ├── contact.js               # Contact routes
│   │   ├── upload.js                # File upload routes
│   │   └── admin.js                 # Admin stats routes
│   ├── scripts/
│   │   └── createIndexes.js         # Database indexing (Week 4)
│   ├── utils/
│   │   └── imageOptimizer.js        # Image optimization (Week 4)
│   ├── uploads/                     # Uploaded files
│   ├── .env                         # Environment variables
│   ├── .env.production              # Production env template
│   ├── package.json
│   ├── Procfile                     # Heroku config
│   ├── render.yaml                  # Render config
│   ├── seed.js                      # Sample data seeder
│   └── server.js                    # Express app
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   ├── resume.pdf               # Resume file
    │   ├── robots.txt               # SEO (Week 4)
    │   └── sitemap.xml              # SEO (Week 4)
    ├── scripts/
    │   └── generateSitemap.js       # Sitemap generator (Week 4)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js/css        # Navigation
    │   │   ├── Hero.js/css          # Hero section
    │   │   ├── About.js/css         # About section
    │   │   ├── Skills.js/css        # Skills display
    │   │   ├── Projects.js/css      # Projects gallery
    │   │   ├── Contact.js/css       # Contact form
    │   │   ├── Footer.js/css        # Footer
    │   │   ├── PrivateRoute.js      # Route protection
    │   │ 
    │   ├── context/
    │   │   └── AuthContext.js       # Auth state management
    │   ├── pages/admin/
    │   │   ├── Login.js/css         # Admin login
    │   │   ├── Dashboard.js/css     # Admin layout
    │   │   ├── Overview.js/css      # Dashboard home
    │   │   ├── AdminSkills.js/css   # Skills management
    │   │   ├── AdminProjects.js/css # Projects management
    │   │   └── AdminContacts.js/css # Messages management
    │   ├
    │   │   
    │   │   
    │   ├── App.js                   # Main component
    │   ├── App.css                  # Global styles
    │   ├── index.js                 # Entry point
    │   ├── index.css                # Base styles
    │   
    ├── .env.example                 # Env template
    ├── netlify.toml                 # Netlify config
    ├── package.json
    └── vercel.json                  # Vercel config
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **Git**
- **npm** or **yarn**

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website

# 2. Backend Setup
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm run seed              # Load sample data (optional)
npm start                 # Start backend on port 5000

# 3. Frontend Setup (new terminal)
cd frontend
npm install
npm start                 # Start frontend on port 3000

# 4. Create Admin User
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "Admin123!"
  }'

# 5. Access the application
# Public: http://localhost:3000
# Admin: http://localhost:3000/admin/login
```

---


| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/me | Private | Get current user |
| POST | /api/contact | Public | Submit contact form |
| GET | /api/contact | Admin | Get all messages |
| DELETE | /api/contact/:id | Admin | Delete message |
| POST | /api/upload | Admin | Upload image |
| GET | /api/admin/stats | Admin | Get dashboard stats |
| POST | /api/skills | Admin | Create skill |
| PUT | /api/skills/:id | Admin | Update skill |
| DELETE | /api/skills/:id | Admin | Delete skill |
| POST | /api/projects | Admin | Create project |
| PUT | /api/projects/:id | Admin | Update project |
| DELETE | /api/projects/:id | Admin | Delete project |

