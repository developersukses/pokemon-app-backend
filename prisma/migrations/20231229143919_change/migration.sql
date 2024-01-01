/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pokemon_nickname_key` ON `pokemon`(`nickname`);
