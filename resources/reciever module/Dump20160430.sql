CREATE DATABASE  IF NOT EXISTS `tj_dbase` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tj_dbase`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: tj_dbase
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `idproducts` varchar(45) NOT NULL,
  `catproducts` varchar(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `descproducts` varchar(45) NOT NULL,
  `dateproduct` varchar(45) DEFAULT NULL,
  `validUntil` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `productsImg` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idproducts`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('gad0','gadget',10,'Camera','01/25/13',NULL,'onSale','./images/gadgetscamera.jpg'),('gad1','gadget',5,'Cellphone','05/29/15','06/05/15','pending','./images/gadgetsphone.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contactNum` varchar(45) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `lastUsed` varchar(45) DEFAULT NULL,
  `accountCreated` varchar(45) DEFAULT NULL,
  `customerPoints` int(11) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='userid = the id of the user\nfname = first name of the user\nlname= last name of the user\nemail = email of the user\ncontactNum = contact number of user\nstatus = status of the user(either admin or customer)\nlastUsed = date the customer last log in\naccountCreated = date the account of the user was created\ncustomerPoints = loyalty points given to the customerto identify their reliability in their posts';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'Rufus','Easy','easy@yahoo.com','0986574547','customer','05/17/13','09/19/14',50),(1,'April ','May','april@gmail.com','0989855656','customer','04/29/16','04/09/12',300),(2,'Renz','Casipit','renz@gmail.com','0986558524','customer','04/28/16','03/27/10',600),(3,'Michael','Uy','uy@yahoo.com','0986575854','customer','07/13/16','02/09/10',970),(4,'Harley','Quinn','quinn@yahoo.com','09865742541','banned','08/27/15','05/29/14',0),(2141127,'Rouniel','Cobangbang','2141127@slu.edu.ph','09128661773','admin','04/16/16','01/01/10',0),(2141651,'Vladimir','Malapit','2141651@slu.edu.ph','09478564585','admin','02/17/14','05/23/09',0),(2145839,'Joseph','Bartolome','2145839@slu.edu.ph','09095688808','admin','08/29/10','12/24/15',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-30 14:25:30
