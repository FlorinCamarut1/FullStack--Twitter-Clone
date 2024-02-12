'use server';

import { auth } from '@/auth';

import db from '@/lib/db';

export const deletePost = async (postId: string) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!postId) return { error: 'Invalid Post ID!' };

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  await db.post.delete({
    where: {
      id: postId,
    },
  });

  return { success: 'Post Deleted Succesfully!' };
};
