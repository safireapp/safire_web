-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "commentId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
