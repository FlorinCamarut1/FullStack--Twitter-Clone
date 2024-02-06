'use server';

import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Invalid Method!' }, { status: 405 });
  }

  const userId = request.nextUrl.searchParams.get('userId') || undefined;

  let posts;

  try {
    if (userId && typeof userId === 'string') {
      posts = await db.post.findMany({
        where: { userId },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      posts = await db.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get any posts!');
  }
}
