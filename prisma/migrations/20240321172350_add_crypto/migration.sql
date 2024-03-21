-- CreateTable
CREATE TABLE "cryptocurrencies" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cmc_rank" INTEGER NOT NULL,
    "num_market_pairs" INTEGER NOT NULL,
    "circulating_supply" DOUBLE PRECISION NOT NULL,
    "total_supply" DOUBLE PRECISION NOT NULL,
    "max_supply" DOUBLE PRECISION,
    "infinite_supply" BOOLEAN NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "platform" TEXT,
    "self_reported_circulating_supply" DOUBLE PRECISION,
    "self_reported_market_cap" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "volume_24h" DOUBLE PRECISION NOT NULL,
    "volume_change_24h" DOUBLE PRECISION NOT NULL,
    "percent_change_1h" DOUBLE PRECISION NOT NULL,
    "percent_change_24h" DOUBLE PRECISION NOT NULL,
    "percent_change_7d" DOUBLE PRECISION NOT NULL,
    "market_cap" DOUBLE PRECISION NOT NULL,
    "market_cap_dominance" DOUBLE PRECISION NOT NULL,
    "fully_diluted_market_cap" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cryptocurrencies_pkey" PRIMARY KEY ("id")
);
