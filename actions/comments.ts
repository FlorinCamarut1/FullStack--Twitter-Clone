'use server';
import { auth } from '@/auth';

import db from '@/lib/db';

export const comments = async (body: string, postId: string) => {
  const session = await auth();
  const currentUser = session?.user;

  if (!postId || typeof postId !== 'string') {
    return { error: 'Invalid Id!' };
  }
  try {
    await db.comment.create({
      data: {
        body,
        userId: currentUser?.id as string,
        postId,
      },
    });
    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma?.notification.create({
          data: {
            body: 'Someone replied to your tweet!',
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

    return { success: 'Succesfully added comment!' };
  } catch (error) {
    console.log(error);
    return { error: 'Could not add a new comment!' };
  }
};
