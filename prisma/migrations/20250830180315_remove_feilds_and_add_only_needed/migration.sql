/*
  Warnings:

  - You are about to drop the column `color` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `textcolor` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Cart" DROP COLUMN "color",
DROP COLUMN "details",
DROP COLUMN "imageUrl",
DROP COLUMN "material",
DROP COLUMN "textcolor";
