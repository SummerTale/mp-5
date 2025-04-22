import clientPromise from '@/lib/mongodb';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AliasPage({
  params,
}: {
  params: { alias: string };
}) {
  const alias = params.alias;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const record = await collection.findOne({ alias });

  if (record) {
    redirect(record.url);
  } else {
    notFound();
  }
}
