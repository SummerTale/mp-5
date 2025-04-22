import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL Shortener',
  description: 'Turn long URLs into short, sleek links.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
