'use client';

import { IoReload } from 'react-icons/io5';
import { ClipLoader } from 'react-spinners';

import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';

const FollowBar = () => {
  const { data: users, mutate: mutateFetchedUsers, isLoading } = useUsers();

  const refreshUsers = (event: any) => {
    event.stopPropagation();
    mutateFetchedUsers();
  };

  if (users?.length === 0) return null;

  return (
    <>
      <div className='px-6 py-4 lg:block hidden relative'>
        {isLoading ? (
          <ClipLoader color='lightblue' size={20} />
        ) : (
          <IoReload
            size={20}
            className='text-white absolute top-10 right-10 cursor-pointer'
            onClick={refreshUsers}
          />
        )}
        <div className='bg-neutral-800 rounded-xl p-4'>
          <h2 className='text-white text-xl font-semibold'>Who to follow</h2>
          <div className='flex flex-col gap-6 mt-4'>
            {users?.map((user: Record<string, any>) => (
              <div className='flex flex-row gap-4' key={user.id}>
                <Avatar userId={user.id} />
                <div className='flex flex-col'>
                  <p className='text-white font semi-bold text-sm'>
                    {user.name}
                  </p>
                  <p className='text-neutral-400 text-sm'>@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowBar;
