import { redirect, notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

interface AliasParams {
  params: {
    alias: string;
  };
}
export default async function Page({ params }: AliasParams) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const record = await collection.findOne({ alias: params.alias });

  if (!record) {
    notFound();
  }

  redirect(record.url);
  return null;
}