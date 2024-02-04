'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { editUser } from '@/actions/edit';

import useEditModal from '@/hooks/useEditModal';

import toast from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../Input';

import useUser from '@/hooks/useUser';
import useUsers from '@/hooks/useUsers';
import ImageUpload from '../ImageUpload';

interface EditModalProps {
  currentUser?: any;
}

const EditModal = ({ currentUser }: EditModalProps) => {
  const { mutate: mutateFetchedUser, data: currUser } = useUser(
    currentUser?.id
  );
  const { mutate: mutateFetchedUsers } = useUsers();

  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  const [isPending, startTransition] = useTransition();

  const onSubmit = useCallback(() => {
    startTransition(() => {
      editUser({ name, username, profileImage, coverImage, bio }).then(
        (data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            mutateFetchedUser();
            mutateFetchedUsers();
            editModal.onClose();
          }
        }
      );
    });
  }, [
    bio,
    coverImage,
    name,
    username,
    profileImage,
    editModal,
    mutateFetchedUser,
    mutateFetchedUsers,
  ]);

  useEffect(() => {
    setName(currUser.name);
    setUsername(currUser.username);
    setBio(currUser.bio);
    setProfileImage(currUser.profileImage);
  }, [currUser.name, currUser.username, currUser.bio, currUser.profileImage]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isPending}
        onChange={(image) => setProfileImage(image)}
        label='Upload profile picture'
      />
      <ImageUpload
        value={coverImage}
        disabled={isPending}
        onChange={(image) => setCoverImage(image)}
        label='Upload cover picture'
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isPending}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isPending}
      />
      <Input
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isPending}
      />
    </div>
  );

  return (
    <Modal
      disabled={isPending}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
