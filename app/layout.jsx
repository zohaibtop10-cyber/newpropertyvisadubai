import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../src/context/ThemeContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import CommandPalette from '../src/components/CommandPalette';
import './globals.css';
import '../src/index.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: '800 DOCS | UAE Golden Visa & Corporate Residency Consultancy',
  description: 'Certified GDRFA & ICP partner providing 10-Year Golden Visas, Property Residency, and VIP PRO Services in Dubai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} light`} style={{ colorScheme: 'light dark' }}>
      <body className={`${inter.className} bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <CommandPalette />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
