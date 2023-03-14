-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2023 at 11:19 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `allday_wipes`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `uty_price` varchar(100) NOT NULL,
  `stock_in` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `stock_out` varchar(100) NOT NULL,
  `stock_available` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `uty_price`, `stock_in`, `image`, `stock_out`, `stock_available`) VALUES
(20, 'sanitizer-spray', '1000', '80', 'sanitizer-spray.png.png', '30', '50'),
(21, 'Baby wipes', '1000', '19', 'facial-wet-wipes.png.png', '16', '3'),
(23, 'sanitizers', '2000', '40', 'babay-wipes.png.png', '0', '40'),
(26, 'Anti-Bacterial-wipes', '1000', '10', 'Anti-Bacterial-wipes.png.png', '10', '0');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `stockAvailable` varchar(100) NOT NULL,
  `vendor` varchar(200) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `invoice_no` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `qty` varchar(30) NOT NULL,
  `unity_price` varchar(100) NOT NULL,
  `amount_paid` varchar(100) NOT NULL,
  `balance` varchar(100) NOT NULL,
  `total_amount` varchar(100) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `delivery_date` varchar(100) NOT NULL,
  `order_status` varchar(100) NOT NULL DEFAULT 'Pending',
  `order_date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `stockAvailable`, `vendor`, `product_name`, `invoice_no`, `status`, `qty`, `unity_price`, `amount_paid`, `balance`, `total_amount`, `comment`, `delivery_date`, `order_status`, `order_date`) VALUES
(15, '', 'friday', 'sanitizer-spray', '1234', '1', '20', '1000', '1000', '19000', '20000', '             JHGJGHFHG                       ', '2022-12-30 12:28:59', 'Pending', '2022-12-29 00:00:00'),
(16, '', 'hajo', 'Baby wipes', 'g2-112', '1', '9', '1000', '990', '11010', '9000', '                                                                            edited                  ', '2022-12-30 12:52:43', 'Pending', '2022-12-30 00:00:00'),
(17, '', 'friday', 'Dry wipes', '1234', '1', '12', '1000', '1000', '11000', '12000', '                                            ghfgf                              \r\n                   ', '2022-12-30 13:52:28', 'Pending', '2022-12-30 00:00:00'),
(18, '', 'friday', 'Dry wipes', 'g2-112', '2', '12', '1000', '1650', '10350', '12000', ' fhgfgfg                                   ', '2022-12-30 14:08:48', 'Pending', '2022-12-31 00:00:00'),
(19, '', 'friday', 'sanitizers', '1234', '2', '6', '2000', '1000', '11000', '12000', '       fhggdff                             ', '2022-12-30 14:20:44', 'Pending', '2022-12-30 00:00:00'),
(20, '', 'friday', 'Dry wipes', '1234', '2', '20', '1000', '1000', '19000', '20000', '     gfgfg                               ', '2022-12-30 14:27:24', 'Pending', '2022-12-30 00:00:00'),
(21, '', 'hajo', 'sanitizer-spray', '1234', '2', '12', '1000', '1000', '11000', '12000', '  fdgfdgfdghgh                                  ', '2022-12-30 14:29:04', 'Pending', '2022-12-30 00:00:00'),
(22, '', 'friday', 'Dry wipes', '1234', '1', '1', '1000', '1000', '', '1000', '           saaa                         ', '2022-12-31 12:53:16', 'Pending', '2022-12-31 00:00:00'),
(23, '', 'hajo', 'sanitizers', '1234', '1', '23', '2000', '1000', '19000', '46000', '                                       gfhff                                   \r\n                   ', '2022-12-31 13:03:21', 'Pending', '2022-12-30 00:00:00'),
(24, '', 'friday', 'sanitizer-spray', '1234', '1', '8', '1000', '1650', '6350', '8000', '            huujhgj                        ', '2022-12-31 13:06:04', 'Pending', '2022-12-30 00:00:00'),
(25, '', 'friday', 'sanitizer-spray', '1234', '1', '5', '1000', '1000', '4000', '5000', 'hujjhgjhgh                                    \r\n                                    ', '2022-12-31 13:12:34', 'Delivered', '2022-12-30 00:00:00'),
(26, '', 'friday', 'Baby wipes', '1234', '1', '10', '1000', '1000', '9000', '10000', '                                       hgfgdf                                   \r\n                  ', '2023-02-03 22:49:05.340000', 'Delivered', '2022-12-31 00:00:00'),
(27, '', 'friday', 'Baby wipes', '1234', '1', '2', '1000', '1000', '1000', '2000', '                                           dfdsds                               \r\n                  ', '2023-02-03 22:44:12.268000', 'Delivered', '2022-12-31 00:00:00'),
(28, '', 'hajo', 'Dry wipes', '43434', '1', '22', '1000', '2400', '17600', '22000', '                                                                                                    ', '2023-02-03 22:43:46.900000', 'Delivered', '2023-01-26 00:00:00'),
(29, '', 'hajo', 'sanitizer-spray', '12', '1', '1', '1000', '200', '800', '1000', '                                      testing app                              \r\n                   ', '2023-01-28 15:09:51', 'Delivered', '2023-01-24 00:00:00'),
(30, '', 'hajo', 'sanitizer-spray', '12', '1', '1', '1000', '200', '800', '1000', '                                                                                                    ', '2023-01-28 15:15:28', 'Delivered', '2023-01-28 00:00:00'),
(31, '', 'friday', 'sanitizer-spray', '12', '1', '10', '1000', '100', '900', '10000', '                         edited                                \r\n                                   ', '2023-01-28 15:54:28', 'Delivered', '2023-01-30 00:00:00'),
(32, '', 'friday', 'sanitizers', '43434', '3', '2', '2000', '200', '3800', '4000', '                                                                            test                    ', '2023-01-30 04:22:55', 'Delivered', '2023-01-30 00:00:00'),
(33, '4', 'friday', 'Dry wipes', '1234', '1', '3', '1000', '1000', '2000', '3000', '                                      dsdfd                                    \r\n                   ', '2023-02-03 20:20:36', 'Delivered', '2023-02-03 20:20:36'),
(34, '8', 'hajo', 'Baby wipes', 'g2-112', '1', '5', '1000', '1650', '3350', '5000', '                                              stset                            \r\n                   ', '2023-02-03 20:43:24', 'Delivered', '2023-02-03 20:43:24'),
(35, '61', 'friday', 'sanitizer-spray', 'g2-112', '1', '10', '1000', '990', '9010', '10000', 'ghhgfghfhg                                    \r\n              \r\n                                    ', '2023-02-03 22:55:08.856000', 'Delivered', '2023-02-03 21:25:42.762000'),
(36, '51', 'friday', 'sanitizer-spray', '1234', '1', '1', '1000', '99', '901', '1000', 'fsdfsfsdfs                                 \r\n              \r\n                                    ', '2023-02-04 12:05:52.068000', 'Delivered', '2023-02-04 11:59:15.722000'),
(37, '10', 'friday', 'Anti-Bacterial-wipes', 'g2-112', '1', '10', '1000', '1650', '8350', '10000', ' fhfhgfhg                                   ', 'Pending', 'Pending', '2023-02-05 07:10:53.652000'),
(38, '10', 'hajo', 'Anti-Bacterial-wipes', '1234', '1', '10', '1000', '990', '9010', '10000', ' hfhh                                   ', 'Pending', 'Pending', '2023-02-05 07:21:31.312000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fullname` varchar(225) NOT NULL,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `fullname`, `password`, `username`, `status`, `created_at`, `phone`, `image`) VALUES
(36, 'fridayonojah360@gmail.com', 'friday Onojah', '$2a$10$M5CHVVnldwOoNc9PT/KL4u7S06n.jpGu6pXkE7azkVmtGCTlnbHVu', 'software developer', '1', '2023-01-06 20:36:39', '0901801963', 'testimonial-1.jpg.jpeg'),
(37, 'root@email.com', 'friday onojah', '$2a$10$LOd/z5wZhXNVN.0fBCCMcuWd1Otw2XZuoUpif6GmH5ifYVQ5iCbPG', 'developer123', '2', '2023-01-06 18:40:48', '09018019637', 'testimonial-3.jpg.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `vendor_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL DEFAULT current_timestamp(),
  `address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `vendor_name`, `email`, `phone`, `status`, `date`, `address`, `city`, `state`) VALUES
(1, 'friday', 'forscaling@gmail.com', '09018019637', '1', '2022-12-14', 'no:22 audu', 'jabi', 'abuja'),
(2, 'hajo', 'admin@gmail.com', '09018019637', '1', '2022-12-20', 'no:22 audu', 'jabi', 'abuja'),
(3, 'shoprite', 'fridayonojah360@gmail.com', '09018019637', '3', '2023-02-05 15:10:39.375000', 'no:22 audu', 'jabi', 'abuja');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
