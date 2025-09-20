# School Payment Dashboard - Frontend

This is the frontend for the School Payment and Dashboard Application. It's a responsive and user-friendly interface built with React, Vite, and Tailwind CSS, designed to interact with the corresponding [Backend API](https://school-payment-edviron.onrender.com/).

**Live Demo**: (https://school-payment-edviron.vercel.app/)

---

## ✨ Features

-   **Secure Auth**: User-friendly sign-up and login pages.
-   **Dynamic Dashboard**: A comprehensive table displaying all transactions.
-   **Advanced Controls**: Includes pagination, status filtering, and column sorting.
-   **Real-time Updates**: A live-updating bar chart visualizes transaction data as it happens via WebSockets.
-   **Detailed Views**: Separate pages to view transactions by school ID and check the status of a specific order.
-   **Dark Mode**: A sleek, user-toggleable dark theme that persists across sessions.
-   **Responsive Design**: A clean and modern UI that works on all screen sizes.

---

## 📸 Screenshots

*A few screenshots of your application will go here. Showcasing the login page, the main dashboard in both light and dark modes is a great idea.*

**Dashboard (Light Mode)**
<img width="1919" height="939" alt="Image" src="https://github.com/user-attachments/assets/b2427874-d7f2-425e-9d15-e520c16b46d3" />


**Dashboard (Dark Mode)**
<img width="1913" height="943" alt="Image" src="https://github.com/user-attachments/assets/57ad8366-9519-4dfa-b327-d12cc788cbe5" />


---

## 🛠️ Tech Stack

-   **Framework**: React.js (with Vite)
-   **Styling**: Tailwind CSS
-   **API Client**: Axios
-   **Routing**: React Router
-   **Real-time**: Socket.IO Client
-   **Charting**: Recharts

---

## 🚀 Setup and Installation

To get the project running locally, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/yashG72/school_payment_edviron]
cd frontend
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create a `.env` file:**
Create a `.env` file in the root of the `frontend` directory and add the following environment variables.

```env
VITE_API_BASE_URL=[https://school-payment-edviron.onrender.com/](https://school-payment-edviron.onrender.com/)
VITE_SCHOOL_ID=65b0e6293e9f76a9694d84b4
```

**4. Run the development server:**
```bash
npm run dev
```
The server will start on `http://localhost:5173` (or a similar port).

---

