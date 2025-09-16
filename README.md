📝 To-Do Frontend

This is the frontend of the To-Do App — a simple task management application built with React and Next.js (App Router).
It allows users to create, update, mark as completed, and delete tasks with priority levels and due dates.

🚀 Live Demo - https://todo-frontend-rosy-five.vercel.app/dashboard

🔗 Open the hosted frontend

⚡ Features

📋 Add new tasks with title, due date, and priority (low, medium, high)

✅ Mark tasks as completed or uncompleted

🗑️ Delete tasks

⚡ Real-time updates without page reload

🎨 Responsive UI with Tailwind CSS

🔐 User authentication (signup and login) integrated with backend

🛠️ Tech Stack

Next.js (App Router + React)

TypeScript

Tailwind CSS

Axios (for API calls)

📦 Getting Started 
1. Clone the repository
git clone https://github.com/IsamaDes/todo-frontend.git
cd todo-frontend

2. Install dependencies
npm install

3. Configure environment

Create a .env.local file in the root folder and add your backend API URL:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

4. Run the development server
npm run dev


Then open http://localhost:3000
 to see it in your browser.

📁 Project Structure
todo-frontend/
│
├── app/               # Next.js app directory (pages & routes)
├── components/        # Reusable UI components
├── services/          # API service calls
├── public/             # Static assets
├── package.json
└── README.md


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

📄 License

This project is licensed under the MIT License.