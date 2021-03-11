/*
  Warnings:

  - You are about to drop the column `likeCount` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `commentCount` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_postId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "likeCount",
DROP COLUMN "commentCount";
