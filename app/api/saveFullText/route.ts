import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = "blogSummarizerDB";

export async function POST(req: Request) {
  const { url, fullText } = await req.json();

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('fulltexts');

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date()
    });

    await client.close();

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("MongoDB Save Error:", err);
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
