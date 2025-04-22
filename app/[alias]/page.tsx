import { redirect, notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: { alias: string };
}) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const result = await collection.findOne({ alias: params.alias });

  if (!result) {
    notFound();
  }

  redirect(result.url);
  return null;
}
