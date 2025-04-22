import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const { url, alias } = await req.json();

  // URL validation
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const existing = await collection.findOne({ alias });

  if (existing) {
    // If the existing alias maps to the same URL → just reuse
    if (existing.url === url) {
      return NextResponse.json({
        shortUrl: `${process.env.BASE_URL}/${alias}`,
        reused: true,
      });
    } else {
      // Alias taken for a different URL
      return NextResponse.json(
        {
          error: 'Alias already exists for a different URL',
          shortUrl: `${process.env.BASE_URL}/${alias}`,
        },
        { status: 409 }
      );
    }
  }

  await collection.insertOne({ alias, url });

  return NextResponse.json({
    shortUrl: `${process.env.BASE_URL}/${alias}`,
    created: true,
  });
}
