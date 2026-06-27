import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI TOOLKIT',
  description: 'The AI Toolkit for TypeScript and JavaScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
