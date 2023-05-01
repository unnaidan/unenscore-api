-- CreateTable
CREATE TABLE `organizations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `email` VARCHAR(191) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `organization_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrowers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `national_id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `a1` VARCHAR(191) NOT NULL,
    `a2` VARCHAR(191) NOT NULL,
    `a3` VARCHAR(191) NOT NULL,
    `a4` INTEGER UNSIGNED NOT NULL,
    `a5` INTEGER UNSIGNED NOT NULL,
    `a6` BOOLEAN NOT NULL DEFAULT false,
    `b1` BOOLEAN NOT NULL DEFAULT false,
    `b2` INTEGER UNSIGNED NOT NULL,
    `b3` INTEGER UNSIGNED NOT NULL,
    `b4` INTEGER UNSIGNED NOT NULL,
    `b5` INTEGER UNSIGNED NOT NULL,
    `b6` VARCHAR(191) NOT NULL,
    `c1` INTEGER UNSIGNED NOT NULL,
    `c2` INTEGER UNSIGNED NOT NULL,
    `c3` VARCHAR(191) NOT NULL,
    `c4` VARCHAR(191) NOT NULL,
    `d1` VARCHAR(191) NOT NULL,
    `d2` VARCHAR(191) NOT NULL,
    `d3` VARCHAR(191) NOT NULL,
    `d4` BOOLEAN NOT NULL DEFAULT false,
    `e1` INTEGER UNSIGNED NOT NULL,
    `e2` INTEGER UNSIGNED NOT NULL,
    `e3` INTEGER UNSIGNED NOT NULL,
    `e4` INTEGER UNSIGNED NOT NULL,
    `f1` INTEGER UNSIGNED NOT NULL,
    `f2` INTEGER UNSIGNED NOT NULL,
    `f3` INTEGER UNSIGNED NOT NULL,
    `f4` INTEGER UNSIGNED NOT NULL,
    `f5` INTEGER UNSIGNED NOT NULL,
    `g1` BOOLEAN NOT NULL DEFAULT false,
    `g2` INTEGER UNSIGNED NOT NULL,
    `g3` VARCHAR(191) NOT NULL,
    `g4` VARCHAR(191) NOT NULL,
    `organization_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applications` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER UNSIGNED NOT NULL,
    `term` INTEGER UNSIGNED NOT NULL,
    `interest_rate` DOUBLE NOT NULL,
    `borrower_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scores` (
    `id` VARCHAR(191) NOT NULL,
    `a1` VARCHAR(191) NOT NULL,
    `a2` INTEGER UNSIGNED NOT NULL,
    `a3` DOUBLE NOT NULL,
    `a4` INTEGER UNSIGNED NOT NULL,
    `a5` INTEGER UNSIGNED NOT NULL,
    `a6` DOUBLE NOT NULL,
    `a7` DOUBLE NOT NULL,
    `a8` DOUBLE NOT NULL,
    `a9` DOUBLE NOT NULL,
    `a10` VARCHAR(191) NOT NULL,
    `application_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `scores_application_id_key`(`application_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrowers` ADD CONSTRAINT `borrowers_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_borrower_id_fkey` FOREIGN KEY (`borrower_id`) REFERENCES `borrowers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scores` ADD CONSTRAINT `scores_application_id_fkey` FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
