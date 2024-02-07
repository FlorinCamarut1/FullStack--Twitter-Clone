import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCallback, useState, useTransition } from 'react';
import { post } from '@/actions/post';
import { comments } from '@/actions/comments';

import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';

import toast from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';
import usePost from '@/hooks/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form = ({ placeholder, isComment, postId }: FormProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const currentUser = useCurrentUser();

  const [isPending, startTransition] = useTransition();

  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');

  const onSubmit = useCallback(async () => {
    if (isComment) {
      startTransition(() => {
        comments(body, postId as string).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            mutatePosts();
            mutatePost();
            setBody('');
          }
        });
      });
    } else {
      startTransition(() => {
        post({ body }).then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            mutatePosts();
            setBody('');
          }
        });
      });
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id || ''} />
          </div>

          <div className='w-full'>
            <textarea
              disabled={isPending}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white'
              placeholder={placeholder}
            ></textarea>
            <hr className=' opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                label='Tweet'
                disabled={isPending || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-2xl text-center mb-4 font-bold'>
            Welcome to Twitter!
          </h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Login' onClick={loginModal.onOpen} />
            <Button label='Register' secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
