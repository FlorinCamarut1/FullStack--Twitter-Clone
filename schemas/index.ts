import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export const RegisterSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, {
    message: 'Password is too short! (minimum 6 character required!)',
  }),
});
export const EditUserSchema = z.object({
  name: z.optional(z.string()),
  username: z.optional(z.string()),
  bio: z.optional(z.string()),
  profileImage: z.optional(z.string()),
  coverImage: z.optional(z.string()),
});

export const PostSchema = z.object({
  body: z
    .string()
    .min(1, { message: 'Please enter at least 1 character for your post!' }),
});
