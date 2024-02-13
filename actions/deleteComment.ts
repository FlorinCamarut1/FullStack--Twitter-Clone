'use server';

import { auth } from '@/auth';

import db from '@/lib/db';

export const deleteComment = async (commentId: string) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!commentId) return { error: 'Invalid Comment ID!' };

  const comment = await db.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (currentUser?.id === comment?.userId) {
    await db.comment.delete({
      where: {
        id: commentId,
      },
    });
  }

  return { success: 'Comment Deleted Succesfully!' };
};
