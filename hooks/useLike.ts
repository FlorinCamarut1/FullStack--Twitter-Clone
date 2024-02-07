import { useCurrentUser } from './useCurrentUser';
import { useCallback, useMemo, useTransition } from 'react';
import { like } from '@/actions/like';

import usePost from './usePost';
import usePosts from './usePosts';
import useLoginModal from './useLoginModal';
import toast from 'react-hot-toast';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const [isPending, startTransition] = useTransition();

  const currentUser = useCurrentUser();

  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const currentFetchPost = fetchedPost?.[0];

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = currentFetchPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentFetchPost?.likedIds, currentUser?.id]);

  const toggleLiked = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    if (hasLiked) {
      startTransition(() => {
        like(postId, 'DISLIKE').then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            mutateFetchedPost();
            mutateFetchedPosts();
          }
        });
      });
    } else if (!hasLiked) {
      startTransition(() => {
        like(postId, 'LIKE').then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            mutateFetchedPost();
            mutateFetchedPosts();
          }
        });
      });
    }
  }, [
    loginModal,
    currentUser,
    hasLiked,
    mutateFetchedPost,
    mutateFetchedPosts,
    postId,
  ]);

  return { hasLiked, toggleLiked, isPending };
};

export default useLike;
