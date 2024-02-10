import { useTransition } from 'react';
import { deletePost } from '@/actions/deletePost';

import Button from '../Button';
import toast from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';

interface DeletePostModalProps {
  postId?: string;
  isOpen?: boolean;
  setIsOpen?: boolean | any;
}
const DeletePostModal = ({
  postId,
  isOpen,
  setIsOpen,
}: DeletePostModalProps) => {
  const { mutate: mutateFetchedPosts } = usePosts();

  const [isPending, startTransition] = useTransition();

  const handleYes = (event: any) => {
    event.stopPropagation();

    startTransition(() => {
      deletePost(postId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
          setIsOpen(false);
          mutateFetchedPosts();
        }
      });
    });
  };
  const handleNo = (event: any) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  if (!isOpen) {
    return;
  }

  return (
    <div className=' absolute flex flex-col p-5 bg-black border-[1px] border-neutral-500 left-[-200px] top-[50%] z-50 rounded-xl gap-2 justify-center items-center'>
      <p className='text-white'>Are you sure you want to delete this post?</p>
      <div className='flex gap-5'>
        <Button label='Yes' onClick={handleYes as any} disabled={isPending} />
        <Button
          label='No'
          secondary
          onClick={handleNo as any}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default DeletePostModal;
