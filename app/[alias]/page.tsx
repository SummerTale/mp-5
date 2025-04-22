import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';

export default async function AliasPage({ params }: { params: { alias: string } }) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const record = await collection.findOne({ alias: params.alias });

  if (record) {
    redirect(record.url);
  } else {
    return <p className="text-center text-red-500 mt-10">Alias not found</p>;
  }
}