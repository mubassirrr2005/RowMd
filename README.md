# RowMD

RowMD is a modern SaaS web application designed for developers and technical writers to convert Markdown files into professional, high-quality PDF documents instantly.

## 🚀 Features

- **Intuitive Editor:** Real-time side-by-side Markdown editing powered by Monaco Editor.
- **Instant Preview:** Live rendering with syntax highlighting for 100+ programming languages.
- **GitHub Integration:** Import READMEs or specific Markdown files directly from GitHub repositories via URL.
- **Advanced PDF Engine:** Uses a `Markdown -> HTML -> Puppeteer` pipeline for pixel-perfect PDF rendering.
- **Templates:** Choose from professional templates (GitHub README, Technical Docs, Resume, Ebook).
- **File Support:** Drag-and-drop .md files or upload them directly.
- **Cloud Storage:** Securely save your projects and settings (no PDF storage to minimize costs).
- **Usage Tracking:** Daily conversion limits for free tier users.
- **Modern UI:** Dark-mode-first, "box-style" UI inspired by Vercel and Linear.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Backend:** [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- **Database & Auth:** [Firebase](https://firebase.google.com/)
- **PDF Generation:** [Puppeteer](https://pptr.dev/) & [@sparticuz/chromium](https://github.com/Sparticuz/chromium)
- **Markdown Parsing:** [Markdown-it](https://github.com/markdown-it/markdown-it) & [Highlight.js](https://highlightjs.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase Project
- A GitHub OAuth App (for GitHub login)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mubassirrr2005/RowMd.git
   cd RowMd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   # Firebase Public
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

   # Firebase Admin (Required for PDF Generation & Usage Tracking)
   FIREBASE_CLIENT_EMAIL=your-service-account-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components.
- `src/context`: React Context for global state (Auth).
- `src/lib`: Shared utility functions and template logic.
- `firestore.rules`: Security rules for the database.
- `firebase.json`: Firebase configuration.

## 🛡️ Security

- All sensitive environment variables are handled server-side.
- Firestore security rules ensure users can only access their own data.
- PDF generation verifies user session and usage quotas.

## 📄 License

This project is licensed under the MIT License.
