'use client';

import { useEffect } from 'react';
import { BsTwitter } from 'react-icons/bs';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';

import useNotifications from '@/hooks/useNotifications';
import useUser from '@/hooks/useUser';

const NotificationsFeed = () => {
  const router = useRouter();

  const currentUser = useCurrentUser();
  const { mutate: mutateCurrentUser } = useUser(currentUser?.id as string);
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  const goToUser = (notificatorId: string) => {
    router.push(`/users/${notificatorId}`);
  };

  const goToPost = (postId: string, userId?: string) => {
    if (!postId) return null;
    if (postId === 'user') {
      /**
       * for follow notification to redirect to user not to post
       */
      router.push(`/users/${userId}`);
    } else {
      router.push(`/posts/${postId}`);
    }
  };

  if (fetchedNotifications?.length === 0) {
    return (
      <div className='text-neutral-600 text-center p-6 text-xl '>
        No notifications
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          onClick={() =>
            goToPost(notification?.postId, notification?.notificatorId)
          }
          key={notification?.id}
          className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800 cursor-pointer'
        >
          <BsTwitter color='white' size={32} />
          <p className='text-white'>
            <span
              className='hover:text-sky-500 hover:underline'
              onClick={(event) => {
                event.stopPropagation();
                goToUser(notification?.notificatorId);
              }}
            >
              {notification?.notificatorUsername}
            </span>{' '}
            {notification?.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
