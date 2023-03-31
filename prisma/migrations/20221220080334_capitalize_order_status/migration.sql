/*
  Warnings:

  - You are about to alter the column `status` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('INPROCESS', 'SHIPPED', 'CANCELLED') NOT NULL DEFAULT 'INPROCESS';
