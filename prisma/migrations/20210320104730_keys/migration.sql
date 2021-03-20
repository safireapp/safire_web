-- AlterTable
ALTER TABLE "users" ADD COLUMN     "public_key" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "enc_priv_key" TEXT NOT NULL DEFAULT E'';
