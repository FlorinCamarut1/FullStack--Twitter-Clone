import React, { useTransition } from 'react';
import { deletePost } from '@/actions/deletePost';
import { deleteComment } from '@/actions/deleteComment';

import Modal from '../Modal';

import toast from 'react-hot-toast';
import usePosts from '@/hooks/usePosts';
import useDeleteModal from '@/hooks/useDeleteModal';

interface HandleDeleteModalProps {
  title?: string;
  isComment?: boolean;
  postId?: string;
  commentId?: string;
}

const HandleDeleteModal = ({
  title,
  isComment,
  postId,
  commentId,
}: HandleDeleteModalProps) => {
  const [isPending, startTransition] = useTransition();
  const { mutate: mutateFetchedPosts } = usePosts();

  const deleteModal = useDeleteModal();

  const onSubmit = () => {
    startTransition(() => {
      deleteComment(commentId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else if (data.success) {
          toast.success(data.success);
          deleteModal.onClose();
        }
      });
    });
    if (isComment) {
    } else {
      startTransition(() => {
        deletePost(postId as string).then((data) => {
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
