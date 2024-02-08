'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { post } from './post';

export const like = async (postId: string, method: string) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!postId || typeof postId !== 'string') {
    return { error: 'Invalid ID!' };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) return { error: 'Invalid ID!' };

  let updatedLikes = [...(post.likedIds || [])];

  if (method === 'LIKE') {
    updatedLikes.push(currentUser?.id as string);
    /**
     * Notifications
     */
    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await db.notification.create({
          data: {
            body: 'Someone liked you tweet!',
            userId: post.userId,
          },
        });

        await db.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return { error: 'Cannot post notification!' };
    }
  }

  if (method === 'DISLIKE') {
    updatedLikes = updatedLikes.filter(
      (likedId) => likedId !== currentUser?.id
    );
  }

  await db.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikes,
    },
  });

  return {
    success: `Succesfully ${method === 'LIKE' ? 'liked' : 'disliked'} post`,
  };
};
