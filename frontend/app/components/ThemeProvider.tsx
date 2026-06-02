'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <body className="min-h-screen bg-surface text-white antialiased">
      <Navbar />
      <div className="pt-0">{children}</div>
      <Footer />
    </body>
  );
}
