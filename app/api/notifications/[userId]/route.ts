import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';

export const GET = async (request: NextRequest, context: any) => {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Invalid Method!' }, { status: 405 });
  }
  try {
    const { params } = context;
    const userId = params.userId;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID!');
    }
    const notifications = await db.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    /**
     * Once got notification reset it with following:
     */
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Cannot get notifications!' },
      { status: 400 }
    );
  }
};
