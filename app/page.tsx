'use client';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <Header label='Home' />
      <div className='bg-white'>{JSON.stringify(session.data)}</div>
    </>
  );
}
