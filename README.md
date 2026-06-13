# 💻 Binethma Jayawickrama — Personal Portfolio

A premium, interactive, and fully responsive developer portfolio built with Next.js, React, Tailwind CSS, GSAP, and Resend. Designed to showcase modern web engineering projects, technical expertise, and extracurricular achievements with a sleek glassmorphic UI.

---

## 🚀 Key Features

- **🖥️ Premium Glassmorphic UI**: Sleek dark and light styling, modern typography, custom magnetic cursors, and subtle micro-animations for an elevated user experience.
- **📱 Fully Responsive Design**: Carefully optimized layouts for desktop, tablet, and mobile breakpoints (including splash screen adjustments and spacing optimization).
- **🎨 Interactive Animations**: Smooth page transitions, hover effects, and section scroll-reveals powered by **GSAP (GreenSock)** and a custom interactive **HTML5 Canvas particle background**.
- **💼 Project Showcase & Detail Modals**: Highly customizable project list featuring filters, technical tag overlays, and immersive detail modals for key feature walk-throughs.
- **✉️ Automated Serverless Contact**: A fully functional, type-safe contact form integrated with the **Resend Email API** that routes user messages directly to `binethmad@gmail.com` without requiring an external database backend.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router & Server Actions / API Routes)
- **Library**: React 19 & TypeScript
- **Styling**: Tailwind CSS & CSS Variables for robust color token control
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Email Delivery**: Resend SDK

---

## 📂 Codebase Structure

```bash
├── src
│   ├── app
│   │   ├── api
│   │   │   └── contact
│   │   │       └── route.ts       # Serverless endpoint for Resend Email dispatch
│   │   ├── layout.tsx             # Root layout and theme wrapper
│   │   └── page.tsx               # Portfolio main index page assembly
│   ├── components
│   │   ├── About.tsx              # Professional bio & philosophy
│   │   ├── Blog.tsx               # Blog articles section (index indicators)
│   │   ├── CanvasBackground.tsx   # Canvas-based particle background rendering
│   │   ├── Contact.tsx            # Contact form + Resend endpoint handler
│   │   ├── Hero.tsx               # Splash intro, profile headings & CTAs
│   │   ├── LoadingScreen.tsx      # Responsive loading splash sequence
│   │   ├── Navbar.tsx             # Interactive header dock & navigation
│   │   ├── ProfileCard.tsx        # Floating card housing picture & social link actions
│   │   ├── Projects.tsx           # Project grid list & project details modal
│   │   └── Skills.tsx             # Professional stack & competence visualization
└── public
    ├── cv.pdf                     # Downloadable Curriculum Vitae (Resume)
    └── profile_new.jpg            # Featured avatar asset
```

---

## ⚙️ Local Development Setup

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, and follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/BinethmaJayawickrama/portfolio-neww.git
cd portfolio-neww
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environmental Variables
Create a `.env.local` file in the root directory and add your Resend API Key:
```env
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Build for Production
To test build correctness and optimize assets for deployment:
```bash
npm run build
```

---

## ✉️ Contact

For inquiries or project collaboration, feel free to reach out via:
- **Email**: [binethmad@gmail.com](mailto:binethmad@gmail.com)
- **LinkedIn**: [binethma](https://www.linkedin.com/in/binethma/)
- **GitHub**: [BinethmaJayawickrama](https://github.com/BinethmaJayawickrama)
- **Instagram**: [coffeforurhed](https://www.instagram.com/coffeforurhed?igsh=MTVxcmVoeGhubDcw)
