'use server';

import { auth } from '@/auth';

import db from '@/lib/db';
import { error } from 'console';

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

    if (method === 'POST') {
      updatedFollowingIds.push(userId);
    }
    if (method === 'DELETE') {
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
    return { success: 'Followed succesfully!' };
  } catch (error) {
    console.log(error);
    return { error: 'Cannot follow!' };
  }
};
