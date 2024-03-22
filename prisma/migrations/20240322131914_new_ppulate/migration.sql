/*
  Warnings:

  - You are about to drop the column `platform` on the `cryptocurrencies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cryptocurrencies" DROP COLUMN "platform",
ADD COLUMN     "token_address" TEXT;
