import mongoose from 'mongoose';

export async function up(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'comments';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        console.log('Starting migration: Creating comments collection');
        await db.createCollection(collectionName);
    } else {
        console.log('Comments collection already exists. Skipping creation.');
    }
}

export async function down(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'comments';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
        console.log('Dropping comments collection');
        await db.dropCollection(collectionName);
    } else {
        console.log('Comments collection does not exist. Skipping drop.');
    }
}
