/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Materi` table. All the data in the column will be lost.
  - You are about to drop the column `namaGambar` on the `Materi` table. All the data in the column will be lost.
  - Added the required column `gambar` to the `Materi` table without a default value. This is not possible if the table is not empty.
  - Made the column `linkVideo` on table `Materi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `namaModul` on table `Materi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `namaPpt` on table `Materi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `namaTugas` on table `Materi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Materi` DROP COLUMN `createdAt`,
    DROP COLUMN `namaGambar`,
    ADD COLUMN `gambar` VARCHAR(191) NOT NULL,
    MODIFY `linkVideo` VARCHAR(191) NOT NULL,
    MODIFY `namaModul` VARCHAR(191) NOT NULL,
    MODIFY `namaPpt` VARCHAR(191) NOT NULL,
    MODIFY `namaTugas` VARCHAR(191) NOT NULL;
