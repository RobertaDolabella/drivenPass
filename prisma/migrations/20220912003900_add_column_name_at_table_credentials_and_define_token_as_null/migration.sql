/*
  Warnings:

  - Added the required column `name` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_token_key";

-- AlterTable
ALTER TABLE "Credentials" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "token" DROP NOT NULL;
