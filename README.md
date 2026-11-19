# 💼 HireLoop

**HireLoop** is a modern and responsive job portal platform built with Next.js. It connects job seekers with recruiters, allowing candidates to explore job opportunities, apply for jobs, save listings, and track applications. Recruiters can manage job postings and review applicants through a dedicated dashboard.

## 🔗 Live & Relevant Links

- **Live Website:** [HireLoop](YOUR_LIVE_WEBSITE_URL)
- **Frontend Repository:** [GitHub](YOUR_FRONTEND_REPOSITORY_URL)
- **Backend Repository:** [GitHub](YOUR_BACKEND_REPOSITORY_URL)

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- Stripe
- REST API

## ✨ Main Features

- 💼 Browse and search for available jobs
- 🔐 Secure authentication with role-based access
- 👤 Separate dashboards for job seekers, recruiters, and admins
- 📝 Apply for jobs and track application status
- ❤️ Save interesting jobs for later
- 📋 Recruiters can create, update, and delete job postings
- 👥 Recruiters can review and manage job applications
- 💳 Premium membership with Stripe payment integration
- 🛡️ Admin dashboard for user and platform management
- 📱 Fully responsive design
- 🎨 Clean and user-friendly interface

## 📦 Installation

Install project dependencies:

```bash
npm install
```

## 🚀 Run the Project Locally

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd hire-loop-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory and configure the required environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Add other required authentication and payment environment variables according to your project configuration.

**Note:** Never commit secret keys or sensitive credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API

This project uses a REST API built with Express.js and MongoDB to handle user authentication, job listings, applications, saved jobs, and payment-related operations.

**Backend API Base URL:**

`YOUR_BACKEND_API_URL`

## 💳 Payment Integration

HireLoop uses **Stripe Checkout** to handle premium membership payments and verify successful transactions.

---

⭐ Thanks for visiting **HireLoop**!

## 👨‍💻 Author

**IFTEKHAR MAHAMUD AL ASIF**

- GitHub: [iftekharm-alasif](https://github.com/iftekharm-alasif)
- LinkedIn: [iftekhar-m-al-asif](https://www.linkedin.com/in/iftekhar-m-al-asif)

---

<div align="center">

**HireLoop — Connecting Talent with Opportunity.**

</div>