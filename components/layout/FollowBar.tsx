'use client';

import Avatar from '../Avatar';

interface FollowBarProps {
  users?: Record<string, any>[];
}

const FollowBar = ({ users }: Record<string, any>) => {
  if (users?.length === 0) return null;

  return (
    <>
      <div className='px-6 py-4 lg:block hidden relative'>
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
