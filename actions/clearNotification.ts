'use server';

import { auth } from '@/auth';

import db from '@/lib/db';

export const clearNotification = async (id?: string) => {
  const session = await auth();
  const currentUser = session?.user;

  const notifications = await db.notification.findMany({
    where: {
      userId: currentUser?.id,
    },
  });

  if (!notifications) {
    return { error: 'Could not find any notification!' };
  }

  if (!id) {
    await db.notification.deleteMany({
      where: {
        userId: currentUser?.id,
      },
    });
  } else {
    await db.notification.delete({
      where: {
        id,
      },
    });
  }
  return {
    success: `${id ? 'Notification' : 'Notifications'} deleted successfully!`,
  };
};
