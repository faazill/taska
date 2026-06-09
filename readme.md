# Taska

**Taska** is a marketplace that connects high-performing university students with professionals and businesses seeking freelance talent, project contributors, and part-time support.

The platform enables students to gain practical experience while helping employers access skilled talent for a wide range of tasks and projects.

---

## Overview

Taska is designed as a two-sided platform serving:

- **Students** seeking freelance opportunities, internships, and portfolio-building projects.
- **Professionals and Businesses** looking for capable, affordable talent for short-term and ongoing work.

The platform streamlines discovery, application management, communication, and onboarding through a unified web interface.

---

## Key Features

### Authentication and User Management
- Secure email/password authentication
- Separate onboarding flows for students and professionals
- Role-based access control and dashboards

### Opportunity Marketplace
- Browse and discover available projects and gigs
- Submit applications directly through the platform
- Manage project status and user interactions

### Intelligent Search
- AI-assisted matching and search capabilities
- Faster discovery of relevant candidates and opportunities

### Automated Communication
- Email verification workflows
- Automated onboarding and notification emails
- Transactional email delivery using Resend

### Reputation System
- Loyalty and engagement scoring
- Performance tracking for platform participants

### Responsive User Experience
- Mobile-friendly interface
- Custom-designed UI built without frontend frameworks
- Optimized for performance and simplicity

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6 Modules)

### Backend Services
- Firebase Realtime Database
- Firebase Authentication

### Serverless Infrastructure
- Vercel Functions (Node.js)

### Communication
- Resend API

### Hosting
- Vercel

---

## System Architecture

### Client Layer
The frontend is built using Vanilla JavaScript and follows a client-side rendering approach. User interactions, authentication state management, and data updates are handled directly within the browser.

### Backend Services
Firebase provides:
- User authentication
- Realtime database functionality
- Data synchronization

### Serverless Functions
Sensitive operations are handled through Vercel Serverless Functions, including:
- Email workflows
- Secure API integrations
- Environment variable management

### Security
Firebase security rules enforce:
- User-specific data access
- Role-based permissions
- Protected database operations

---

## Project Structure

```text
taska/
│
├── api/                  # Serverless functions
├── css/                  # Stylesheets
├── js/                   # Frontend logic
├── assets/               # Images and static assets
├── firebase-rules/       # Database security rules
├── vercel.json           # Deployment configuration
└── README.md
```

---

## Local Development

### Prerequisites

- Node.js
- Firebase Project
- Resend API Key
- Vercel CLI

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/taska.git
cd taska
```

Configure Firebase:

Update the Firebase configuration in:

```text
js/firebase-config.js
```

Add environment variables:

```env
RESEND_API_KEY=your_api_key
```

Install Vercel CLI:

```bash
npm install -g vercel
```

Run locally:

```bash
vercel dev
```

The application will be available locally with both static frontend assets and serverless API routes enabled.

---

## Deployment

Taska is deployed using Vercel.

Production deployment includes:

- Static asset hosting
- Serverless function execution
- Environment variable management
- Automatic CI/CD from GitHub

---

## Future Enhancements

- Integrated messaging system
- Project milestone management
- Student verification system
- Ratings and reviews
- Payment processing
- Analytics dashboard
- Recommendation engine

---

## License

This project is proprietary software.

Unauthorized copying, modification, distribution, or commercial use is prohibited.
