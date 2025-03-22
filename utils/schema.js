import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const mockInterviewSchema = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExp: varchar("jobExp").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const userAnswerSchema = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: varchar("correctAnswer").notNull(),
  userAnswer: text("userAnswer").notNull(),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt").notNull(),
});

export const coverLetterSchema = pgTable("coverLetter", {
  id: serial("id").primaryKey(),
  coverLetterId: varchar("coverLetterId").notNull(),
  coverLetterResp: text("coverLetterResp").notNull(),
  coverLetterTitle: varchar("coverLetterTitle").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const resumeSchema = pgTable("resume", {
  id: serial("id").primaryKey(),
  resumeId: varchar("resumeId").notNull(),
  resumeDetail: text("resumeDetail"),
  resumeTitle: varchar("resumeTitle").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
