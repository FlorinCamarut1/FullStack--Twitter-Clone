import { auth } from '@/auth';
import db from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
