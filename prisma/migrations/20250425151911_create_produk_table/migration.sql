-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaProduk` VARCHAR(255) NOT NULL,
    `kategori` VARCHAR(255) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `foto` VARCHAR(255) NULL,
    `video` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
