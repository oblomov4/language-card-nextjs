import { relations, sql } from 'drizzle-orm';
import { pgTable, varchar, serial, pgEnum, timestamp, integer } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);

export const users = pgTable('users', {
  id: serial().primaryKey(),

  fullName: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
  role: roleEnum().default('USER').notNull(),

  verified: timestamp('verified', { mode: 'string', precision: 3 }),

  provider: varchar(),
  providerId: varchar(),

  createdAt: timestamp('created_at', { mode: 'string', precision: 3 }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', precision: 3 }).$onUpdate(() => sql`now()`),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const verificationCode = pgTable('verification_code', {
  id: serial().primaryKey(),

  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),

  code: varchar().unique().notNull(),

  createdAt: timestamp('created_at', { mode: 'string', precision: 3 }).defaultNow(),
});

export type SelectVerificationCode = typeof verificationCode.$inferSelect;
export type InsertVerificationCode = typeof verificationCode.$inferSelect;

export const forgotPasswordCode = pgTable('forgot_password_code', {
  id: serial().primaryKey(),

  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),

  code: varchar().unique().notNull(),

  createdAt: timestamp('created_at', { mode: 'string', precision: 3 }).defaultNow(),
});

export type SelectForgotPasswordCode = typeof forgotPasswordCode.$inferSelect;
export type InsertForgotPasswordCode = typeof forgotPasswordCode.$inferSelect;

export const cards = pgTable('cards', {
  id: serial().primaryKey(),

  wordOne: varchar('word_one').notNull(),
  wordClue: varchar('word_clue').default('-').notNull(),
  wordTwo: varchar('word_two').notNull(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),

  createdAt: timestamp('created_at', { mode: 'string', precision: 3 }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', precision: 3 }).$onUpdate(() => sql`now()`),
});

export const cardsRelations = relations(cards, ({ many }) => ({
  repeatCards: many(repeatCards),
}));

export type InsertCard = typeof cards.$inferInsert;
export type SelectCard = typeof cards.$inferSelect;

export const repeatCards = pgTable('repeat_cards', {
  id: serial().primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  cardId: integer('card_id')
    .references(() => cards.id, { onDelete: 'cascade' })
    .notNull(),
  count: integer().default(3).notNull(),

  createdAt: timestamp('created_at', { mode: 'string', precision: 3 }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', precision: 3 }).$onUpdate(() => sql`now()`),
});

export const repeatCardsRelations = relations(repeatCards, ({ one }) => ({
  cards: one(cards, {
    fields: [repeatCards.cardId],
    references: [cards.id],
  }),
}));

export type InsertRepeatCard = typeof repeatCards.$inferInsert;
export type SelectRepeatCard = typeof repeatCards.$inferSelect;
