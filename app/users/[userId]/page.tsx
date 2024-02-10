'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

import Header from '@/components/Header';
import EditModal from '@/components/modals/EditModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import PostFeed from '@/components/posts/PostFeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import React from 'react';

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId);
  const currentUser = useCurrentUser();

  if (isLoading || !fetchedUser)
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );

  return (
    <>
      <Toaster />
      <Header label={fetchedUser.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} currentUser={currentUser} />
      <PostFeed userId={userId} />
      <EditModal currentUser={currentUser} />
      <RegisterModal />
      <LoginModal />
    </>
  );
};

export default UserView;
