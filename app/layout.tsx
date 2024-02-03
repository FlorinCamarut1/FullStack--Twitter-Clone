import './globals.css';

import { Inter } from 'next/font/google';
import { SessionProvider, useSession } from 'next-auth/react';

import Sidebar from '../components/layout/Sidebar';
import FollowBar from '@/components/layout/FollowBar';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={inter.className}>
          <>
            <div className='h-screen bg-black'>
              <div className=' container h-full mx-auto xl:px-30 max-w-6xl'>
                <div className='grid grid-cols-4 h-full'>
                  <Sidebar />
                  <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
                    {children}
                  </div>
                  <FollowBar />
                </div>
              </div>
            </div>
          </>
        </body>
      </html>
    </SessionProvider>
  );
}

// { Component, pageProps }: AppProps
