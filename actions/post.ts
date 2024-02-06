'use server';
import { auth } from '@/auth';
import db from '@/lib/db';
import { PostSchema } from '@/schemas';

import * as z from 'zod';

export const post = async (values: z.infer<typeof PostSchema>) => {
  const validatedFields = PostSchema.safeParse(values);
  const currentUser = await auth();

  if (!validatedFields.success) {
    return { error: 'Invalid tweet format!' };
  }

  const { body } = validatedFields.data;

  await db.post.create({
    data: {
      body,
      userId: currentUser?.user?.id || '',
    },
  });

  return { success: 'Tweet succesfully posted' };
};
