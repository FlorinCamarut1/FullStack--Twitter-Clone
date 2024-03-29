import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import Avatar from '../Avatar';
import useLike from '@/hooks/useLike';
import LongMenu from '../LongMenu';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem = ({ data = {}, userId }: PostItemProps) => {
  const currentUser = useCurrentUser();

  const { toggleLiked, hasLiked, isPending } = useLike({
    postId: data?.id,
    userId,
  });

  const [isFilledIcon, setIsFilledIcon] = useState<boolean>(hasLiked);
  const router = useRouter();
  const loginModal = useLoginModal();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data?.user?.id}`);
    },
    [data?.user?.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLiked();
      setIsFilledIcon((fill) => !fill);

      if (hasLiked) {
        setIsFilledIcon(false);
      }
    },
    [loginModal, currentUser, toggleLiked, hasLiked]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data.createdAt]);

  const LikeIcon =
    isFilledIcon || hasLiked ? (
      <AiFillHeart size={20} color='red' />
    ) : (
      <AiOutlineHeart size={20} />
    );
  return (
    <div
      onClick={goToPost}
      className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative'
    >
      {currentUser?.id === data?.userId && (
        <div className='absolute right-0 h-11 w-11'>
          <LongMenu postId={data?.id} options={['delete']} />
        </div>
      )}
      <div className=' flex flex-row items-start gap-3'>
        <Avatar userId={data?.user?.id} />
        <div>
          <div className=' flex flex-row items-center gap-2'>
            <p
              className='text-white font-semibold cursor-pointer hover:underline'
              onClick={goToUser}
            >
              {data?.user?.name}
            </p>
            <span
              className='text-neutral-500 cursor-pointer hover:underline hidden md:block'
              onClick={goToUser}
            >
              @{data?.user?.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500'>
              <AiOutlineMessage size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>
            <div
              className='flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500'
              onClick={onLike}
            >
              {LikeIcon}
              <p>{data?.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
