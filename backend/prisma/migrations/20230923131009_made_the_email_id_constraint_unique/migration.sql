/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `legalServiceProviders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "legalServiceProviders_emailId_key" ON "legalServiceProviders"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "user_emailId_key" ON "user"("emailId");
