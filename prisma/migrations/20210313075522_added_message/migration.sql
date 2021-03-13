-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'NEW_DM';

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "postId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "messages.id_unique" ON "messages"("id");

-- AddForeignKey
ALTER TABLE "messages" ADD FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
