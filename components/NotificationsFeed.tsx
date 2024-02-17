'use client';

import { HiEnvelope } from 'react-icons/hi2';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { clearNotification } from '@/actions/clearNotification';
import { useTransition } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

import useNotifications from '@/hooks/useNotifications';
import Button from './Button';
import toast from 'react-hot-toast';

const NotificationsFeed = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentUser = useCurrentUser();

  const {
    data: fetchedNotifications = [],
    isLoading,
    mutate: mutateFetchedNotifications,
  } = useNotifications(currentUser?.id);

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

  const deleteAllNotifications = () => {
    startTransition(() => {
      clearNotification().then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success(data.success);
          mutateFetchedNotifications();
        }
      });
    });
  };
  const deleteNotification = (id: string) => {
    startTransition(() => {
      clearNotification(id).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success(data.success);
          mutateFetchedNotifications();
        }
      });
    });
  };

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={80} />
      </div>
    );
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
          <HiEnvelope color='white' size={32} />
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
          <div className=' ml-auto hover:bg-slate-300 rounded-2xl transition'>
            <IoMdCloseCircle
              size={30}
              color=' white'
              onClick={(event: any) => {
                event.stopPropagation();
                deleteNotification(notification?.id);
              }}
            />
          </div>
        </div>
      ))}
      <div className='flex justify-end p-4'>
        <Button
          label='Clear all notifications'
          secondary
          onClick={deleteAllNotifications}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default NotificationsFeed;
