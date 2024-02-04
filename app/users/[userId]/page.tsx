'use client';
import Header from '@/components/Header';
import EditModal from '@/components/modals/EditModal';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import useUser from '@/hooks/useUser';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

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
      <UserHero userId={userId} />
      <UserBio userId={userId} currentUser={currentUser} />
      <EditModal currentUser={currentUser} />
      <RegisterModal />
      <LoginModal />
    </>
  );
};

export default UserView;
