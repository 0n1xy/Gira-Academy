import mongoose from 'mongoose';

export async function up(): Promise<void> {
	const db = mongoose.connection;
	const collectionName = 'users';

	const collections = await db.db.listCollections({ name: collectionName }).toArray();
	if (collections.length === 0) {
		console.log('Starting migration: Creating users collection');
		await db.createCollection(collectionName);
	} else {
		console.log('Users collection already exists. Skipping creation.');
	}
}

export async function down(): Promise<void> {
	const db = mongoose.connection;
	const collectionName = 'users';

	const collections = await db.db.listCollections({ name: collectionName }).toArray();
	if (collections.length > 0) {
		console.log('Dropping users collection');
		await db.dropCollection(collectionName);
	} else {
		console.log('Users collection does not exist. Skipping drop.');
	}
}
