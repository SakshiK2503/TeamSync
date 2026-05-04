# TeamSync

A full-stack team task management application with role-based access (Admin & Member).

# 🚀 Features

- Authentication (Signup / Login)
- Role-based access (Admin / Member)
- Project creation (Admin)
- Task creation & assignment (Admin)
- Task status tracking (Todo / In Progress / Done)
- Overdue task detection
- Dashboard with task insights
- Responsive UI (mobile + desktop)

# 🛠 Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Auth: JWT
- Deployment: Railway

 # 🌐 Live Demo

Frontend: https://team-sync-zeta-five.vercel.app/ 

Backend: https://teamsync-production-592e.up.railway.app/




# ⚙️ Setup

Backend

```bash

cd server
npm install
npm run dev
```
Frontend 

```bash

cd client
npm install
npm run dev
```
## 🔑 Environment Variables

Create a `.env` file inside the `/server` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```
## 🚀 Future Enhancements

- AI-based task generation from project descriptions
- Task comments and activity tracking
- Real-time updates (WebSockets)
  


