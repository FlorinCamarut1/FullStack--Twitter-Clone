'use server';
import db from '@/lib/db';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Invalid method!' }, { status: 405 });
  }

  try {
    const data = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Could not fetch data!' },
      { status: 400 }
    );
  }
}
