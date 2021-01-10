
--
-- Database: `filesystem`
--
CREATE DATABASE IF NOT EXISTS `filesystem` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `filesystem`;

-- --------------------------------------------------------

--
-- Table structure for table `filesystem`
--

CREATE TABLE `filesystem` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `is_root` tinyint(1) DEFAULT '0',
  `parent` int DEFAULT NULL,
  `added_by` int DEFAULT NULL,
  `deleted_by` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `filesystem`
--

INSERT INTO `filesystem` (`id`, `name`, `type`, `is_root`, `parent`, `added_by`, `deleted_by`, `is_deleted`, `created_at`) VALUES
(3, 'root', 2, 1, NULL, 1, NULL, 0, '2021-01-10 05:51:53'),
(4, 'folder 1', 2, 0, 3, 2, NULL, 0, '2021-01-10 05:51:53'),
(5, 'folder 2', 2, 0, 3, 2, NULL, 0, '2021-01-10 05:51:53'),
(6, 'folder 3', 2, 0, 3, 2, NULL, 0, '2021-01-10 05:51:53'),
(7, 'file 1', 1, 0, 5, 2, NULL, 0, '2021-01-10 05:51:53'),
(8, 'file 2', 1, 0, 4, 2, 2, 1, '2021-01-10 05:51:53');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `is_root_user` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `is_root_user`) VALUES
(1, 'root user', 'root@filesystem.com', '$2b$10$gCdwHkWyMA834Mp.8XrEN./3vcU/Ar4M12cBPZaZ9d4mpwcPeOs4e', 1),
(2, 'John doe', 'johndoe@filesystem.com', '$2b$10$atx1bNIkonOqPRELo6T.nOKBPH.vshkCMWMsd3rPtZb2JRpCD98f2', 0),
(4, 'Chandler Bing', 'bing@filesystem.com', '$2b$10$PK14xJUwCPMIAc7aWOptw.yybs6LJKhmbrQmK4rQRbGJ9njFviFYW', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `filesystem`
--
ALTER TABLE `filesystem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent` (`parent`),
  ADD KEY `added_by` (`added_by`),
  ADD KEY `deleted_by` (`deleted_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filesystem`
--
ALTER TABLE `filesystem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `filesystem`
--
ALTER TABLE `filesystem`
  ADD CONSTRAINT `filesystem_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `filesystem` (`id`),
  ADD CONSTRAINT `filesystem_ibfk_2` FOREIGN KEY (`added_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `filesystem_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
