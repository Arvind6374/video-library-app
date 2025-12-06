
# 📽️ Video Library – MERN Stack Project

A clean and modern **Video Library Management App** built using **Node.js + Express + MongoDB + React (Vite)**.
Users can add videos, browse videos, search by keywords, view details, and delete videos — all inside a polished dark-theme UI.

---

## 🚀 Features

### 🔹 Frontend (React + Vite)

* Beautiful **dark-mode UI**
* Video grid with thumbnails
* View video details
* Search videos (title, tags, category)
* Add new video
* Delete existing video
* Responsive layout

### 🔹 Backend (Node.js + Express + MongoDB)

* REST API with CRUD operations
* MongoDB/Mongoose integration
* Search API (`/search?q=...`)
* Fully validated routes
* Clean controller/service architecture

---

## 🛠️ Tech Stack

### **Frontend**

* React (Vite)
* Axios
* React Router DOM
* Custom CSS (dark theme)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Dotenv
* Nodemon (dev)

---

## 📁 Folder Structure

```
video-library/
│
├── video-library-api/          # Backend API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── video-library-ui/           # Frontend App
    ├── src/
    │   ├── pages/
    │   ├── styles/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── package.json
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/video-library.git
cd video-library
```

---

## 📦 Backend Setup (video-library-api)

### Install dependencies

```bash
cd video-library-api
npm install
```

### Create `.env` file

```
MONGO_URI=mongodb://127.0.0.1:27017/video-library
PORT=5000
```

### Start backend

```bash
npm run dev
```

Backend will run at:
👉 `http://localhost:5000`

---

## 💻 Frontend Setup (video-library-ui)

### Install dependencies

```bash
cd ../video-library-ui
npm install
```

### Start frontend

```bash
npm run dev
```

Frontend will run at:
👉 `http://localhost:5173`

---

## 🔗 API Endpoints

### ▶️ Videos API

| Method   | Endpoint                | Description     |
| -------- | ----------------------- | --------------- |
| `GET`    | `/api/videos`           | Get all videos  |
| `GET`    | `/api/videos/:id`       | Get video by ID |
| `POST`   | `/api/videos`           | Add new video   |
| `PUT`    | `/api/videos/:id`       | Update a video  |
| `DELETE` | `/api/videos/:id`       | Delete a video  |
| `GET`    | `/api/videos/search?q=` | Search videos   |

---

## 🔍 Search Example

```
GET /api/videos/search?q=react
```

Results include matching:

* Title
* Category
* Tags



---

## ✨ Improvements You Can Add Later

* Pagination
* Upload actual video files
* User authentication (JWT)
* Categories filter sidebar
* Likes, comments, watch count

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to submit issues for bugs or feature requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---


