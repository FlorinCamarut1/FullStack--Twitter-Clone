'use server';
import { auth } from '@/auth';

import db from '@/lib/db';

export const comments = async (body: string, postId: string) => {
  const session = await auth();
  const currentSessionUser = session?.user;

  const currentUserData = await db.user.findUnique({
    where: {
      id: currentSessionUser?.id,
    },
  });

  if (!postId || typeof postId !== 'string') {
    return { error: 'Invalid Id!' };
  }
  try {
    await db.comment.create({
      data: {
        body,
        userId: currentSessionUser?.id as string,
        postId,
      },
    });

    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId !== currentSessionUser?.id) {
        await db.notification.create({
          data: {
            body: `replied to your post!`,
            userId: post?.userId as string,
            postId,
            notificatorId: currentSessionUser?.id as string,
            notificatorUsername: currentUserData?.username,
          },
        });

        await db.user.update({
          where: {
            id: post?.userId,
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

    return { success: 'Succesfully added comment!' };
  } catch (error) {
    console.log(error);
    return { error: 'Could not add a new comment!' };
  }
};
