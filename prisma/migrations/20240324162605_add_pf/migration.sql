/*
  Warnings:

  - You are about to drop the `CryptoDataGecko` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cryptocurrencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CryptoDataGecko";

-- DropTable
DROP TABLE "cryptocurrencies";

-- CreateTable
CREATE TABLE "GeckoCoinID" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "web_slug" TEXT,
    "description" JSONB,
    "image" JSONB,
    "market_cap_rank" INTEGER,
    "market_data" JSONB,
    "community_data" JSONB,
    "developer_data" JSONB,
    "last_updated" TIMESTAMP(3),
    "tickers" JSONB,

    CONSTRAINT "GeckoCoinID_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPortfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GeckoCoinIDToUserPortfolio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPortfolio_userId_key" ON "UserPortfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_GeckoCoinIDToUserPortfolio_AB_unique" ON "_GeckoCoinIDToUserPortfolio"("A", "B");

-- CreateIndex
CREATE INDEX "_GeckoCoinIDToUserPortfolio_B_index" ON "_GeckoCoinIDToUserPortfolio"("B");

-- AddForeignKey
ALTER TABLE "UserPortfolio" ADD CONSTRAINT "UserPortfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GeckoCoinIDToUserPortfolio" ADD CONSTRAINT "_GeckoCoinIDToUserPortfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "GeckoCoinID"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GeckoCoinIDToUserPortfolio" ADD CONSTRAINT "_GeckoCoinIDToUserPortfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
