import clientPromise from '@/lib/mongodb';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// @ts-expect-error Next.js will inject correct params type at runtime
export default async function Page({ params }) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const record = await collection.findOne({ alias: params.alias });

  if (record) {
    redirect(record.url);
  } else {
    notFound();
  }
}
