/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : dsf

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2018-08-23 20:53:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(40) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `content` varchar(255) NOT NULL,
  `userId` int(40) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '123', '<p ><br></p>', '1', '2018-08-22 14:54:47', '2018-08-23 20:03:55', '1');
INSERT INTO `article` VALUES ('2', '好好学习', '<p >天天向上</p>', '1', '2018-08-22 14:54:47', '2018-08-23 19:55:45', '0');
INSERT INTO `article` VALUES ('3', '这是一篇正式的文章', '<p ><span style=\"color:#4fc1e9\">正经人写的正经文章123321</span></p>', '1', '2018-08-22 14:54:47', '2018-08-23 20:10:08', '0');
INSERT INTO `article` VALUES ('4', '这是一篇正式的文章', '<p >正经人写的正经文章123</p>', '1', '2018-08-23 19:24:08', '2018-08-23 19:53:13', '1');
INSERT INTO `article` VALUES ('5', '来自努力学习的同学', '<p ><span style=\"color:#Da4453\">233333333</span></p>', '1', '2018-08-23 19:58:38', '2018-08-23 20:09:54', '0');
INSERT INTO `article` VALUES ('6', '写完会跳到详情页的文章', '<p >必跳</p>', '1', '2018-08-23 19:59:47', null, '0');

-- ----------------------------
-- Table structure for article_comment
-- ----------------------------
DROP TABLE IF EXISTS `article_comment`;
CREATE TABLE `article_comment` (
  `id` int(40) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `userId` int(40) NOT NULL,
  `articleId` int(40) NOT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_comment
-- ----------------------------
INSERT INTO `article_comment` VALUES ('1', '123', '1', '3', '0000-00-00 00:00:00', '2018-08-22 14:54:01');

-- ----------------------------
-- Table structure for article_dialogue
-- ----------------------------
DROP TABLE IF EXISTS `article_dialogue`;
CREATE TABLE `article_dialogue` (
  `id` int(11) NOT NULL,
  `targetId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dialogue` varchar(255) NOT NULL,
  `targetUserId` int(11) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_dialogue
-- ----------------------------

-- ----------------------------
-- Table structure for article_label
-- ----------------------------
DROP TABLE IF EXISTS `article_label`;
CREATE TABLE `article_label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_label
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(40) NOT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123', 'admin', '0000-00-00 00:00:00', '2018-08-22 14:47:04');
INSERT INTO `user` VALUES ('5', '123', '123', 'visitor', null, '2018-08-23 14:28:18');

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of _mysql_session_store
-- ----------------------------
