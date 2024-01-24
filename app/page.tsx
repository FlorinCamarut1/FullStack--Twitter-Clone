import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';

export default async function Home() {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <Header label='Home' />
    </>
  );
}
