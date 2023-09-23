-- CreateTable
CREATE TABLE "legalServiceProviders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" REAL NOT NULL,
    "barAssociation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "age" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stars" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "legalServiceProviderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "reviews_legalServiceProviderId_fkey" FOREIGN KEY ("legalServiceProviderId") REFERENCES "legalServiceProviders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quickService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" REAL NOT NULL,
    "barAssociation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "legalServiceProviderId" TEXT NOT NULL,
    CONSTRAINT "quickService_legalServiceProviderId_fkey" FOREIGN KEY ("legalServiceProviderId") REFERENCES "legalServiceProviders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LegalServiceProviderAreas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LegalServiceProviderAreas_A_fkey" FOREIGN KEY ("A") REFERENCES "Area" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LegalServiceProviderAreas_B_fkey" FOREIGN KEY ("B") REFERENCES "legalServiceProviders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_LegalServiceProviderAreas_AB_unique" ON "_LegalServiceProviderAreas"("A", "B");

-- CreateIndex
CREATE INDEX "_LegalServiceProviderAreas_B_index" ON "_LegalServiceProviderAreas"("B");
