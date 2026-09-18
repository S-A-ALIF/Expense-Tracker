import { pgTable, uuid, varchar, numeric, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { categories } from './categories';

export const TRANSACTION_TYPES = [
    'income',
    'expense',
    'received',
    'sent',
    'spent',
    'borrowed',
    'lent',
] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const PAYMENT_ACCOUNTS = [
    'Cash',
    'Bank',
    'bKash',
    'Nagad',
    'Credit Card',
    'Other',
] as const;

export type PaymentAccount = (typeof PAYMENT_ACCOUNTS)[number];

export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
        .references(() => users.id, { onDelete: 'cascade' })
        .notNull(),
    categoryId: uuid('category_id')
        .references(() => categories.id, { onDelete: 'restrict' })
        .notNull(),
    type: varchar('type', { length: 20 }).notNull(),
    amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
    currency: varchar('currency', { length: 10 }).default('BDT').notNull(),
    account: varchar('account', { length: 50 }).default('Cash').notNull(),
    description: text('description'),
    date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
    isRecurring: boolean('is_recurring').default(false).notNull(),
    recurrenceInterval: varchar('recurrence_interval', { length: 20 }),
    nextDueDate: timestamp('next_due_date', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
