# Inventory Management System - Frontend

This repository contains the **frontend** of an Inventory Management System built with **React**. It provides a user interface to interact with the backend API for managing inventory, products, suppliers, and orders.

This frontend application is designed to consume the RESTful API provided by the **backend**, which can be found [here](https://github.com/Sebaspallero/inventory-management-API).

## ✨ Features

- **Intuitive User Interface**: A clean and responsive design for easy navigation and management.
- **Product Management**: View, create, update, and delete products.
- **Supplier Management**: View, add, edit, and remove supplier information.
- **Order Management**: Create, view, update, and delete purchase orders.
- **Inventory Tracking**: Monitor and manage product stock levels.
- **User Authentication**: Secure login and registration for different user roles.
- **Role-Based Access Control**: Different views and functionalities based on user roles (e.g., Employee, Admin).
- **Data Display**: Efficiently display and filter inventory data.
- **Form Handling**: User-friendly forms for data input and manipulation.

## 🛠️ Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **useQuery**: A React Hooks library for fetching, caching and updating asynchronous data in React.
- **Axios**: A promise-based HTTP client for making API requests.
- **Shadcn UI**: A collection of reusable UI components built using Radix UI and Tailwind CSS.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Zustand**: A small, fast and scalable bearbones state-management solution.
- **React Hook Form**: Performant and flexible form validation for React.
- **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.

## ⚙️ Environment Configuration

You can configure the application by creating a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🚀 How to Run

1. Clone the repository: 
 
```bash
  git clone https://github.com/Sebaspallero/inventory-management-front.git
  cd inventory-management-front 
```

2. Install Dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This will start the application at http://localhost:5173 (or another port if 5173 is in use).

## 🔗 Related Repositories

- [Backend API - SpringBoot App](https://github.com/Sebaspallero/inventory-management-API).

## 📫 Contact
Feel free to reach out:

- GitHub: @Sebaspallero
- Email: sebastianpallerodev@gmail.com

⭐ Please consider giving it a star! It helps with visibility and encourages further development.