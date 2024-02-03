'use client';
import Header from '@/components/Header';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';

import React from 'react';
import { ClipLoader } from 'react-spinners';

const UserView = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser)
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );

  return (
    <>
      <Header label={fetchedUser.name} showBackArrow />
      <UserHero userId={userId} />
      <UserBio userId={userId} />
    </>
  );
};

export default UserView;
