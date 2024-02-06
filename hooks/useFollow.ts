import { useCallback, useMemo, useTransition } from 'react';
import { useCurrentUser } from './useCurrentUser';
import { followOrUnfollow } from '@/actions/follow-unfollow';

import useLoginModal from './useLoginModal';
import useUser from './useUser';
import toast from 'react-hot-toast';

export const useFollow = (userId: string) => {
  const [isPending, startTransition] = useTransition();
  const currentSessionUser = useCurrentUser();

  const { data: currentUser, mutate: mutateCurrentUser } = useUser(
    currentSessionUser?.id || ''
  );
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    if (isFollowing) {
      startTransition(() => {
        followOrUnfollow(userId, 'DELETE').then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success('Unfollowed succesfully!');
            mutateCurrentUser();
            mutateFetchedUser();
          }
        });
      });
    } else if (!isFollowing) {
      startTransition(() => {
        followOrUnfollow(userId, 'POST').then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success('Followed succesfully!');
            mutateCurrentUser();
            mutateFetchedUser();
          }
        });
      });
    }
  }, [
    currentUser,
    isFollowing,
    loginModal,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
  ]);
  return { toggleFollow, isFollowing, isPending };
};
export default useFollow;
