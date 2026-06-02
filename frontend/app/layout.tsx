// frontend/app/layout.tsx
import '../styles/globals.css';
import ThemeProvider from './components/ThemeProvider';

export const metadata = {
  title: 'KadoTV – Premium Streaming Platform',
  description: 'Watch sports, movies, and series with a premium edge. Seamless, secure, and beautiful.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
