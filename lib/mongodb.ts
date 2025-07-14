import { MongoClient } from 'mongodb';

// MongoDB connection URI

const uri = process.env.MONGODB_URI!;

// Create MongoClient instance
const client = new MongoClient(uri);
const dbName = "blogSummarizerDB"; // Database name

// Save function
export async function saveToMongo(url: string, fullText: string) {
  try {
    await client.connect(); // Connect to MongoDB
    const db = client.db(dbName); // Use the database
    const collection = db.collection('fulltexts'); // Use 'fulltexts' collection

    const result = await collection.insertOne({
      url,
      fullText,
      createdAt: new Date() // Save timestamp
    });

    console.log("✅ Saved to MongoDB with ID:", result.insertedId);
  } catch (err) {
    console.error("❌ MongoDB Save Error:", err);
  } finally {
    await client.close(); // Close connection after saving
  }
}
