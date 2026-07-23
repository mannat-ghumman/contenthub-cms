# ContentHub CMS

ContentHub CMS is a full-stack Content Management System built using **React**, **Node.js**, **Express.js**, and **PostgreSQL**. It provides a secure admin dashboard for managing blogs, YouTube videos, and categories, along with a public website where visitors can browse published content.

This project was built to gain hands-on experience with full-stack web development, REST APIs, authentication, database design, and responsive frontend development.

---

## Features

### Public Website

- Browse published blogs
- Read individual blog posts using SEO-friendly URLs (slugs)
- Browse YouTube videos
- Search blogs and videos
- Responsive user interface

### Admin Dashboard

- Secure JWT authentication
- Dashboard with content statistics
- Create, edit, and delete blogs
- Create, edit, and delete YouTube videos
- Create, edit, and delete categories
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
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   └── services
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── .env.example
│   └── ...
│
├── README.md
└── .gitignore
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mannat-ghumman/contenthub-cms.git

cd contenthub-cms
```

---

## Backend Setup

```bash
cd server

npm install
```

### Create Environment Variables

Copy the example file.

```bash
cp .env.example .env
```

If you're using Windows, simply create a new file named `.env` inside the `server` folder and copy the contents of `.env.example`.

Update the values according to your local PostgreSQL configuration.

Example:

```env
PORT=5000

DB_USER=your_database_user
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432

JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

## Frontend Setup

Open a new terminal.

```bash
cd client

npm install

npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

---

## API Overview

### Authentication

```
POST   /auth/register

POST   /auth/login

GET    /auth/profile
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

While building this project, I gained practical experience with:

- Designing RESTful APIs using Express.js
- PostgreSQL database design and SQL queries
- JWT authentication and protected routes
- CRUD operations
- React Router and client-side routing
- React Hooks for state management
- MVC architecture
- Connecting frontend and backend using Axios
- Building responsive user interfaces with Tailwind CSS

---

## Future Improvements

Some features that can be added in future versions:

- Rich text editor for blog writing
- Image uploads using Cloudinary
- User roles (Admin / Editor)
- Comments on blog posts
- Pagination
- Dark mode
- Analytics dashboard
- Email notifications

---

## License

This project was built for learning and portfolio purposes.