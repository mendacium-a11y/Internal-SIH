/*
  Warnings:

  - You are about to drop the `quickService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quickService` to the `legalServiceProviders` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "quickService";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_legalServiceProviders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" REAL NOT NULL,
    "quickService" BOOLEAN NOT NULL,
    "barAssociation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_legalServiceProviders" ("barAssociation", "createdAt", "emailId", "id", "location", "name", "password", "yearsOfExperience") SELECT "barAssociation", "createdAt", "emailId", "id", "location", "name", "password", "yearsOfExperience" FROM "legalServiceProviders";
DROP TABLE "legalServiceProviders";
ALTER TABLE "new_legalServiceProviders" RENAME TO "legalServiceProviders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
