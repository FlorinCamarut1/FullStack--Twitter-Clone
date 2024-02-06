'use server';

import { auth } from '@/auth';
import { EditUserSchema } from '@/schemas';

import db from '@/lib/db';
import * as z from 'zod';

export const editUser = async (values: z.infer<typeof EditUserSchema>) => {
  const validatedFields = EditUserSchema.safeParse(values);
  const currentUser = await auth();

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, username, bio, profileImage, coverImage } =
    validatedFields.data;

  if (!name || !username) {
    return { error: 'Missing fields!' };
  }

  await db.user.update({
    where: {
      id: currentUser?.user?.id,
    },
    data: {
      name,
      username,
      bio,
      profileImage,
      coverImage,
    },
  });

  return { success: 'Data was updated succesfully!' };
};
