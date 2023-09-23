-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "age" REAL NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'english',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_user" ("age", "createdAt", "emailId", "id", "name", "occupation", "password") SELECT "age", "createdAt", "emailId", "id", "name", "occupation", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_emailId_key" ON "user"("emailId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
