-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `content` TEXT NULL,
    `rating` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `comments_productId_idx`(`productId`),
    INDEX `comments_userId_idx`(`userId`),
    UNIQUE INDEX `comments_userId_productId_key`(`userId`, `productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `buyPrice` DECIMAL(10, 2) NOT NULL,
    `productLine` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    INDEX `products_productLine_idx`(`productLine`),
    FULLTEXT INDEX `products_name_idx`(`name`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_in_stock` (
    `id` VARCHAR(191) NOT NULL,
    `productDetailId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `size` ENUM('S', 'M', 'L', 'XL', 'XXl') NOT NULL,

    UNIQUE INDEX `product_in_stock_productDetailId_size_key`(`productDetailId`, `size`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_details` (
    `id` VARCHAR(191) NOT NULL,
    `image` TEXT NOT NULL,
    `productCode` VARCHAR(191) NOT NULL,
    `colorCode` CHAR(6) NOT NULL,

    UNIQUE INDEX `product_details_productCode_colorCode_key`(`productCode`, `colorCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productlines` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `textDescription` TEXT NULL,
    `htmlDescription` TEXT NULL,

    UNIQUE INDEX `productlines_type_gender_key`(`type`, `gender`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderNumber` VARCHAR(191) NOT NULL,
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `shippedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `addressId` VARCHAR(191) NOT NULL,
    `status` ENUM('InProcess', 'Shipped', 'Cancelled') NOT NULL DEFAULT 'InProcess',
    `comments` TEXT NULL,
    `customerNumber` VARCHAR(191) NOT NULL,

    INDEX `orders_customerNumber_idx`(`customerNumber`),
    INDEX `orders_addressId_idx`(`addressId`),
    PRIMARY KEY (`orderNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderdetails` (
    `orderNumber` VARCHAR(191) NOT NULL,
    `productDetailId` VARCHAR(191) NOT NULL,
    `quantityInOrdered` INTEGER NOT NULL,
    `priceEach` DECIMAL(10, 2) NOT NULL,
    `size` ENUM('S', 'M', 'L', 'XL', 'XXl') NOT NULL,
    `orderLineNumber` SMALLINT NULL,

    INDEX `orderdetails_orderNumber_idx`(`orderNumber`),
    INDEX `orderdetails_productDetailId_idx`(`productDetailId`),
    PRIMARY KEY (`orderNumber`, `productDetailId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_item` (
    `id` VARCHAR(191) NOT NULL,
    `productDetailId` VARCHAR(191) NOT NULL,
    `cartId` VARCHAR(191) NOT NULL,
    `numberOfItems` INTEGER NOT NULL DEFAULT 1,
    `size` ENUM('S', 'M', 'L', 'XL', 'XXl') NOT NULL,

    INDEX `cart_item_productDetailId_idx`(`productDetailId`),
    INDEX `cart_item_cartId_idx`(`cartId`),
    UNIQUE INDEX `cart_item_productDetailId_cartId_size_key`(`productDetailId`, `cartId`, `size`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `phone` VARCHAR(50) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `receiver` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `district` VARCHAR(50) NOT NULL,
    `ward` VARCHAR(50) NOT NULL,
    `detail` TEXT NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,

    INDEX `addresses_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
