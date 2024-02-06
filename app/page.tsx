'use client';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/Header';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import Form from '@/components/Form';
import PostFeed from '@/components/posts/PostFeed';

export default function Home() {
  return (
    <>
      <Toaster />
      <RegisterModal />
      <LoginModal />
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
