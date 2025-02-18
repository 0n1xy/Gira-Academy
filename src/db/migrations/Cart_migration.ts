import mongoose from 'mongoose';

export async function up(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'carts';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        console.log('Starting migration: Creating carts collection');
        await db.createCollection(collectionName);
    } else {
        console.log('Carts collection already exists. Skipping creation.');
    }
}

export async function down(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'carts';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
        console.log('Dropping carts collection');
        await db.dropCollection(collectionName);
    } else {
        console.log('Carts collection does not exist. Skipping drop.');
    }
}
