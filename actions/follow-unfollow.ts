'use server';

import { auth } from '@/auth';

import db from '@/lib/db';

export const followOrUnfollow = async (userId: string, method: string) => {
  try {
    const session = await auth();
    const currentSessionUser = session?.user;

    if (!userId || typeof userId !== 'string') {
      return { error: 'Invalid ID!' };
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const currentUserData = await db.user.findUnique({
      where: {
        id: currentSessionUser?.id,
      },
    });

    if (!user) return { error: 'Invalid ID!' };

    let updatedFollowingIds = [...(currentUserData?.followingIds || [])];

    if (method === 'FOLLOW') {
      updatedFollowingIds.push(userId);

      try {
        await db.notification.create({
          data: {
            body: `has started following you!`,
            userId,
            notificatorId: currentUserData?.id,
            notificatorUsername: currentUserData?.username,
            postId: 'user',
          },
        });

        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      } catch (error) {
        console.log(error);
        return { error: 'Cannot post notfication!' };
      }
    }
    if (method === 'UNFOLLOW') {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }
    await db.user.update({
      where: {
        id: currentSessionUser?.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    return {
      success: `${
        method === 'FOLLOW' ? 'Followed' : 'Unfollowed'
      } succesfully!`,
    };
  } catch (error) {
    console.log(error);
    return { error: 'Cannot follow!' };
  }
};
