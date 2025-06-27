# 🧠 AI-Powered Interview Assistant

Welcome to the **AI Interview Prep Platform** — a full-stack application that allows users to simulate job interviews using AI voice agents and receive real-time feedback. Built with **Next.js**, **Firebase**, **TailwindCSS**, **Vapi**, **Google Gemini**, and **shadcn/ui**.

---

🎥 **[Watch Demo](https://drive.google.com/file/d/1stfj_JSbJNpSoYS3-ghYTUCXU-mlqvZ9/view?usp=drive_link)**

---


## ⚙️ Tech Stack

- ⚛️ **Next.js** — React Framework for Production
- 📝 **TypeScript** — Strongly typed development
- 🔥 **Firebase** — Auth & Backend Services
- 🎨 **Tailwind CSS** — Utility-first CSS framework
- 🧠 **Vapi AI** — AI voice agent integration
- 💬 **Google Gemini** — Interview question & feedback generation
- 🧩 **shadcn/ui** — Beautiful UI components
- 📐 **Zod** — Schema validation

---

## 🔋 Features

- 🔐 **Authentication**  
  Secure email/password auth using Firebase.

- 🧑‍💼 **Create Interviews**  
  Generate personalized interviews using voice input.

- 🧠 **AI Feedback**  
  Get voice & text feedback using Google Gemini and Vapi.

- 💻 **Modern UI/UX**  
  Sleek, accessible, and responsive design.

- 📄 **Interview Page**  
  Take interviews with real-time transcripts and summaries.

- 🧭 **Dashboard**  
  View, track, and manage all interviews in one place.

- 📱 **Responsive Design**  
  Fully optimized for desktop, tablet, and mobile devices.

- 🔁 **Reusable Codebase**  
  Built with scalability and maintainability in mind.

---

## ⚡ Quick Start

### 🧰 Prerequisites

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

### 📦 Installation


```bash
git clone https://github.com/adrianhajdin/ai_mock_interviews.git
cd ai_mock_interviews
npm install
```
---

**Set Up Environment Variables**


# 🔊 Vapi AI (Voice Assistant)
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_vapi_workflow_id

# 🤖 Google Gemini AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key

# 🌐 Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 🔥 Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# 🔐 Firebase Admin SDK (server-side usage only)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n"


---

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
