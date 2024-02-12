import React, { useTransition } from 'react';
import { deletePost } from '@/actions/deletePost';
import { deleteComment } from '@/actions/deleteComment';

import Button from '../Button';
import toast from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

interface ConfirmDeletionProps {
  title?: string;
  postId?: string;
  commentId?: string;
  isOpen?: boolean;
  isComment?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  commentPostId?: string;
}

const ConfirmDeletion = ({
  title,
  postId,
  commentId,
  isOpen,
  isComment,
  setIsOpen,
  commentPostId,
}: ConfirmDeletionProps) => {
  const [isPending, startTransition] = useTransition();
  const { mutate: mutateDeletedPostComment } = usePost(commentPostId);
  const { mutate: mutateDeletedPosts } = usePosts();

  if (!setIsOpen) return null;

  const handleYes = () => {
    startTransition(() => {
      if (isComment) {
        deleteComment(commentId as string).then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            setIsOpen(false);
            mutateDeletedPostComment();
          }
        });
      } else {
        deletePost(postId as string).then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            setIsOpen(false);
            mutateDeletedPosts();
          }
        });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className='flex flex-col z-50 bg-black p-5 border-[1px] border-neutral-500 absolute w-[200px] left-[-200px] justify-center items-center'>
      <p className='text-white font-semibold text-center mb-2'>{title}</p>
      <div className='flex gap-4'>
        <Button label='Yes' onClick={handleYes} disabled={isPending} />
        <Button
          secondary
          label='No'
          disabled={isPending}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default ConfirmDeletion;
