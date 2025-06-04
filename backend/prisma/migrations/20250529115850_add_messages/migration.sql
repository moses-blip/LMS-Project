-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `courseId` INTEGER NULL,

    INDEX `Message_senderId_idx`(`senderId`),
    INDEX `Message_receiverId_idx`(`receiverId`),
    INDEX `Message_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `ActivityLog_studentId_idx` ON `ActivityLog`(`studentId`);
DROP INDEX `ActivityLog_studentId_fkey` ON `activitylog`;

-- RedefineIndex
CREATE INDEX `Assignment_courseId_idx` ON `Assignment`(`courseId`);
DROP INDEX `Assignment_courseId_fkey` ON `assignment`;

-- RedefineIndex
CREATE INDEX `Attendance_lectureId_idx` ON `Attendance`(`lectureId`);
DROP INDEX `Attendance_lectureId_fkey` ON `attendance`;

-- RedefineIndex
CREATE INDEX `Attendance_studentId_idx` ON `Attendance`(`studentId`);
DROP INDEX `Attendance_studentId_fkey` ON `attendance`;

-- RedefineIndex
CREATE INDEX `Course_lecturerId_idx` ON `Course`(`lecturerId`);
DROP INDEX `Course_lecturerId_fkey` ON `course`;

-- RedefineIndex
CREATE INDEX `Enrollment_courseId_idx` ON `Enrollment`(`courseId`);
DROP INDEX `Enrollment_courseId_fkey` ON `enrollment`;

-- RedefineIndex
CREATE INDEX `Enrollment_studentId_idx` ON `Enrollment`(`studentId`);
DROP INDEX `Enrollment_studentId_fkey` ON `enrollment`;

-- RedefineIndex
CREATE INDEX `Lecture_courseId_idx` ON `Lecture`(`courseId`);
DROP INDEX `Lecture_courseId_fkey` ON `lecture`;

-- RedefineIndex
CREATE INDEX `Submission_assignmentId_idx` ON `Submission`(`assignmentId`);
DROP INDEX `Submission_assignmentId_fkey` ON `submission`;

-- RedefineIndex
CREATE INDEX `Submission_studentId_idx` ON `Submission`(`studentId`);
DROP INDEX `Submission_studentId_fkey` ON `submission`;
