-- CreateTable
CREATE TABLE `Chats` (
    `id` VARCHAR(191) NOT NULL,
    `contact_1` VARCHAR(191) NOT NULL,
    `contact_2` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat_Message` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `chat_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chats` ADD CONSTRAINT `Chats_contact_1_fkey` FOREIGN KEY (`contact_1`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chats` ADD CONSTRAINT `Chats_contact_2_fkey` FOREIGN KEY (`contact_2`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat_Message` ADD CONSTRAINT `Chat_Message_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `Chats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
