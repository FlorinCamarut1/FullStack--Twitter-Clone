import './globals.css';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from 'react-hot-toast';

import Sidebar from '../components/layout/Sidebar';
import FollowBar from '@/components/layout/FollowBar';
import db from '@/lib/db';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  'use server';
  const session = await auth();
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <>
            <Toaster />
            <div className='h-screen bg-black overflow-scroll'>
              <div className=' container h-full mx-auto xl:px-30 max-w-6xl'>
                <div className='grid grid-cols-4 h-full'>
                  <Sidebar />
                  <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                    {children}
                  </div>
                  <FollowBar users={users} />
                </div>
              </div>
            </div>
          </>
        </body>
      </SessionProvider>
    </html>
  );
}

// { Component, pageProps }: AppProps
