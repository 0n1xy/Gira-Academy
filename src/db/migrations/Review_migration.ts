import mongoose from 'mongoose';

export async function up(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'reviews';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        console.log('Starting migration: Creating reviews collection');
        await db.createCollection(collectionName);
    } else {
        console.log('Reviews collection already exists. Skipping creation.');
    }
}

export async function down(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'reviews';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
        console.log('Dropping reviews collection');
        await db.dropCollection(collectionName);
    } else {
        console.log('Reviews collection does not exist. Skipping drop.');
    }
}
