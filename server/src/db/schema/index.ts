import { relations } from 'drizzle-orm';
import { users } from './users';
import { categories } from './categories';
import { transactions } from './transactions';

// Re-export all table schemas and TypeScript types
export * from './users';
export * from './categories';
export * from './transactions';

export const usersRelations = relations(users, ({ many }) => ({
    transactions: many(transactions),
    categories: many(categories),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    user: one(users, {
        fields: [categories.userId],
        references: [users.id],
    }),
    transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
    user: one(users, {
        fields: [transactions.userId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));
