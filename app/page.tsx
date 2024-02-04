'use client';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import EditModal from '@/components/modals/EditModal';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function Home() {
  return (
    <>
      <Toaster />

      <RegisterModal />
      <LoginModal />
      <Header label='Home' />
      <div className='bg-white'>HOME</div>
    </>
  );
}
