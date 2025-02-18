import mongoose from 'mongoose';

export async function up(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'socialauthinfos';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        console.log('Starting migration: Creating socialauthinfos collection');
        await db.createCollection(collectionName);
    } else {
        console.log('SocialAuthInfos collection already exists. Skipping creation.');
    }
}

export async function down(): Promise<void> {
    const db = mongoose.connection;
    const collectionName = 'socialauthinfos';

    const collections = await db.db.listCollections({ name: collectionName }).toArray();
    if (collections.length > 0) {
        console.log('Dropping socialauthinfos collection');
        await db.dropCollection(collectionName);
    } else {
        console.log('SocialAuthInfos collection does not exist. Skipping drop.');
    }
}
