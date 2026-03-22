import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ayush Jaiswal — Portfolio',
  description:
    'Full-stack developer specializing in high-performance backend systems. Node.js, ClickHouse, Kafka, GCP, MongoDB and more.',
  keywords: [
    'Ayush Jaiswal',
    'Software Engineer',
    'Backend Developer',
    'Node.js',
    'ClickHouse',
    'Kafka',
    'Full Stack',
    'Portfolio',
  ],
  authors: [{ name: 'Ayush Jaiswal', url: 'https://github.com/soulmini' }],
  openGraph: {
    title: 'Ayush Jaiswal — Terminal Portfolio',
    description: 'Interactive terminal portfolio of Ayush Jaiswal — SDE at SupplyNote',
    type: 'website',
  },
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
