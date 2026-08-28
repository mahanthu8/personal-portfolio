# Full-Stack Personal Portfolio Website

A responsive full-stack personal portfolio built with **React + Vite**, **Node.js + Express**, and **MySQL**.

## Tech Stack

- Frontend: React, Vite, CSS
- Backend: Node.js, Express
- Database: MySQL
- Database driver: mysql2
- Version control: Git + GitHub

## Project Structure

```text
personal-portfolio-sql/
├── client/
│   ├── src/
│   │   ├── data/portfolio.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── projects.js
│   │   │   └── contact.js
│   │   └── server.js
│   ├── database/
│   │   └── schema.sql
│   ├── .env.example
│   └── package.json
└── README.md
```

# Run the Project

## 1. Install Node.js

Install Node.js LTS on your computer.

Check:

```bash
node -v
npm -v
```

## 2. Install MySQL

Install **MySQL Community Server** and optionally **MySQL Workbench**.

Create the database using the included file:

```text
server/database/schema.sql
```

You can open that file in MySQL Workbench and click the lightning/run button.

The SQL file creates:

- `portfolio_db`
- `projects`
- `messages`

It also inserts three sample projects.

## 3. Configure the backend

Open:

```text
server/.env.example
```

Create a new file named:

```text
server/.env
```

Put:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=portfolio_db
DB_PORT=3306
PORT=5000
ADMIN_KEY=change-this-secret
CLIENT_URL=http://localhost:5173
```

Replace `YOUR_MYSQL_PASSWORD` with the password you created for MySQL.

## 4. Start the backend

Open terminal:

```bash
cd server
npm install
npm run dev
```

You should see:

```text
MySQL connected
API running on http://localhost:5000
```

Test:

```text
http://localhost:5000/api/health
```

## 5. Start the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create:

```text
client/.env
```

with:

```env
VITE_API_URL=http://localhost:5000/api
```

Then:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

# MySQL Tables

## projects

Stores portfolio projects.

Fields:

- id
- title
- description
- technologies
- image
- link
- featured
- created_at
- updated_at

## messages

Stores messages submitted through the contact form.

Fields:

- id
- name
- email
- message
- created_at

# API

### Projects

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

Create/update/delete requests require:

```text
x-admin-key: YOUR_ADMIN_KEY
```

### Contact

```text
POST /api/contact
```

### Health

```text
GET /api/health
```

# Add a Project with MySQL

You can directly use MySQL Workbench:

```sql
USE portfolio_db;

INSERT INTO projects
(title, description, technologies, link, featured)
VALUES
(
  'My New Project',
  'Description of my project',
  'Java, React, MySQL',
  'https://github.com/yourusername/project',
  0
);
```

Refresh the portfolio and the project will appear.

# GitHub

Do not upload your `.env` file.

Upload:

```text
client/
server/
README.md
```

The `.env.example` files are safe to upload because they contain no real passwords.

# Deployment

For a simple student project:

- Frontend: Vercel
- Backend: Render/Railway
- Database: Railway MySQL or another hosted MySQL provider

For local development, MySQL on your laptop is easiest.

# Interview Explanation

> I developed a full-stack personal portfolio using React for the frontend and Node.js with Express for the backend. I used MySQL as the relational database to store portfolio projects and contact messages. The frontend communicates with REST APIs, while the backend implements CRUD operations for projects and persists contact form submissions in MySQL.
