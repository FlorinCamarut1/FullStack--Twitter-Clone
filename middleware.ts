import authConfig from './auth.config';
import NextAuth from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from './routes';
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // if (!isLoggedIn) {
  //   return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  // }

  return null;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
