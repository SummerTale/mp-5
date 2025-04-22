import clientPromise from '@/lib/mongodb';
import { redirect, notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AliasPageProps={ params: {alias:string}; };

export default async function AliasPage({ params }: AliasPageProps) {
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
