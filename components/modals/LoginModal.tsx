'use client';
import { useCallback, useState, useTransition } from 'react';
import { login } from '@/actions/login';

import useLoginModal from '@/hooks/useLoginModal';
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import toast from 'react-hot-toast';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onToggle = useCallback(() => {
    if (isPending) return;
    loginModal.onClose();
    registerModal.onOpen();
  }, [isPending, registerModal, loginModal]);

  const onSubmit = () => {
    startTransition(() => {
      login({ email, password }).then((data) => {
        if (data?.error) {
          toast.error(`${data.error}`);
          return;
        }
        if (data?.success) {
          toast.success(data?.success);
          loginModal.onClose();
          setEmail('');
          setPassword('');
        }
      });
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isPending}
      />
      <Input
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isPending}
      />
    </div>
  );
  const footerContent = (
    <div className=' text-neutral-400 text-center mt-14'>
      <p>
        {`You dont't have an account yet?`}
        <span
          onClick={onToggle}
          className=' text-white cursor-pointer hover:underline'
        >
          {' '}
          Register now{' '}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isPending}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
