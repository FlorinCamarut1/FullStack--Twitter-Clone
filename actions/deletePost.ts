'use server';

import db from '@/lib/db';

export const deletePost = async (postId: string) => {
  if (!postId) return { error: 'Invalid Post ID!' };

  await db.post.delete({
    where: {
      id: postId,
    },
  });

  return { success: 'Post Deleted Succesfully!' };
};
