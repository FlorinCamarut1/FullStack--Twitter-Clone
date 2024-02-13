'use server';
import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(request: Request, context: any) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Invalid Method!' }, { status: 405 });
  }
  try {
    const { params } = context;

    const postId = params.postId;

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID!');
    }
    const post = await db.post.findMany({
      where: { id: postId },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(
      post,

      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Unable to fetch specific user post!' },
      { status: 400 }
    );
  }
}
