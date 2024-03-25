/*
  Warnings:

  - You are about to drop the `UserPortfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GeckoCoinIDToUserPortfolio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPortfolio" DROP CONSTRAINT "UserPortfolio_userId_fkey";

-- DropForeignKey
ALTER TABLE "_GeckoCoinIDToUserPortfolio" DROP CONSTRAINT "_GeckoCoinIDToUserPortfolio_A_fkey";

-- DropForeignKey
ALTER TABLE "_GeckoCoinIDToUserPortfolio" DROP CONSTRAINT "_GeckoCoinIDToUserPortfolio_B_fkey";

-- DropTable
DROP TABLE "UserPortfolio";

-- DropTable
DROP TABLE "_GeckoCoinIDToUserPortfolio";

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PortfolioGeckoCoins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PortfolioGeckoCoins_AB_unique" ON "_PortfolioGeckoCoins"("A", "B");

-- CreateIndex
CREATE INDEX "_PortfolioGeckoCoins_B_index" ON "_PortfolioGeckoCoins"("B");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioGeckoCoins" ADD CONSTRAINT "_PortfolioGeckoCoins_A_fkey" FOREIGN KEY ("A") REFERENCES "GeckoCoinID"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PortfolioGeckoCoins" ADD CONSTRAINT "_PortfolioGeckoCoins_B_fkey" FOREIGN KEY ("B") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
