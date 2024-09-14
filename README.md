<p align="center">
  <img src="public/assets/images/logo.svg" alt="Promptly Logo" width="100"/>
</p>
<h1 align="center">
    <a href="https://promptly.saskia.dev" target="_blank">Promptly</a>
</h1>

**Promptly** is an AI prompt playground and chat app that allows users to manage and test prompts across different AI models. With support for multiple API keys, users can switch between AI models, save and organize their prompts, and track their usage for efficient experimentation and prompt optimization.

## ⚙️ Tech Stack
- Next.js
- MongoDB & Mongoose ORM
- NextAuth
- TailwindCSS
- AI (Vercel's AI SDK)

## 🔋 Features
- **Prompt Management**: Save, organise, and test prompts across various AI models using your own API keys.
- **Flexible Model Switching**: Easily switch between AI models based on your saved API keys for more versatile prompt testing.
- **User Profile**: Save API keys securely to streamline prompt management and experimentation.

## Run the app in development
**Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
ENCRYPTION_KEY=
```

**Install dependencies**

   ```bash
   npm install
   ```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
