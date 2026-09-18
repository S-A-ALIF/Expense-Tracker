import { eq } from 'drizzle-orm';
import { db, pool } from './index';
import { categories, NewCategory } from './schema';

const DEFAULT_CATEGORIES: Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { name: 'Food & Dining', type: 'expense', icon: 'utensils', color: '#EF4444', isDefault: true, userId: null },
    { name: 'Groceries', type: 'expense', icon: 'shopping-cart', color: '#F97316', isDefault: true, userId: null },
    { name: 'Transportation', type: 'expense', icon: 'car', color: '#F59E0B', isDefault: true, userId: null },
    { name: 'Housing & Rent', type: 'expense', icon: 'home', color: '#3B82F6', isDefault: true, userId: null },
    { name: 'Utilities & Bills', type: 'expense', icon: 'zap', color: '#6366F1', isDefault: true, userId: null },
    { name: 'Health & Medical', type: 'expense', icon: 'heart-pulse', color: '#EC4899', isDefault: true, userId: null },
    { name: 'Entertainment', type: 'expense', icon: 'film', color: '#8B5CF6', isDefault: true, userId: null },
    { name: 'Education', type: 'expense', icon: 'graduation-cap', color: '#14B8A6', isDefault: true, userId: null },
    { name: 'Shopping & Personal', type: 'expense', icon: 'shopping-bag', color: '#06B6D4', isDefault: true, userId: null },
    { name: 'Other Expense', type: 'expense', icon: 'more-horizontal', color: '#6B7280', isDefault: true, userId: null },

    { name: 'Salary', type: 'income', icon: 'briefcase', color: '#10B981', isDefault: true, userId: null },
    { name: 'Business', type: 'income', icon: 'trending-up', color: '#059669', isDefault: true, userId: null },
    { name: 'Freelance & Side Gig', type: 'income', icon: 'laptop', color: '#34D399', isDefault: true, userId: null },
    { name: 'Investments', type: 'income', icon: 'pie-chart', color: '#2563EB', isDefault: true, userId: null },
    { name: 'Gifts & Allowance', type: 'income', icon: 'gift', color: '#F43F5E', isDefault: true, userId: null },
    { name: 'Other Income', type: 'income', icon: 'wallet', color: '#10B981', isDefault: true, userId: null },
];

const seedDefaultCategories = async () => {
    console.log('🌱 Starting database seed for default categories...');

    try {
        const existingDefaults = await db
            .select({ name: categories.name })
            .from(categories)
            .where(eq(categories.isDefault, true));

        const existingNames = new Set(existingDefaults.map((cat) => cat.name));

        const categoriesToInsert = DEFAULT_CATEGORIES.filter(
            (category) => !existingNames.has(category.name)
        );

        if (categoriesToInsert.length === 0) {
            console.log('✅ Default categories already exist in database. No new records needed.');
        } else {
            await db.insert(categories).values(categoriesToInsert);
            console.log(`✅ Successfully seeded ${categoriesToInsert.length} default categories.`);
        }
    } catch (error) {
        console.error('❌ Error while seeding default categories:', error);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('🔌 Database pool closed.');
    }
};

seedDefaultCategories();
