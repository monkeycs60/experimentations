-- CreateTable
CREATE TABLE "CryptoDataGecko" (
    "id" TEXT NOT NULL,
    "cryptoId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "CryptoDataGecko_pkey" PRIMARY KEY ("id")
);
