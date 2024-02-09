'use server';

import { auth } from '@/auth';

import db from '@/lib/db';

export const like = async (postId: string, method: string) => {
  const session = await auth();
  const currentSessionUser = session?.user;

  const currentUserData = await db.user.findUnique({
    where: { id: currentSessionUser?.id },
  });

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
    updatedLikes.push(currentSessionUser?.id as string);
    /**
     * Notifications
     */
    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId !== currentSessionUser?.id) {
        await db.notification.create({
          data: {
            body: `liked your tweet!`,
            userId: post?.userId as string,
            notificatorId: currentUserData?.id,
            postId,
            notificatorUsername: currentUserData?.username,
          },
        });

        await db.user.update({
          where: {
            id: post?.userId as string,
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
      (likedId) => likedId !== currentSessionUser?.id
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
