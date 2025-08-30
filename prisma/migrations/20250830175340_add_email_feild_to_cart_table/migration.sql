/*
  Warnings:

  - Added the required column `email` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Cart" ADD COLUMN     "email" TEXT NOT NULL;
