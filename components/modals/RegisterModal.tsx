'use client';

import { useCallback, useState, useTransition } from 'react';
import { register } from '@/actions/register';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Input from '../Input';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import useUsers from '@/hooks/useUsers';

const RegisterModal = () => {
  const { mutate } = useUsers();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();

  const onToggle = useCallback(() => {
    if (isPending) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isPending]);

  const submitHandler = () => {
    startTransition(() => {
      register({
        email,
        name,
        username,
        password,
      }).then((data) => {
        if (data.error) {
          toast.error(`${data.error}`);
          return;
        }
        toast.success('Account created succesfully!');
        registerModal.onClose();
        setEmail('');
        setName('');
        setUsername('');
        setPassword('');
        mutate();
      });
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        disabled={isPending}
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isPending}
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        disabled={isPending}
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isPending}
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className='
            text-white 
            cursor-pointer 
            hover:underline
          '
        >
          {' '}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isPending}
        isOpen={registerModal.isOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={registerModal.onClose}
        onSubmit={submitHandler}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
