import { integer, json } from 'drizzle-orm/pg-core';
import { pgTable, varchar, serial , boolean}  from 'drizzle-orm/pg-core';

export const Users = pgTable("users", {
    id: serial("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(), 
    imageUrl: varchar("imageUrl", { length: 255 }),
    subscription: boolean('subscription').default(false),
    credits: integer('credits').default(30)
});

export const VideoData = pgTable("videoData",{
    id: serial("id", { length: 35 }).primaryKey(),
    script: json("script").notNull(), 
    audioFileUrl: varchar("audioFileUrl", { length: 255 }).notNull(), 
    captions: json("captions").notNull(), 
    imageList: varchar("imageList", { length: 255 }).array(), 
    createdBy: varchar("createdBy", { length: 255 }).notNull(),
});

