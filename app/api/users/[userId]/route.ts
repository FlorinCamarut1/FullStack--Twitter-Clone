import { getUserById } from '@/data/user';

import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export async function GET(request: NextRequest, context: any) {
  try {
    const { params } = context;

    const userId = params.userId;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID!');
    }

    const existingUser = await getUserById(userId);

    const followersCount = await db.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return NextResponse.json(
      { ...existingUser, followersCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Could not find specific User!' },
      { status: 400 }
    );
  }
}
