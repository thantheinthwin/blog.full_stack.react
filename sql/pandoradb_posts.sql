-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: pandoradb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` longtext NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'React','ReactJS, commonly known as React, is an open-source JavaScript library for building user interfaces. Developed by Facebook, it enables developers to create reusable UI components and manage dynamic views efficiently. React\'s virtual DOM and component-based architecture enhance performance and facilitate the development of responsive and interactive web applications.',7),(2,'Express Js','Express.js is a minimal and flexible Node.js web application framework for building robust and scalable web applications and APIs.',8),(3,'Node Js','Node.js is an open-source runtime environment that allows server-side execution of JavaScript. It\'s built on the V8 JavaScript engine and enables developers to create scalable and efficient network applications. With a non-blocking, event-driven architecture, Node.js is widely used for building real-time web applications, APIs, and microservices.Node.js is an open-source runtime environment that allows executing JavaScript code on the server side, ideal for building scalable network applications.',1),(4,'MySQL','MySQL is an open-source relational database management system. It\'s widely used for storing and managing structured data in various applications. Offering speed, reliability, and scalability, MySQL supports SQL for querying and modifying data. It\'s used in web applications, content management systems, and other software requiring structured data storage and retrieval.',1),(5,'Monkey King','Monkey King, also known as Sun Wukong, is a legendary figure from Chinese literature. He appears in the classic novel \"Journey to the West,\" attributed to Wu Cheng\'en. With immense strength, magical powers, and mischievous nature, he accompanies a Buddhist monk on a journey, showcasing heroism, wit, and transformational growth.',1),(7,'PHP','PHP is a widely-used server-side scripting language designed for web development. It\'s embedded within HTML code and enables dynamic content creation. PHP supports databases, file handling, and session management. Its simplicity and versatility make it popular for building dynamic websites, web applications, and backend services.',1),(10,'Visual Studio Code','Visual Studio Code (VS Code) is a lightweight, free source code editor developed by Microsoft. It supports various programming languages, offers powerful code editing features, integrates with version control systems, and provides an extensive extension ecosystem, making it a popular choice for developers to enhance their coding productivity.',1),(15,'ChatGPT','ChatGPT is an AI language model developed by OpenAI. Powered by the GPT-3.5 architecture, it can understand and generate human-like text based on the input it receives. It\'s used for a wide range of applications, including answering questions, generating text, providing explanations, and assisting in various natural language processing tasks.',6),(16,'SpaceX','SpaceX is an American aerospace company founded by Elon Musk. It\'s known for revolutionizing space travel with innovations like reusable rockets and the Falcon series launch vehicles. SpaceX achieved milestones like launching the Falcon Heavy and Crew Dragon spacecraft, aiming to make space exploration more affordable and enabling human colonization of Mars.',6),(17,'Apple','Apple is a multinational technology company founded by Steve Jobs. It\'s renowned for its consumer electronics, software, and services. Notable products include the iPhone, iPad, Mac computers, and Apple Watch. The company\'s ecosystem encompasses the App Store, iCloud, and services like Apple Music. Apple is recognized for design and innovation in technology.',6),(18,'Meta','Meta Platforms, Inc. (formerly Facebook, Inc.) is a tech conglomerate focusing on social media and technology services. Founded by Mark Zuckerberg, it owns platforms like Facebook, Instagram, WhatsApp, and Oculus VR. It aims to connect people globally, innovate in augmented reality and virtual reality, and advance the metaverse concept.',7),(19,'Google','Google is a multinational technology company known for its internet-related services and products. Founded by Larry Page and Sergey Brin, it dominates web search with Google Search and offers services like Gmail, Google Maps, and YouTube. Its Android OS powers most smartphones. Google\'s innovations span AI, cloud computing, and hardware.',7),(20,'NASA','NASA (National Aeronautics and Space Administration) is the United States government agency responsible for space exploration, scientific research, and aeronautics research. Founded in 1958, it conducts missions such as the Apollo moon landings, Mars rovers, and the International Space Station. NASA advances space technology and understanding of the universe.',1),(21,'Boston Dynamics','Boston Dynamics is an American engineering company known for creating advanced robotics and humanoid robots. Founded in 1992, it developed robots like Spot, Atlas, and BigDog, showcasing remarkable mobility and agility. Acquired by SoftBank and later by Hyundai, it aims to revolutionize industries with cutting-edge robotic technology.',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-24  6:10:29
