import React, { useTransition } from 'react';
import { deletePost } from '@/actions/deletePost';
import { deleteComment } from '@/actions/deleteComment';

import Modal from '../Modal';

import toast from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';
import useDeleteModal from '@/hooks/useDeleteModal';
import usePost from '@/hooks/usePost';

interface HandleDeleteModalProps {
  title?: string;
  isComment?: boolean;
  id?: string;
  commentPostId?: string;
}

const HandleDeleteModal = ({
  title,
  isComment,
  id,
  commentPostId,
}: HandleDeleteModalProps) => {
  const [isPending, startTransition] = useTransition();
  const { mutate: mutateFetchedPosts } = usePosts();
  const { mutate: mutateFetchedPost } = usePost(commentPostId);

  const deleteModal = useDeleteModal();

  const onSubmit = () => {
    if (isComment) {
      startTransition(() => {
        deleteComment(id as string).then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            deleteModal.onClose();
            mutateFetchedPost();
          }
        });
      });
    } else {
      startTransition(() => {
        deletePost(id as string).then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else if (data.success) {
            toast.success(data.success);
            deleteModal.onClose();
            mutateFetchedPosts();
          }
        });
      });
    }
  };
  return (
    <Modal
      disabled={isPending}
      isOpen={deleteModal.isOpen}
      title={title}
      actionLabel='Delete'
      onClose={deleteModal.onClose}
      onSubmit={onSubmit}
    />
  );
};

export default HandleDeleteModal;
