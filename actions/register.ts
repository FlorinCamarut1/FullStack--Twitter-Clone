'use server';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

import { RegisterSchema } from '@/schemas';
import { getByUsername, getUserByEmail } from '@/data/user';
import useUsers from '@/hooks/useUsers';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid inputs' };
  }

  const { email, name, password, username } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUserName = await getByUsername(username);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: `Email (${email}) already in use!` };

  if (existingUserName)
    return { error: `Username (${username}) already exists!` };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  });
  // TODO send verification token email

  return { success: 'User created' };
};
