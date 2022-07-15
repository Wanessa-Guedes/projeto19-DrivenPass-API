/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,title]` on the table `credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,title]` on the table `securyNotes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- AlterTable
ALTER TABLE "securyNotes" ALTER COLUMN "annotation" SET DATA TYPE VARCHAR(1000);

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "is_on" BOOLEAN NOT NULL DEFAULT true,
    "creat_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cards_user_id_title_key" ON "cards"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "credentials_user_id_title_key" ON "credentials"("user_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "securyNotes_user_id_title_key" ON "securyNotes"("user_id", "title");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
