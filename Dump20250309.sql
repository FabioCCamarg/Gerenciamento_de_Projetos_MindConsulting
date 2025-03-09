-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: gerenciamento_projetos
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `projetos`
--

DROP TABLE IF EXISTS `projetos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projetos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `projetos_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projetos`
--

LOCK TABLES `projetos` WRITE;
/*!40000 ALTER TABLE `projetos` DISABLE KEYS */;
INSERT INTO `projetos` VALUES (9,'as','sa',35),(10,'aaaaa','sssss',27),(11,'rea','rea',35),(12,'fa','fa',34),(13,'a','a',33);
/*!40000 ALTER TABLE `projetos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarefas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descricao` text,
  `status` enum('pendente','em_andamento','concluida') DEFAULT 'pendente',
  `projetoId` int DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projetoId` (`projetoId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `tarefas_ibfk_1` FOREIGN KEY (`projetoId`) REFERENCES `projetos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tarefas_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefas`
--

LOCK TABLES `tarefas` WRITE;
/*!40000 ALTER TABLE `tarefas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarefas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'João Silva','joao@example.com','123456'),(2,'Maria Joana','maria@example.com','$2b$10$ii12damm22KxsIcQ9GlIpOv7IrW59YWjxWe9.sdeIzCzxWABEWH2q'),(4,'Marina Zueira','zuerira@example.com','$2b$10$QL1BKe0AxkoCoGhD57CjMuVvKfrfiWwNOr0UJeevrbgCn.4IAkf6e'),(6,'mariana','ma@example.com','$2b$10$Md1iR8GTQKXkoay7vAzaYua4oVV2bE7Br2ncnerbXamzoqVsxF5sK'),(7,'seuemail','seuemail@example.com','$2b$10$lQ5/HAEI.IEUf8iQTkZKKuGRkmQ57KVEF2wpue1sJTEHzYgdfVB9.'),(8,'magda','magda@example.com','$2b$10$eYEt/9lxX96Uy386wyIEjOonnDkuKtSzIZeW612j8F6/zAHer2cTS'),(9,'Teste','teste@email.com','$2b$10$nFZVK5Plywibltb6ELiRKebVz64177Oh/iA0Dy97W1XuZBSv6sZlu'),(11,'Legal','legal@email.com','$2b$10$zdigk8e7VxDnfIVcG5nZcOV.Prg2ZnRSwT7vmxygMZJB5AehAc64u'),(13,'marina','marina@email.com','$2b$10$J8ey8wmrj4OFDIALZVWmYeX.WR5pHPXNNDUX/H/w.6/.4cKAvZVRC'),(14,'hailton','hailton@gmail.com','$2b$10$i5x1YOZD9CEy4n/UcxCeR.vvIj1gkR7Vkuk0ls/C7xf1FQnc8m.Ya'),(15,'fabio','fabio@gmail.com','$2b$10$wLkgfb7ogdJVAAU2oxTk3OVhfUDgnMYrfEnh/tw8SSbRy9ReUQXv6'),(16,'j','j@gmail.com','$2b$10$5KctziEn5dARNN8WL946xuP9..ezPJygccEQ13Cgy614rqYetdIIO'),(17,'Fulano','f@gmail.com','$2b$10$DJiyeFCwwdtjPP/jw0RRte/CPVWsXQhy5HnwVH61nHTAUFjzDWPum'),(18,'s','s@gmail.com','$2b$10$9JZ47tUx18aIJVe6VKR0M.7UUtNsXvwgUhlHHQ6XXIhfqUnOxh7Aq'),(19,'Carlos','carlos@gmail.com','$2b$10$qt4SaBOpbHSBQyLjuKl/Be.Jkg5Z0EBmr0xnS6p0UD8.Qj5SjwBa6'),(20,'galvao','galvao@gmail.com','$2b$10$NSgELNXJbYvhQQCCzwrIYObW.47lLlNlBDCt8y.MZDKzOwg0VhUom'),(21,'galileu','galileu@gmail.com','$2b$10$X101qbH3axRey1iwBhrZJOU0PbfqjaQzSE/THp3.t9yU6CfeYS..K'),(22,'fabiana','fabiana@gmail.com','$2b$10$0JBDUrfpQEn9b7OH1NSye.Q6kSBkFxKyD0M7q0sDOZ3dgLdMYHbpS'),(23,'julia','julia@gmail.com','$2b$10$bszb2Q24W36K9gl/nS8aZ.1XlbuRuQywDnR0uu1Bbu0H0nU.wMNOW'),(24,'Lucas','lucas@gmail.com','$2b$10$.HEbBQhaVsWkECm6.3y5ieskoLB72x7A40PCJztRN5mOslW.1hOM.'),(25,'daniel','daniel@gmail.com','$2b$10$lxEiT4Od8H9x51RBFghyiuylIHGw3K1bw3QyZxnnGPoPkBCSXJB32'),(26,'edson','edson@gmail.com','$2b$10$dqcTSPy72uYthJWP.1oR9O2mEAvy8fVDp0UmwYRxbC5A/NH9.EMo.'),(27,'jair','jair@gmail.com','$2b$10$nbURLpmBeu/AwtpzYkgsUe/tYMUnrwoodlaBOxOiuN0CPFkaczFxy'),(28,'e','e@gmail.com','$2b$10$UZGE1ol9pcZz0davNLDGfeqnHYUsY/PZVnFqsz0YsCyJrRAT/qbSu'),(29,'bea','bea@gmail.com','$2b$10$2Tws4d1eXZnRc/gvYeOaJ.vtnEDr/437klLrjrtqAw861QeqHobLO'),(30,'Maria Clara','mariaclara@gmail.com','$2b$10$VKb5lQ7kQLJDsfYJLLh71uC1KVuZvQz5801kNMsXcFKIl.4yQnELa'),(31,'re','re@gmail.com','$2b$10$ckkPQhaiUS.TsWJts0G1J.UxZA4iHmJgkB56LypTO.RUGX0BXtFZi'),(32,'se','se@gmail.com','$2b$10$IPjcvPgeQz1z1jTWuVp9J.y63LIjzu5/H8jZiiAMVlprw5bkV03Jy'),(33,'a','a@gmail.com','$2b$10$lcd8Vn5ZOsqunvXCyjqfs.dlRmrkw29Xnv8AmcvLiK94K3JaLJgsW'),(34,'da','da@gmail.com','$2b$10$uNOKZ0ofwIW8VG8/z07Ui.ELbny1QzLFr0tTuwew2LNRk2OcwQPcG'),(35,'fab','fab@gmail.com','$2b$10$CsGTzzOaouFbFeszeilefuObZV/MeJKGdy3RxlstJrfniJ1aOmRgS'),(36,'sab','sab@mail.com','$2b$10$g.NM/F7IvDG8SyCQM.fsn.fFx/c8XkhKJ8gycnhWAXdDhszy3FfoO');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-09  0:38:16
