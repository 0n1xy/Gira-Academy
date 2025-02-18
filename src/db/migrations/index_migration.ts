
import ConnectDB from '../../services/Mongo_DB_Service';
import { up as UserMigrationUp, down as UserMigrationDown } from './User_migration';
import { up as AddressMigrationUp, down as AddressMigrationDown } from './Address_migration';
import { up as ShopsMigrationUp, down as ShopsMigrationDown } from './Shop_migration';
import { up as ProductsMigrationUp, down as ProductsMigrationDown } from './Product_migration';
import { up as CartMigrationUp, down as CartMigrationDown } from './Cart_migration';
import { up as CategoryMigrationUp, down as CategoryMigrationDown } from './Category_migration';
import { up as CommentMigrationUp, down as CommentMigrationDown } from './Comment_migration';
import { up as ReviewMigrationUp, down as ReviewMigrationDown } from './Review_migration';
import { up as SellerInfosMigrationUp, down as SellerInfosMigrationDown } from './SellerInfos_migration';
import { up as SocialAuthInfosMigrationUp, down as SocialAuthInfosMigrationDown } from './SocialAuthInfos_migration';
interface Migration {
    up: () => Promise<void>;
    down: () => Promise<void>;
    name: string;
}

const migrations: Migration[] = [
    { up: UserMigrationUp, down: UserMigrationDown, name: 'UserMigration' },
    { up: AddressMigrationUp, down: AddressMigrationDown, name: 'AddressMigration' },
    { up: ShopsMigrationUp, down: ShopsMigrationDown, name: 'ShopMigration' },
    { up: ProductsMigrationUp, down: ProductsMigrationDown, name: 'ProductsMigration' },
    { up: CartMigrationUp, down: CartMigrationDown, name: 'CartMigration' },
    { up: CategoryMigrationUp, down: CategoryMigrationDown, name: 'CategoryMigration' },
    { up: CommentMigrationUp, down: CommentMigrationDown, name: 'CommentMigration' },
    { up: ReviewMigrationUp, down: ReviewMigrationDown, name: 'ReviewMigration' },
    { up: SellerInfosMigrationUp, down: SellerInfosMigrationDown, name: 'SellerInfosMigration' },
    { up: SocialAuthInfosMigrationUp, down: SocialAuthInfosMigrationDown, name: 'SocialAuthInfosMigration' },
];

async function runMigrations(direction: 'up' | 'down'): Promise<void> {
    const db = new ConnectDB();
    await db.connect();

    try {
        const migrationPromises = migrations.map(async (migration) => {
            console.log(`Running ${migration.name} ${direction}`);
            try {
                if (direction === 'up') {
                    await migration.up();
                } else if (direction === 'down') {
                    await migration.down();
                }
                console.log(`${migration.name} ${direction} completed.`);
            } catch (error) {
                console.error(`Error running ${migration.name} ${direction}:`, error);
                throw error; // Re-throw the error to stop the process
            }
        });

        await Promise.all(migrationPromises);
    } catch (error) {
        process.exit(1); // Exit the process if any migration fails
    } finally {
        await db.disconnect();
    }
}

// Run the migrations based on the argument
(async () => {
    const direction = process.argv[2] as 'up' | 'down';
    if (direction === 'up' || direction === 'down') {
        await runMigrations(direction);
    } else {
        console.log('Please specify "up" or "down"');
        process.exit(1);
    }
})();
