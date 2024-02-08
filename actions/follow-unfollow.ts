'use server';

import { auth } from '@/auth';

import db from '@/lib/db';
import { FaB } from 'react-icons/fa6';

export const followOrUnfollow = async (userId: string, method: string) => {
  try {
    const session = await auth();
    const currentUser = session?.user;

    if (!userId || typeof userId !== 'string') {
      return { error: 'Invalid ID!' };
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    const curUser = await db.user.findUnique({
      where: {
        id: currentUser?.id,
      },
    });

    if (!user) return { error: 'Invalid ID!' };

    let updatedFollowingIds = [...(curUser?.followingIds || [])];

    if (method === 'FOLLOW') {
      updatedFollowingIds.push(userId);

      try {
        await db.notification.create({
          data: {
            body: 'Someone followed you!',
            userId,
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
        id: currentUser?.id,
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
