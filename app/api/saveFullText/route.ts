import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://abdullah:passwordname009@cluster0.tkq50g3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
