
# React Next Google Tools

A lightweight, easy-to-use library for integrating Google Analytics into both **React** and **Next.js** applications. No complex configurations—just plug it in, provide your Measurement ID, and start tracking page views!

## ✨ Features

- **Universal Support:** Works seamlessly with **Next.js** (App Router & Pages Router) and standard **React** projects.
- **Automatic Route Tracking:** Automatically tracks client-side navigation in both Next.js and React applications.
- **Simple Integration:** Initialize Google Analytics with a single component.
- **Zero Config Bloat:** Just pass your Measurement ID. No extensive setup required.
- **TypeScript Ready:** Comes with type definitions for a smooth developer experience.

## 🚀 Getting Started

### Installation

```bash
npm install react-next-google-tools
# or
yarn add react-next-google-tools
# or
pnpm add react-next-google-tools
```

### Usage with Next.js (App Router) - Recommended

For Next.js 13+ with the App Router, add the component to your root `layout.tsx`:

```tsx
// app/layout.tsx
import { GoogleAnalytics } from 'react-next-google-tools';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics id="G-XXXXXXXXXX" isNextJs={true} />
        )}
        {children}
      </body>
    </html>
  );
}
```

**Note:** Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### Usage with Next.js (Pages Router)

For Next.js with the Pages Router, add the component to your `_app.tsx`:

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { GoogleAnalytics } from 'react-next-google-tools';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <GoogleAnalytics id="G-XXXXXXXXXX" isNextJs={true} />
      )}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

**Note:** Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### Usage with React

For React projects (e.g., CRA, Vite, or other build systems):

```bash 
// src/App.tsx
import React from 'react';
import { GoogleAnalytics } from 'react-next-google-tools';

function App() {
  return (
    <div>
      <GoogleAnalytics id="G-XXXXXXXXXX" isNextJs={false} />
      <h1>Hello, world!</h1>
    </div>
  );
}

export default App;
```
## 🔧 Props

-   **`id` (string, required):**  
    Your Google Analytics Measurement ID (e.g., `G-ABC123XYZ`).
    
-   **`isNextJs` (boolean, optional):**  
    Defaults to `true`. If you’re using React without Next.js, set this to `false`.  
    This determines how the analytics script is injected. Next.js uses `next/script`, while pure React falls back to a standard `<script>` tag.

## 🏗 Contributing
We welcome contributions! Here’s how you can help:
1.  **Check issues:**  
    See if your suggestion or bug report is already listed in [Issues](https://github.com/varundeva/react-next-google-tools/issues).
    
2.  **Open a new issue:**  
    If it’s not there, [create a new issue](https://github.com/varundeva/react-next-google-tools/issues) describing the feature or bug.
    
3.  **Fork & Create a PR:**
    
    -   Fork the repository and create a new branch for your feature/bugfix.
    -   Commit your changes with clear, descriptive messages.
    -   Submit a pull request, referencing the issue if applicable.

**Code of Conduct:**  
We follow the Contributor Covenant Code of Conduct. By participating, you help create a welcoming community for everyone.
## 🧪 Development Setup

1.  **Clone the Repository:**
```bash
git clone https://github.com/yourusername/react-next-google-tools.git
cd react-next-google-tools
```
2. **Install Dependencies:**
```bash
npm install
```
3. **Build the Package:**
```bash
npm run build
```
4. **Link Locally for Testing:**

```bash
npm link
```
In your test project:
```bash
npm link react-next-google-tools
``` 
This allows you to test changes before publishing.
## 📜 License

This project is licensed under the [MIT License](LICENSE). You’re free to use, modify, and distribute it, as long as you respect the license terms.

## 🌍 Community

Feel free to [open an issue](https://github.com/varundeva/react-next-google-tools/issues) for questions, suggestions, or just to say hello. We’re building a community of developers who want simple and effective analytics integrations.

**If you find this project helpful, please give it a ⭐ on GitHub—it means a lot to us!**

----------

**Made with ❤️ by [Varun Deva](https://github.com/varundeva)**