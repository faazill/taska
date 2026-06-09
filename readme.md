<h1 align="center">
  <br>
  Taska 🎓
  <br>
</h1>

<h4 align="center">A platform connecting elite student talent with professionals for freelance gigs and part-time jobs.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## 📖 About Taska

Taska is a two-sided marketplace designed to bridge the gap between talented students (from premier institutions like IITs, NITs, and IIITs) and employers looking for high-quality, affordable freelance and part-time work. 

Whether you are a student looking to build your portfolio and gain real-world experience, or a professional looking for top-tier talent to help with tasks, Taska provides the platform to connect, collaborate, and succeed.

> **Note:** The live demo is hosted on Vercel at [jointaska.com](https://jointaska.com) (Update link if necessary).

## ✨ Features

- **Role-Based Authentication:** Distinct onboarding and dashboards for **Students** and **Professionals**.
- **AI-Powered Search:** Discover the right talent or the right gig quickly using integrated AI search algorithms.
- **Automated Email Workflows:** Custom welcome and verification emails powered by the Resend API.
- **Real-Time Data:** Instant updates on task statuses, applications, and profile changes.
- **Loyalty Scoring System:** Built-in gamification with loyalty scores for both user types.
- **Responsive UI:** Custom-built, dynamic interface using modern CSS principles and glassmorphism.

## 🛠️ Tech Stack

Taska is built using a lightweight, performant stack optimized for speed and simplicity:

- **Frontend:** HTML5, CSS3 (Custom Design System), Vanilla JavaScript (ES6 Modules)
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Realtime Database)
- **Authentication:** Firebase Authentication (Email/Password)
- **Serverless APIs:** [Vercel Functions](https://vercel.com/docs/functions) (Node.js)
- **Email Service:** [Resend API](https://resend.com/)
- **Hosting:** Vercel

## 🏗️ Architecture Highlights

- **Client-Side Rendering:** The application relies on vanilla JavaScript to dynamically manipulate the DOM and handle state based on user interactions and Firebase auth state.
- **Serverless Endpoints:** Located in the `/api` directory, these Node.js functions securely handle sensitive operations like interacting with the Resend API using environment variables (`process.env.RESEND_API_KEY`) to prevent key exposure on the client.
- **Firebase Security Rules:** Structured rules (`firebase-rules-simple.json`, `firebase-storage-rules.rules`) ensure that user data is protected and users can only access their respective professional/student databases.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (for local serverless API testing)
- A Firebase Project (with Auth and Realtime Database enabled)
- A Resend API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/taska.git
   cd taska
   ```

2. **Configure Firebase:**
   - Go to your Firebase Console.
   - Replace the `firebaseConfig` object in `js/firebase-config.js` with your own project's configuration.

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your Resend API key:
     ```env
     RESEND_API_KEY=your_resend_api_key_here
     ```

4. **Run the Application locally:**
   Since this project uses Vercel Serverless Functions, the easiest way to run it locally is using the Vercel CLI.
   ```bash
   npm install -g vercel
   vercel dev
   ```
   This will start a local server (usually on `http://localhost:3000`) that serves the static HTML/JS/CSS files while also providing the serverless environment for the `/api` routes.

## 📝 License

This project is proprietary and confidential. All rights reserved.
