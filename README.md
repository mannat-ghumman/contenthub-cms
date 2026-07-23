# ContentHub CMS

ContentHub CMS is a full-stack content management system built with React, Node.js, Express, and PostgreSQL. It provides an admin dashboard for managing blogs, YouTube videos, and categories, along with a public website where visitors can browse published content.

The project was built to gain hands-on experience with full-stack development, REST APIs, authentication, database design, and modern frontend development.

---

## Features

### Public Website

- Browse published blogs
- Read blog posts using SEO-friendly URLs (slugs)
- Browse YouTube videos
- Search blogs and videos
- Responsive user interface

### Admin Dashboard

- Secure login using JWT authentication
- Dashboard with content statistics
- Create, edit, and delete blogs
- Create, edit, and delete YouTube videos
- Manage categories
- Search blogs and videos
- View public website directly from the dashboard

---

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- PostgreSQL

### Authentication

- JWT (JSON Web Tokens)
- bcrypt

---

## Project Structure

```
ContentHub-CMS
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   └── assets
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── database
│
└── README.md
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/contenthub-cms.git

cd contenthub-cms
```

---

### 2. Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the server folder.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client

npm install

npm run dev
```

The frontend will run at

```
http://localhost:5173
```

---

## API Overview

### Authentication

```
POST /auth/register

POST /auth/login

GET /auth/profile
```

### Blogs

```
GET    /blogs

GET    /blogs/:slug

POST   /blogs

PUT    /blogs/:id

DELETE /blogs/:id
```

### Videos

```
GET    /videos

POST   /videos

PUT    /videos/:id

DELETE /videos/:id
```

### Categories

```
GET    /categories

POST   /categories

PUT    /categories/:id

DELETE /categories/:id
```

---

## Screenshots

### Home Page

_Add screenshot here_

### Dashboard

_Add screenshot here_

### Blog Management

_Add screenshot here_

### Video Management

_Add screenshot here_

### Category Management

_Add screenshot here_

---

## What I Learned

Working on this project helped me understand:

- Building REST APIs with Express
- PostgreSQL database design and queries
- JWT authentication and protected routes
- React Router and client-side routing
- CRUD operations
- State management using React Hooks
- Organizing projects using MVC architecture
- Connecting frontend and backend using Axios

---

## Future Improvements

Some features that can be added in future versions:

- Rich text editor for blog writing
- Image upload using Cloudinary
- User roles (Admin / Editor)
- Comments on blogs
- Pagination
- Dark mode
- Analytics dashboard
- Email notifications
- Bookmark/Favorite blogs

---

## License

This project is intended for learning and portfolio purposes.