'use client';

import { Inter } from 'next/font/google';
import '../../globals.css';
import Slidebar from '@/components/Slidebar';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });
import { EdgeStoreProvider } from '@/lib/edgestore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on link click
  useEffect(() => {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach((link) => {
      link.addEventListener('click', () => setIsSidebarOpen(false));
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', () => setIsSidebarOpen(false));
      });
    };
  }, [isSidebarOpen]);

  return (
    <html lang="en">
      <head>
        {/* Move metadata handling to _app.tsx or _document.tsx */}
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen relative">
          <aside
            className={`fixed inset-0 z-50  w-72 bg-white transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform md:relative md:translate-x-0 md:z-10`}
          >
            <Slidebar toggleSidebar={toggleSidebar} />
          </aside>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          <div className="flex flex-1 flex-col">
            <header className="w-full  z-40  bg-green-500 text-white p-4 shadow-md ">
              <button
                className="md:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <Navbar />
            </header>
            <main className="flex-1 p-4 bg-green-300">
              <EdgeStoreProvider>{children}</EdgeStoreProvider></main>
          </div>
        </div>
      </body>
    </html>
  );
}
