'use server';
import db from '@/lib/db';

export const getAllUsers = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!users) return { error: 'Could not fetch user data!' };

  return users;
};
