-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
