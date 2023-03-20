-- phpMyAdmin SQL Dump
-- version 5.2.0-1.fc36
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 15, 2023 at 08:22 AM
-- Server version: 8.0.31
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shamba`
--

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `country`, `city`, `street`) VALUES
(1, 'Kenya', 'Mombasa', 'Changamwe'),
(2, 'Kenya', 'Nairobi', 'CBD'),
(3, 'Kenya', 'Kwale', 'Lungalunga'),
(4, 'Kenya', 'Kilifi', 'Mtwapa');

-- --------------------------------------------------------

--
-- Table structure for table `title_deed`
--

CREATE TABLE `title_deed` (
  `title_deed_id` int NOT NULL,
  `owner` varchar(50) NOT NULL,
  `added_by` varchar(20) NOT NULL,
  `id` varchar(20) NOT NULL,
  `land_num` varchar(50) NOT NULL,
  `date_of_issue` varchar(50) NOT NULL,
  `title_num` varchar(50) NOT NULL,
  `map_num` varchar(50) NOT NULL,
  `land_size` varchar(200) NOT NULL,
  `is_verified` tinyint(1) DEFAULT '0',
  `tax_assessment_value` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `legal_doc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `title_deed`
--

INSERT INTO `title_deed` (`title_deed_id`, `owner`, `added_by`, `id`, `land_num`, `date_of_issue`, `title_num`, `map_num`, `land_size`, `is_verified`, `tax_assessment_value`, `legal_doc`, `location_id`) VALUES
(2, 'bakari', '1', '2323', '34432', '2023-03-10', '52353', 'D4-34', '45x45', 0, NULL, 'C:fakepath\ntic.pdf', '4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role_id` int DEFAULT '3',
  `user_id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_num` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `role_id`, `user_id`, `first_name`, `last_name`, `phone_num`, `location_id`) VALUES
('Mtua', 'mtua@gmail.com', '$2a$10$13F4wustKPBLHyOpfHFB0.ZmYrx12LpV5EJhRuVjVisfXPL6k8zNe', 3, 1, '', '', '', ''),
('Mtua1', 'mtua1@gmail.com', '$2a$10$ga4RUC2Jf2pHpvNWGITTvuWuC4TmM9JPecE20aaqSYJjnmyMYOBAq', 3, 2, '', '', '', ''),
('Kilu', 'kilu@gmail.com', '$2a$10$ACF4mew9OJFWI4503VbI3us.DHwBhxll3r1hnvGPMYoy0Q.wuIpF6', 1, 3, '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `role_id` int NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`role_id`, `role`) VALUES
(1, 'admin'),
(2, 'staff'),
(3, 'client');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `title_deed`
--
ALTER TABLE `title_deed`
  ADD PRIMARY KEY (`title_deed_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `title_deed`
--
ALTER TABLE `title_deed`
  MODIFY `title_deed_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
