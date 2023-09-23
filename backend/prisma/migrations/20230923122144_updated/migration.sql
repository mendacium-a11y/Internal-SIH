/*
  Warnings:

  - Added the required column `emailId` to the `legalServiceProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `legalServiceProviders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_legalServiceProviders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "yearsOfExperience" REAL NOT NULL,
    "barAssociation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_legalServiceProviders" ("barAssociation", "createdAt", "id", "location", "name", "yearsOfExperience") SELECT "barAssociation", "createdAt", "id", "location", "name", "yearsOfExperience" FROM "legalServiceProviders";
DROP TABLE "legalServiceProviders";
ALTER TABLE "new_legalServiceProviders" RENAME TO "legalServiceProviders";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "age" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("age", "createdAt", "id", "name", "occupation") SELECT "age", "createdAt", "id", "name", "occupation" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
