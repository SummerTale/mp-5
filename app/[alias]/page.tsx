import { redirect, notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    alias: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Redirecting...`,
  };
}

export default async function Page({ params }: Props) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('urls');

  const record = await collection.findOne({ alias: params.alias });

  if (!record) {
    notFound();
  }

  redirect(record.url);
}