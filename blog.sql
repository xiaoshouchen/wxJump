/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2019-02-16 22:28:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT '文章简介',
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章封面',
  `click` int(11) NOT NULL DEFAULT '0' COMMENT '文章点击量',
  `publish_time` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章发布时间',
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作者,程序默认存储登录用户',
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `is_wechat` int(11) DEFAULT '1' COMMENT '检测是否是微信浏览器  1检测 0不检测',
  `is_jump` int(11) DEFAULT '1' COMMENT '开启随机跳转 1开启 0不开启',
  `arrow` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '点击文章内部箭头返回地址',
  `physics` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '物理按键点击返回',
  `music` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '背景音乐地址',
  `appid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信appId',
  `key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '微信密匙',
  `right_now` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '网站立即跳转到指定地址',
  `cnzz` text COLLATE utf8mb4_unicode_ci COMMENT '文章流量统计',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_encryption` tinyint(1) DEFAULT NULL,
  `iframe` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `source_check` tinyint(1) DEFAULT '0',
  `template_id` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of articles
-- ----------------------------

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL COMMENT '所属菜单分类',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '权限描述',
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限标识',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型：{0:接口,1:前端路由}',
  `default` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型：{0:不选中,1:默认选中,2:强制选中}',
  `extented` text COLLATE utf8mb4_unicode_ci COMMENT '权限扩展配置',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('1', '2', '菜单管理', '对菜单的所有权限控制', 'menu_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('2', '4', '角色管理', '角色的全部控制权限', 'role_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('3', '5', '用户管理', '用户的全部控制权限', 'user_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }, {\n                                \"value\": \"disable\",\n                                \"label\": \"禁用用户\"\n                            }, {\n                                \"value\": \"userGiveRole\",\n                                \"label\": \"给予用户权限\"\n                            }, {\n                                \"value\": \"editUserRole\",\n                                \"label\": \"编辑用户权限\"\n                            }]\n                        }', '1000', '2018-11-26 09:42:57', '2019-02-07 06:25:22');
INSERT INTO `authorities` VALUES ('4', '6', '权限管理', '权限的全部控制权限', 'auth_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('5', '8', '内容管理', '文章的全部控制权限', 'article_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }, {\n                                \"value\": \"url\",\n                                \"label\": \"文章链接\"\n                            }]\n                        }', '1000', '2018-11-26 09:42:57', '2019-02-12 06:07:07');
INSERT INTO `authorities` VALUES ('6', '9', '内容回收', '文章回收站的全部控制权限', 'recovery_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('7', '10', '文章分类', '文章分类的全部控制权限', 'category_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `authorities` VALUES ('8', '11', '文章发布视图的控制权限', '文章发布视图的控制权限', 'publish_article_all_controller', '1', '0', null, '1000', '2018-11-26 09:42:57', '2019-02-07 07:43:20');
INSERT INTO `authorities` VALUES ('11', '18', '联系我们', '联系我们权限设置', 'contact_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-01-21 12:10:12', '2019-01-21 12:10:12');
INSERT INTO `authorities` VALUES ('12', '20', '来源统计', '来源统计权限设置', 'source_count_all_controller', '1', '0', null, '1000', '2019-01-22 03:42:45', '2019-02-07 08:04:18');
INSERT INTO `authorities` VALUES ('13', '21', '订单列表', '订单列表权限设置', 'goods_list_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"show\",\n                                \"label\": \"订单详情\"\n                            }, {\n                                \"value\": \"search\",\n                                \"label\": \"属地查询\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-01-22 03:43:18', '2019-02-07 08:12:36');
INSERT INTO `authorities` VALUES ('14', '22', '综合统计', '综合统计权限设置', 'zh_all_controller', '1', '0', null, '1000', '2019-01-22 03:43:48', '2019-02-07 08:03:38');
INSERT INTO `authorities` VALUES ('15', '23', '员工统计', '员工统计权限设置', 'staff_count_all_controller', '1', '0', null, '1000', '2019-01-22 03:44:36', '2019-02-07 08:03:28');
INSERT INTO `authorities` VALUES ('16', '24', '订单回收站', '订单回收站权限设置', 'recovery_goods_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2019-01-22 03:45:31', '2019-01-22 03:45:31');
INSERT INTO `authorities` VALUES ('17', '29', '来源管理', '来源管理权限设置', 'source_all_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2019-01-22 03:46:25', '2019-01-22 03:46:25');
INSERT INTO `authorities` VALUES ('18', '26', '产品列表', '产品列表权限设置', 'goods_list_all_controller', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            },{\n                              \"value\":\"extension\",\n                              \"label\":\"推广链接\"\n                            \n                            }]\n                        }', '1000', '2019-01-22 03:47:16', '2019-02-07 08:20:50');
INSERT INTO `authorities` VALUES ('19', '27', '发布产品', '产品列表权限设置', 'publish_goods_all_controller', '1', '0', null, '1000', '2019-01-22 03:47:48', '2019-02-07 08:20:20');
INSERT INTO `authorities` VALUES ('20', '28', '产品模板', '产品视图模板管理', 'template_view_controller', '1', '0', '{\"type\": true,\r\n                            \"data\": [{\r\n                                \"value\": \"add\",\r\n                                \"label\": \"添加\"\r\n                            }, {\r\n                                \"value\": \"edit\",\r\n                                \"label\": \"编辑\"\r\n                            }, {\r\n                                \"value\": \"delete\",\r\n                                \"label\": \"删除\"\r\n                            }]\r\n                        }', '1000', '2019-01-22 03:48:33', '2019-01-22 03:48:33');
INSERT INTO `authorities` VALUES ('22', '31', '访问日志', '访问日志控制权限', 'log_control', '1', '0', null, '1000', '2019-02-07 06:42:46', '2019-02-07 06:42:46');
INSERT INTO `authorities` VALUES ('23', '32', '系统配置', '系统配置控制权限', 'system_control', '1', '0', null, '1000', '2019-02-07 06:43:11', '2019-02-07 06:43:11');
INSERT INTO `authorities` VALUES ('24', '33', '文章编辑', '文章编辑权限', 'edit_articles_control', '1', '0', null, '1000', '2019-02-07 07:48:27', '2019-02-07 07:48:27');
INSERT INTO `authorities` VALUES ('25', '30', '域名管理', '域名管理权限', 'domain_control', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"add\",\n                                \"label\": \"添加\"\n                            }, {\n                                \"value\": \"edit\",\n                                \"label\": \"编辑\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-02-07 07:49:14', '2019-02-07 07:49:14');
INSERT INTO `authorities` VALUES ('26', '34', '产品编辑', '产品编辑权限', 'edit_goods_control', '1', '0', null, '1000', '2019-02-07 08:29:08', '2019-02-07 08:29:08');
INSERT INTO `authorities` VALUES ('27', '35', '订单回收站', '订单回收站权限关联', 'recoveryOrder_all_control', '1', '0', '{\"type\": true,\n                            \"data\": [{\n                                \"value\": \"recovery\",\n                                \"label\": \"恢复\"\n                            }, {\n                                \"value\": \"delete\",\n                                \"label\": \"删除\"\n                            }]\n                        }', '1000', '2019-02-12 11:13:33', '2019-02-12 11:13:33');

-- ----------------------------
-- Table structure for categroys
-- ----------------------------
DROP TABLE IF EXISTS `categroys`;
CREATE TABLE `categroys` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '父类id',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分类名称',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of categroys
-- ----------------------------

-- ----------------------------
-- Table structure for config_models
-- ----------------------------
DROP TABLE IF EXISTS `config_models`;
CREATE TABLE `config_models` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '父id',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '关键字',
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '配置项',
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of config_models
-- ----------------------------
INSERT INTO `config_models` VALUES ('1', '0', 'json', 'admin_base', '{\"article_total\":0,\"pv\":0,\"share\":0,\"submit\":0,\"monday\":0,\"tuesday\":0,\"wednesday\":0,\"thursday\":0,\"friday\":0,\"saturday\":0,\"sunday\":0}', '后台首页配置项', '1');
INSERT INTO `config_models` VALUES ('2', '0', 'json', 'sitebase', '{\"site_name\":\"\\u54fc\\u54fc\\u529e\\u516c\",\"icp\":\"\\u8700ICP\\u590718024407\\u53f7-3\",\"qq\":\"2052728227\",\"phone\":\"17323057831\",\"tel\":\"17323057831\",\"keyword\":\"sitebase\",\"items\":[{\"address\":\"\\u6210\\u90fd\\u5e02\\u6b66\\u4faf\\u533a\\u7ea2\\u724c\\u697c\\u5e7f\\u573a2\\u53f7\\u5199\\u5b57\\u697c601\\u5ba4\",\"tel\":null,\"index\":2,\"status\":1}],\"site_keyword\":\"1234\",\"desc\":\"1234\",\"postNum\":\"610000\",\"jsSlot\":[{\"code\":\"<scritp><\\/scritp>\"},{\"code\":\"<scritp><\\/scritp>\"}]}', '没有描述', '1');
INSERT INTO `config_models` VALUES ('3', '0', 'json', 'point', '{\"english\":\"PRODUCT HIGHLIGHTS\",\"title\":\"\\u4ea7\\u54c1\\u4eae\\u70b9\",\"desc\":\"\\u6211\\u4eec\\u4e13\\u6ce8\\u4e8e\\u4e2d\\u4ecb\\u516c\\u53f8\\u5de5\\u4f5c\\u6d41\\u7a0b\\u7684\\u7ba1\\u7406,\\u6211\\u4eec\\u662f\\u8ffd\\u6c42\\u5b8c\\u7f8e\\u7684\\u6280\\u672f\\u6d41\\u6d3e,\\u6211\\u4eec\\u662f\\\"\\u6210\\u719f\\u7ba1\\u7406\\\" \\u7684\\u521b\\u9020\\u8005,\\u6211\\u4eec\\u62e5\\u6709.....\",\"keyword\":\"point\",\"items\":[{\"index\":1,\"address\":\"\\u5168\\u5c40\\u6027\",\"tel\":\"\\u7b80\\u5316\\u6d41\\u7a0b\\u4e36\\u5168\\u5c40\\u638c\\u63a7\",\"status\":1,\"title\":\"\\u7075\\u6d3b\\u6027\",\"desc\":\"\\u7b80\\u5316\\u6d41\\u7a0b\\uff0c\\u5168\\u5c40\\u638c\\u63a7\"},{\"address\":\"\\u667a\\u80fd\\u6027\",\"tel\":\"\\u6ce8\\u91cd\\u529f\\u80fd\\u4e36\\u4e00\\u952e\\u6392\\u8bc1\",\"index\":2,\"status\":1,\"title\":\"\\u8fde\\u901a\\u6027\",\"desc\":\"\\u4fe1\\u606f\\u5173\\u8054\\u3001\\u4e00\\u952e\\u6392\\u8bc1\"},{\"address\":\"\\u79d1\\u5b66\\u6027\",\"tel\":\"\\u8d44\\u6e90\\u6570\\u636e\\u5316\\u4e36\\u4fe1\\u606f\\u5316\",\"index\":3,\"status\":1,\"title\":\"\\u79d1\\u5b66\\u6027\",\"desc\":\"\\u8d44\\u6e90\\u6570\\u636e\\u5316\\u3001\\u4fe1\\u606f\\u5316\"},{\"address\":\"\\u6613\\u7528\\u6027\",\"tel\":\"\\u64cd\\u4f5c\\u7b80\\u5355\\u4e0a\\u624b\\u5feb\",\"index\":4,\"status\":1,\"title\":\"\\u6570\\u5b57\\u5316\",\"desc\":\"\\u591a\\u7ef4\\u5ea6\\u6570\\u636e\\u56fe\\u3001\\u62a5\\u8868\"},{\"address\":\"\\u53ef\\u89c6\\u5316\",\"tel\":\"\\u591a\\u7ef4\\u5ea6\\u6570\\u636e\\u56fe\\u8868\\u5c55\\u73b0\",\"index\":5,\"status\":1,\"title\":\"\\u4e13\\u4e1a\\u6027\",\"desc\":\"\\u5ba2\\u6237\\u4fe1\\u606f\\u8d44\\u6599\\u8be6\\u5c3d\\u8bb0\\u5f55\"}]}', '没有描述', '1');
INSERT INTO `config_models` VALUES ('4', '0', 'json', 'henhen', '{\"english\":\"HENG HENG OA\",\"title\":\"\\u54fc\\u54fc\\u529e\\u516c\",\"content\":\"<p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;\\\">\\u54fc\\u54fc\\u529e\\u516c\\u662f\\u7531\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u81ea\\u4e3b\\u7814\\u53d1\\u5e76\\u8fd0\\u8425\\u7684\\u6838\\u5fc3\\u4ea7\\u54c1\\uff0c\\u610f\\u5728\\u4e3a\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u63d0\\u4f9b\\u9ad8\\u6548\\u4fbf\\u5229\\u7684\\u6280\\u672f\\u670d\\u52a1\\u3002\\u4ea7\\u54c1\\u878d\\u5165\\u79d1\\u5b66\\u7684\\u7ba1\\u7406\\u601d\\u60f3\\u3001\\u7ba1\\u7406\\u6a21\\u5f0f\\uff0c\\u7ed3\\u5408\\u5148\\u8fdb\\u7684\\u8f6f\\u4ef6\\u6280\\u672f\\u3001\\u7f51\\u7edc\\u6280\\u672f\\uff0c\\u4e3a\\u7528\\u6237\\u63d0\\u4f9b\\u4e86\\u4f4e\\u6210\\u672c\\u3001\\u9ad8\\u6548\\u80fd\\u7684\\u534f\\u540c\\u529e\\u516c\\u548c\\u7ba1\\u7406\\u5e73\\u53f0\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5b8b\\u4f53, SimSun;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; padding: 0px; background: rgb(255, 255, 255); text-indent: 2em; line-height: 3em;\\\"><span style=\\\"color: rgb(47, 47, 47); letter-spacing: 0px; font-size: 16px; font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;\\\">\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u5e2e\\u52a9\\u4f01\\u4e1a\\u89c4\\u8303\\u5de5\\u4f5c\\u6d41\\u7a0b\\u3001\\u5f3a\\u5316\\u56e2\\u961f\\u6267\\u884c\\u3001\\u63a8\\u52a8\\u7cbe\\u7ec6\\u7ba1\\u7406\\u3001\\u4fc3\\u8fdb\\u4f01\\u4e1a\\u8425\\u4e1a\\u589e\\u957f\\u3002<\\/span><\\/p><p><br\\/><\\/p>\",\"keyword\":\"henhen\",\"desc\":\"\\u54fc\\u54fc\\u529e\\u516c\\u662f\\u7531\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u81ea\\u4e3b\\u7814\\u53d1\\u5e76\\u8fd0\\u8425\\u7684\\u6838\\u5fc3\\u4ea7\\u54c1\\uff0c\\u610f\\u5728\\u4e3a\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u63d0\\u4f9b\\u9ad8\\u6548\\u4fbf\\u5229\\u7684\\u6280\\u672f\\u670d\\u52a1\\u3002\\u4ea7\\u54c1\\u878d\\u5165\\u79d1\\u5b66\\u7684\\u7ba1\\u7406\\u601d\\u60f3\\u3001\\u7ba1\\u7406\\u6a21\\u5f0f\\uff0c\\u7ed3\\u5408\\u5148\\u8fdb\\u7684\\u8f6f\\u4ef6\\u6280\\u672f\\u3001\\u7f51\\u7edc\\u6280\\u672f\\uff0c\\u4e3a\\u7528\\u6237\\u63d0\\u4f9b\\u4e86\\u4f4e\\u6210\\u672c\\u3001\\u9ad8\\u6548\\u80fd\\u7684\\u534f\\u540c\\u529e\\u516c\\u548c\\u7ba1\\u7406\\u5e73\\u53f0\\u3002     \\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u5e2e\\u52a9\\u4f01\\u4e1a\\u89c4\\u8303\\u5de5\\u4f5c\\u6d41\\u7a0b\\u3001\\u5f3a\\u5316\\u56e2\\u961f\\u6267\\u884c\\u3001\\u63a8\\u52a8\\u7cbe\\u7ec6\\u7ba1\\u7406\\u3001\\u4fc3\\u8fdb\\u4f01\\u4e1a\\u8425\\u4e1a\\u589e\\u957f\\u3002\"}', '没有描述', '1');
INSERT INTO `config_models` VALUES ('5', '0', 'json', 'company', '{\"english\":\"COMPANY INTRODUCTION\",\"title\":\"\\u516c\\u53f8\\u4ecb\\u7ecd\",\"content\":\"<p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1<\\/span> <span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u3002<\\/span><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><span style=\\\"font-family:\\u5fae\\u8f6f\\u96c5\\u9ed1\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a<\\/span>\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1&nbsp;\\u3002<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">&nbsp;<\\/span><\\/p><p style=\\\"margin-bottom: 0px; white-space: normal; padding: 0px; background: rgb(255, 255, 255); line-height: 2em; margin-top: 10px;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1; color: rgb(47, 47, 47); letter-spacing: 0px;\\\">\\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002<\\/span><\\/p><p style=\\\"margin: 10px 0px 0px; text-indent: 0px; padding: 0px; background: rgb(255, 255, 255); line-height: 2em;\\\"><span style=\\\"font-family: \\u5fae\\u8f6f\\u96c5\\u9ed1;color: rgb(47, 47, 47);letter-spacing: 0;font-size: 16px\\\"><br\\/><\\/span><br\\/><\\/p><p><br\\/><\\/p>\",\"keyword\":\"company\",\"desc\":\"\\u56db\\u5ddd\\u732a\\u592a\\u5e05\\u79d1\\u6280\\u6709\\u9650\\u516c\\u53f8\\u4f5c\\u4e3a\\u4e00\\u5bb6\\u4e92\\u8054\\u7f51\\u79d1\\u6280\\u516c\\u53f8\\uff0c\\u4e3b\\u8981\\u4e1a\\u52a1\\u5305\\u62ec\\uff1a\\u4e92\\u8054\\u7f51\\u5efa\\u8bbe\\u4e36\\u7535\\u5b50\\u5546\\u52a1\\u4e36\\u4f01\\u4e1a\\u54a8\\u8be2\\u4e36\\u8f6f\\u4ef6\\u7ba1\\u7406\\u7cfb\\u7edf\\u5f00\\u53d1 \\u3002     \\u516c\\u53f8\\u521b\\u59cb\\u4eba\\u624e\\u6839\\u4e8e\\u5efa\\u7b51\\u884c\\u4e1a\\u591a\\u5e74\\uff0c\\u6df1\\u77e5\\u5efa\\u7b51\\u884c\\u4e1a\\u201c\\u75db\\u70b9\\u201d\\uff0c\\u5728\\u79fb\\u52a8\\u4e92\\u8054\\u7f51\\u7684\\u5927\\u6f6e\\u4e0b\\uff0c\\u732a\\u592a\\u5e05\\u53d1\\u5e03\\u4e86\\u4ee5\\u201c\\u667a\\u80fd\\u5316\\u3001\\u6d41\\u7a0b\\u5316\\u3001\\u5e73\\u53f0\\u5316\\u3001\\u6570\\u636e\\u5316\\u201d\\u56db\\u5316\\u4e3a\\u6838\\u5fc3\\u7684\\u7cfb\\u5217\\u4ea7\\u54c1\\uff0c\\u5305\\u62ec\\u9762\\u5411\\u4e2d\\u5c0f\\u578b\\u5efa\\u7b51\\u4e2d\\u4ecb\\u4f01\\u4e1a\\u7684\\u529e\\u516c\\u4ea7\\u54c1\\u2014\\u2014\\u54fc\\u54fc\\u529e\\u516c\\uff0c\\u4ee5\\u53ca\\u5e2e\\u52a9\\u5efa\\u7b51\\u4f01\\u4e1a\\u7ba1\\u7406\\u9879\\u76ee\\u3001\\u8bc1\\u4e66\\u3001\\u4eba\\u5458\\u7684\\u5e94\\u7528\\u578b\\u4ea7\\u54c1\\u2014\\u2014\\u5efa\\u7b51\\u4eba\\u7ba1\\u7406\\u7cfb\\u7edf\\u3002\"}', '没有描述', '1');
INSERT INTO `config_models` VALUES ('7', '0', 'json', 'batchOrder', '{\"status\":\"0\",\"number\":\"6\"}', '防刷订单配置', '1');
INSERT INTO `config_models` VALUES ('8', '0', 'json', 'emailNotify', '{\"status\":\"0\",\"smtp_server\":\"smtp.qq.com\",\"smtp_port\":\"465\",\"smtp_user\":\"2475710452@qq.com\",\"smtp_password\":\"jlklhuxflbnqdjah\",\"email_title\":\"\\u4f60\\u597d\\u5440!\"}', '邮件消息通知配置', '1');
INSERT INTO `config_models` VALUES ('9', '0', 'json', 'phoneNotify', '{\"status\":\"1\",\"provider\":\"smsbao\",\"access_key_id\":null,\"secret\":null,\"content\":null,\"sing_anme\":null,\"TemplateCode\":null}', '手机短信通知配置', '1');
INSERT INTO `config_models` VALUES ('10', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);
INSERT INTO `config_models` VALUES ('11', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);
INSERT INTO `config_models` VALUES ('12', '0', 'json', 'wx', '{\"appid\":\"1123\",\"secret\":\"123\"}', '微信配置', null);

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系人',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系电话',
  `qq` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'QQ号码',
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司名称',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言内容',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of contacts
-- ----------------------------

-- ----------------------------
-- Table structure for friend_links
-- ----------------------------
DROP TABLE IF EXISTS `friend_links`;
CREATE TABLE `friend_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of friend_links
-- ----------------------------

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品标题或者是名称',
  `params` text COLLATE utf8mb4_unicode_ci COMMENT '商品参数 如何 风格:圆领',
  `goods_desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '商品描述',
  `goods_content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品详情信息',
  `wheel_photo` text COLLATE utf8mb4_unicode_ci COMMENT '商品展示轮播图片',
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品封面',
  `price` decimal(8,2) NOT NULL COMMENT '商品单价',
  `is_up` tinyint(4) NOT NULL COMMENT '是否上架 0下架 1上架',
  `template_id` tinyint(4) NOT NULL COMMENT '商品展示模板',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for goods_orders
-- ----------------------------
DROP TABLE IF EXISTS `goods_orders`;
CREATE TABLE `goods_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) DEFAULT NULL COMMENT '订单处理状态',
  `meal_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '套餐名称',
  `num` int(11) NOT NULL COMMENT '购买数量',
  `order_num` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单数量',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '购买人联系电话',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '购买人联系地址',
  `message` text COLLATE utf8mb4_unicode_ci COMMENT '留言',
  `source` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '订单来源',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '购买人姓名',
  `order_total_price` decimal(8,2) NOT NULL COMMENT '订单总价',
  `size_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '尺码信息',
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ip信息',
  `goods_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品名称',
  `paytype` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '付款方法',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `msg_del` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of goods_orders
-- ----------------------------

-- ----------------------------
-- Table structure for html_templates
-- ----------------------------
DROP TABLE IF EXISTS `html_templates`;
CREATE TABLE `html_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模板名称',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '模板路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of html_templates
-- ----------------------------
INSERT INTO `html_templates` VALUES ('1', '默认模板', 'goods/default/view');
INSERT INTO `html_templates` VALUES ('2', '纪念币模板', 'goods/jlb/view');

-- ----------------------------
-- Table structure for meals
-- ----------------------------
DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `meal_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '套餐名称',
  `meal_price` decimal(8,2) NOT NULL COMMENT '套餐价格',
  `meal_stock` int(11) NOT NULL COMMENT '套餐库存',
  `goods_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of meals
-- ----------------------------
INSERT INTO `meals` VALUES ('1', '123', '123.00', '99999', '1');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级分类ID',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单名',
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '菜单链接',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态：{0：不显示，1：正常显示}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', '0', '系统设置', 'el-icon-setting', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('2', '1', '菜单管理', null, '/menu', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('3', '0', '用户管理', 'el-icon-menu', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('4', '3', '角色管理', null, '/role', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('5', '3', '用户管理', null, '/user', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('6', '3', '权限管理', null, '/auth', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('7', '0', '内容管理', 'el-icon-location', null, '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('8', '7', '文章列表', null, '/article_list', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('9', '7', '回收站', null, '/recovery', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('11', '7', '发布文章', null, '/publish_article', '1000', '1', '2018-11-26 09:42:57', '2018-11-26 09:42:57');
INSERT INTO `menus` VALUES ('19', '0', '订单管理', 'el-icon-goods', null, '1000', '1', '2019-01-22 03:22:18', '2019-01-22 03:22:18');
INSERT INTO `menus` VALUES ('20', '19', '来源统计', null, '/source_count', '1000', '1', '2019-01-22 03:23:15', '2019-01-22 03:31:01');
INSERT INTO `menus` VALUES ('21', '19', '订单列表', null, '/goods_order', '1000', '1', '2019-01-22 03:23:52', '2019-01-22 03:31:08');
INSERT INTO `menus` VALUES ('22', '19', '综合统计', null, '/zh_count', '1000', '1', '2019-01-22 03:24:39', '2019-01-22 03:31:14');
INSERT INTO `menus` VALUES ('23', '19', '员工统计', null, '/staff_count', '1000', '1', '2019-01-22 03:25:21', '2019-01-22 03:31:20');
INSERT INTO `menus` VALUES ('25', '0', '产品管理', 'el-icon-star-on', null, '1000', '1', '2019-01-22 03:28:27', '2019-01-22 03:28:34');
INSERT INTO `menus` VALUES ('26', '25', '产品列表', null, '/goods_list', '1000', '1', '2019-01-22 03:29:22', '2019-01-22 03:30:53');
INSERT INTO `menus` VALUES ('27', '25', '发布产品', null, '/publish_goods', '1000', '1', '2019-01-22 03:29:37', '2019-01-22 03:30:46');
INSERT INTO `menus` VALUES ('28', '25', '模板管理', null, '/template', '1000', '1', '2019-01-22 03:30:14', '2019-01-22 03:30:14');
INSERT INTO `menus` VALUES ('29', '19', '来源管理', null, '/source', '1000', '1', '2019-01-22 03:40:06', '2019-01-22 03:40:15');
INSERT INTO `menus` VALUES ('30', '7', '域名管理', null, '/url', '1000', '1', '2019-01-28 04:32:13', '2019-01-28 04:32:13');
INSERT INTO `menus` VALUES ('31', '1', '访问日志', null, '/visit', '1000', '1', '2019-01-29 03:30:08', '2019-01-29 03:30:08');
INSERT INTO `menus` VALUES ('32', '1', '系统配置', null, '/config', '1000', '1', '2019-01-30 01:53:27', '2019-01-30 01:53:27');
INSERT INTO `menus` VALUES ('33', '7', '文章编辑', null, '/article_edit', '1000', '0', '2019-02-07 06:48:55', '2019-02-07 06:48:55');
INSERT INTO `menus` VALUES ('34', '25', '产品编辑', null, '/edit_goods', '1000', '0', '2019-02-07 08:28:38', '2019-02-07 08:28:38');
INSERT INTO `menus` VALUES ('35', '19', '回收站', null, '/recoveryOrder', '1000', '1', '2019-02-12 11:11:20', '2019-02-12 11:11:52');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('1', '2014_10_12_100000_create_password_resets_table', '1');
INSERT INTO `migrations` VALUES ('2', '2016_06_01_000001_create_oauth_auth_codes_table', '1');
INSERT INTO `migrations` VALUES ('3', '2016_06_01_000002_create_oauth_access_tokens_table', '1');
INSERT INTO `migrations` VALUES ('4', '2016_06_01_000003_create_oauth_refresh_tokens_table', '1');
INSERT INTO `migrations` VALUES ('5', '2016_06_01_000004_create_oauth_clients_table', '1');
INSERT INTO `migrations` VALUES ('6', '2016_06_01_000005_create_oauth_personal_access_clients_table', '1');
INSERT INTO `migrations` VALUES ('7', '2018_08_27_020528_create_users_table', '1');
INSERT INTO `migrations` VALUES ('8', '2018_08_27_071042_create_menus_table', '1');
INSERT INTO `migrations` VALUES ('9', '2018_08_28_060312_create_roles_table', '1');
INSERT INTO `migrations` VALUES ('10', '2018_08_28_060732_create_authorities_table', '1');
INSERT INTO `migrations` VALUES ('11', '2018_09_21_045401_create_role_and_auth_table', '1');
INSERT INTO `migrations` VALUES ('12', '2018_09_21_045431_create_user_and_role_table', '1');
INSERT INTO `migrations` VALUES ('13', '2018_10_22_063109_create_role_and_menu_table', '1');
INSERT INTO `migrations` VALUES ('15', '2018_11_23_065846_create_categroys_table', '3');
INSERT INTO `migrations` VALUES ('16', '2018_11_26_032618_create_html_templates_table', '4');
INSERT INTO `migrations` VALUES ('17', '2018_11_26_072838_create_friend_links_table', '5');
INSERT INTO `migrations` VALUES ('18', '2018_09_17_071636_create_config_models_table', '6');
INSERT INTO `migrations` VALUES ('19', '2018_12_05_084521_create_products_table', '7');
INSERT INTO `migrations` VALUES ('20', '2018_12_06_011225_create_contacts_table', '8');
INSERT INTO `migrations` VALUES ('21', '2018_12_06_011341_create_orders_table', '8');
INSERT INTO `migrations` VALUES ('22', '2018_12_06_075043_create_navs_table', '9');
INSERT INTO `migrations` VALUES ('23', '2018_12_06_075200_create_s_e_os_table', '9');
INSERT INTO `migrations` VALUES ('24', '2018_11_22_075138_create_articles_table', '10');
INSERT INTO `migrations` VALUES ('25', '2019_01_22_071729_create_sources_table', '11');
INSERT INTO `migrations` VALUES ('26', '2019_01_23_011235_create_meals_table', '12');
INSERT INTO `migrations` VALUES ('27', '2019_01_23_035128_create_sizes_table', '13');
INSERT INTO `migrations` VALUES ('28', '2019_01_23_055519_create_source_urls_table', '14');
INSERT INTO `migrations` VALUES ('29', '2019_01_23_061532_create_goods_table', '15');
INSERT INTO `migrations` VALUES ('30', '2019_01_24_080311_create_goods_orders_table', '16');
INSERT INTO `migrations` VALUES ('31', '2019_01_28_034251_create_urls_table', '17');
INSERT INTO `migrations` VALUES ('32', '2019_01_30_004042_create_visit_logs_table', '18');

-- ----------------------------
-- Table structure for navs
-- ----------------------------
DROP TABLE IF EXISTS `navs`;
CREATE TABLE `navs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '导航名称',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '导航链接地址',
  `seo_id` int(11) DEFAULT NULL COMMENT '页面所使用的 seo信息',
  `nav_banner` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of navs
-- ----------------------------

-- ----------------------------
-- Table structure for oauth_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of oauth_access_tokens
-- ----------------------------
INSERT INTO `oauth_access_tokens` VALUES ('03d2b060abea00185d4b13b97f59766e52cbdcfc689d3abb1fd643bcb72913b05c5b8fb1f4f25579', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:45:15', '2018-11-21 02:45:15', '2019-11-21 02:45:15');
INSERT INTO `oauth_access_tokens` VALUES ('0503f15588dd98ffbd4d4020d3496186ad8b52d175931852dcba521dfee59003f5eed7be0127f7d1', '1', '1', 'JzrXZH', '[]', '0', '2019-02-09 03:44:10', '2019-02-09 03:44:10', '2020-02-09 03:44:10');
INSERT INTO `oauth_access_tokens` VALUES ('06a17d2fc216772bd6e4f8110b4be4dae1316024d1df841fee2075afef4589e59afa2e881bafa021', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:47:22', '2019-02-08 03:47:22', '2020-02-08 03:47:22');
INSERT INTO `oauth_access_tokens` VALUES ('074202d7a9191c2a2e13cb32a58a2991f5627ac30da6d6d0118af091f4750770e4a30358c2106614', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 06:27:35', '2018-11-21 06:27:35', '2019-11-21 06:27:35');
INSERT INTO `oauth_access_tokens` VALUES ('09be6e5b7a6535f7dcfb46fbdac5b80065d21e849e06e2873ece6b785715c906c199668ba9184863', '1', '1', 'JzrXZH', '[]', '0', '2018-12-12 03:20:00', '2018-12-12 03:20:00', '2019-12-12 03:20:00');
INSERT INTO `oauth_access_tokens` VALUES ('0cb3d09fc4c354b15d31bbff24bf1b4afe6aaa4a05bcd1f02ea83b510e9143da8cf2bd305f405797', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:34:24', '2019-02-08 03:34:24', '2020-02-08 03:34:24');
INSERT INTO `oauth_access_tokens` VALUES ('0cee366d3b5e1180c9aeb4273d2edac7e0f18cd9faaeb6312b6fe17209950c2932dd6a4c23e61382', '1', '1', 'JzrXZH', '[]', '0', '2019-01-22 11:32:47', '2019-01-22 11:32:47', '2020-01-22 11:32:47');
INSERT INTO `oauth_access_tokens` VALUES ('11155e24c8508bd99b8b8ffa9fe9001d575bbc5138267935c5e537b681816d16b3eaeabe4c1ce926', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:08:33', '2018-11-21 09:08:33', '2019-11-21 09:08:33');
INSERT INTO `oauth_access_tokens` VALUES ('119280bd0a915cb2f80678bbe68f34525f3eb879efcfcd591d045d9495b70d70e6f4c2739dffb74c', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:33:46', '2018-11-21 02:33:46', '2019-11-21 02:33:46');
INSERT INTO `oauth_access_tokens` VALUES ('123db3b2975de9a71b91378378b7e3aaecfae9b452c77ef56e04e6801967c4933b9f625e79940321', '1', '1', 'JzrXZH', '[]', '0', '2018-12-10 08:59:33', '2018-12-10 08:59:33', '2019-12-10 08:59:33');
INSERT INTO `oauth_access_tokens` VALUES ('146c20d589bfff24dd67846b4347b634c771984c67a2604c39262c69f64f1da8cf6652a50b4e9adb', '1', '1', 'JzrXZH', '[]', '0', '2018-12-06 08:03:23', '2018-12-06 08:03:23', '2019-12-06 08:03:23');
INSERT INTO `oauth_access_tokens` VALUES ('15e1376a4bf419404e72225bba7fba99cfc71b6f9c55eb112ffe7411ef99af75d6231d0b55dd0b9c', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:35:01', '2018-11-21 02:35:01', '2019-11-21 02:35:01');
INSERT INTO `oauth_access_tokens` VALUES ('19abd4965a1a4166030a52e2cc05ca1ef9b50c904d5562fcfe12c43e76e928e3c20a13f7cea769cc', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 00:55:44', '2018-11-22 00:55:44', '2019-11-22 00:55:44');
INSERT INTO `oauth_access_tokens` VALUES ('1da5e1d4ed10ee48e70c9c00ee16afc15ad4c999c14db5bc603313c555e2923df93f735f7f5dd8da', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:40:52', '2019-02-08 04:40:52', '2020-02-08 04:40:52');
INSERT INTO `oauth_access_tokens` VALUES ('220e00eccefb6dbcae3e88adec7d84b8bffa2eb88b3837ec84c6b55535006e5d60241d4ad86cca56', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:14:39', '2018-11-21 02:14:39', '2019-11-21 02:14:39');
INSERT INTO `oauth_access_tokens` VALUES ('2293cfe039121ac731926abba20f122f50ec3b7e4997ca91306c68503f4a8a851f0fd617108c43bf', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 00:54:53', '2018-11-22 00:54:53', '2019-11-22 00:54:53');
INSERT INTO `oauth_access_tokens` VALUES ('229bd1b3e05d403bfb6e171cd7d9afff6fe865a0ff890041938911be7551448c8ffcaa689d5aea48', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 00:53:37', '2018-11-26 00:53:37', '2019-11-26 00:53:37');
INSERT INTO `oauth_access_tokens` VALUES ('22db4caf88582f6164f5f556ed2fb8477521c54694f84fa352685f4860dc32fc22a9b2ea141be965', '1', '1', 'JzrXZH', '[]', '0', '2019-02-12 06:19:35', '2019-02-12 06:19:35', '2020-02-12 06:19:35');
INSERT INTO `oauth_access_tokens` VALUES ('24329d57b458f9b9e01d5e7dadf0ad3af5f60633c3fda003303fa7863a8b64aa8489830a7092bf5b', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:59:24', '2018-11-21 02:59:24', '2019-11-21 02:59:24');
INSERT INTO `oauth_access_tokens` VALUES ('245470c02c969c1bd12f500ce6f42238ede9e578b2e3582de1d53183fd01fca135b4bf1fe0f3b9ef', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:03:43', '2018-11-21 03:03:43', '2019-11-21 03:03:43');
INSERT INTO `oauth_access_tokens` VALUES ('25d5a4d32fe78da20cc184259b6cd1f8a4ded1da8a0bbcce54b52a089bc04fdb7c541708e3b18167', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:34:12', '2018-11-21 02:34:12', '2019-11-21 02:34:12');
INSERT INTO `oauth_access_tokens` VALUES ('25ded54fac3eb1f05dabb79668bd4e57460957a1303bd7607b1fbcb870e2129675229e5e3ad8e361', '1', '1', 'JzrXZH', '[]', '0', '2019-02-03 10:57:11', '2019-02-03 10:57:11', '2020-02-03 10:57:11');
INSERT INTO `oauth_access_tokens` VALUES ('268c7bac3e5cd17a97f58f6bca9224ba7ca07fa801d6871ce992341f6eecd0057587f150160f1431', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:09:39', '2018-11-21 09:09:39', '2019-11-21 09:09:39');
INSERT INTO `oauth_access_tokens` VALUES ('268ed9ce643cb6926b14032642c33c1f8b26be024d91493631b14e5beb4f48c200fffa7e7293002f', '1', '1', 'JzrXZH', '[]', '0', '2019-01-29 01:59:04', '2019-01-29 01:59:04', '2020-01-29 01:59:04');
INSERT INTO `oauth_access_tokens` VALUES ('26db1d9ddb4b86bc9c87eaf3f2f85edcf658cc67f2a42a7735cc40f0cf04254c5e1c403b8b737f16', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:10:15', '2018-11-21 02:10:15', '2019-11-21 02:10:15');
INSERT INTO `oauth_access_tokens` VALUES ('27fbec113166f1d40b873ae0768b08a89723250e0c47bdd328d4252ea4d0ebd217d1473cea2cd49c', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:57:26', '2019-02-08 03:57:26', '2020-02-08 03:57:26');
INSERT INTO `oauth_access_tokens` VALUES ('28a802840ceca977fc26eef36fdb73e6797f71402dcc1951b295dede9dad75b475ca7d661d9e8ccf', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 00:50:42', '2018-11-22 00:50:42', '2019-11-22 00:50:42');
INSERT INTO `oauth_access_tokens` VALUES ('2abbd191fc0561c6f1456232f2c5685bee0f18dc3d4cd8ceb6b432eacf78822bc893fbcf6c296b1c', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:51:00', '2019-02-08 03:51:00', '2020-02-08 03:51:00');
INSERT INTO `oauth_access_tokens` VALUES ('2af441e3ad694c7ee511d327eaa53a2acd21230b40ca9e307cb0944ea42fa4130a2c723736ae674a', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:00:53', '2019-02-08 04:00:53', '2020-02-08 04:00:53');
INSERT INTO `oauth_access_tokens` VALUES ('2c8b7cb7ebc3be1fa3f1ce1e851f30b93bacdb84300bf21a303c4a90a60f34630b871218c4841776', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:16:58', '2018-11-21 03:16:58', '2019-11-21 03:16:58');
INSERT INTO `oauth_access_tokens` VALUES ('2d24d4424b70c562266cef29ad7987d424a2964cb94c9fce706fa2f27f46969b4d45097459642e6f', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:27:09', '2019-02-08 03:27:09', '2020-02-08 03:27:09');
INSERT INTO `oauth_access_tokens` VALUES ('2e5fcbcbe51be594af535ac16ed59dd328ec0423c0beacfb246be84916ff000409efd4af9c266591', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:18:44', '2018-11-21 02:18:44', '2019-11-21 02:18:44');
INSERT INTO `oauth_access_tokens` VALUES ('2f41465a7b949b4ae328c5acfd5c3a80901e8c8176f6f50dc814f33cb19cd82517c9663672a093a5', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:20:03', '2018-11-21 09:20:03', '2019-11-21 09:20:03');
INSERT INTO `oauth_access_tokens` VALUES ('3077af8c39a212011e5c0723f938817b8fee44f8a87456b329da7f3c9e9dace8fb89da4d357b68fd', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:36:29', '2018-11-21 02:36:29', '2019-11-21 02:36:29');
INSERT INTO `oauth_access_tokens` VALUES ('3113418262a94012bcea96dd819c8035090cc30f9fc69c9c7bd1f66fcde437313da1184786d54b7c', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 08:37:59', '2018-11-26 08:37:59', '2019-11-26 08:37:59');
INSERT INTO `oauth_access_tokens` VALUES ('35bad2e9e6f228733f1e847418c2ac9ecde73cee4eb50a0a41cf7e78aab271ee60cceeb75dcd5a88', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:38:00', '2018-11-21 02:38:00', '2019-11-21 02:38:00');
INSERT INTO `oauth_access_tokens` VALUES ('37ec0663358b5f6b8664c6ada2ee4997b59fe2c305b322dd82c40fb81a75c35fa21c5bd5ed999eaf', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:42:46', '2019-02-08 03:42:46', '2020-02-08 03:42:46');
INSERT INTO `oauth_access_tokens` VALUES ('3a100e94349929420cbd4692c3dbd77591bc8e034aba0c4b6eb521eeb52d53d7869f5fe84a07d53d', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:01:38', '2018-11-21 03:01:38', '2019-11-21 03:01:38');
INSERT INTO `oauth_access_tokens` VALUES ('3ad303082e8c03f6e9ad3ee2d44fed29cfb172b61eb6aecb5128dbeea72b0f89fb2791f8209f4e39', '1', '1', 'JzrXZH', '[]', '0', '2019-02-10 03:47:30', '2019-02-10 03:47:30', '2020-02-10 03:47:30');
INSERT INTO `oauth_access_tokens` VALUES ('3c229e0ceb71fd112129cef34c4696e43bc32e11626007bffdbbb3a7c0869637b48ab6ed69f271f5', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 01:43:29', '2018-11-21 01:43:29', '2019-11-21 01:43:29');
INSERT INTO `oauth_access_tokens` VALUES ('3c23c3d68f28480d8ce59d25640bcf2d69340c6116cfd7382b0d041e437d4baaa8cee960fb9941df', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:42:02', '2019-02-08 04:42:02', '2020-02-08 04:42:02');
INSERT INTO `oauth_access_tokens` VALUES ('3e3c6acc25a004a084c6eb712364d1fdd3c720fcf614ff1abd1919753f3dad340878eb5579097eab', '1', '1', 'JzrXZH', '[]', '0', '2019-02-12 05:56:08', '2019-02-12 05:56:08', '2020-02-12 05:56:08');
INSERT INTO `oauth_access_tokens` VALUES ('3f43d26cf650e11ca3122dc0311799fac0c30475cb8237866ce2786ea6ddeb6abbac7117974a69e7', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:28:18', '2018-11-21 09:28:18', '2019-11-21 09:28:18');
INSERT INTO `oauth_access_tokens` VALUES ('41ba75bc1c323c0013abdfbb7d59fc7f18483a5d244ad3f121a581691395785c73463035073bfc7e', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 01:25:31', '2018-11-22 01:25:31', '2019-11-22 01:25:31');
INSERT INTO `oauth_access_tokens` VALUES ('4207da6b089022310dab6e3916f8f86b529e3795d4867189dca2d63d54f69cb494d4ff295c7d3258', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:16:57', '2018-11-21 02:16:57', '2019-11-21 02:16:57');
INSERT INTO `oauth_access_tokens` VALUES ('421c73c76afc1308a556670d84bc149e2005c58912aa83d18f01cacd26ba55683fb99226efcb7874', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:38:35', '2019-02-08 03:38:35', '2020-02-08 03:38:35');
INSERT INTO `oauth_access_tokens` VALUES ('4774591ce28facec043c2a1ee4a877dfd73e973ac0f60599aaa80c15560daa4c6a4098747fd9734f', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:33:36', '2018-11-21 02:33:36', '2019-11-21 02:33:36');
INSERT INTO `oauth_access_tokens` VALUES ('49a959adbb0b74fab76cbeb4ce7d9cfcb5f7b0b8cf2b03be51bb7e938f61b44c6444afa575547508', '1', '1', 'JzrXZH', '[]', '0', '2019-02-02 10:15:53', '2019-02-02 10:15:53', '2020-02-02 10:15:53');
INSERT INTO `oauth_access_tokens` VALUES ('4b4252e3e29869eab55fb0ac850e47a247a9d16eab9c99b4760e24aadd463f6122007b90b2b34360', '1', '1', 'JzrXZH', '[]', '0', '2019-01-30 02:00:06', '2019-01-30 02:00:06', '2020-01-30 02:00:06');
INSERT INTO `oauth_access_tokens` VALUES ('4bcc3d28114d2beafacb8463961672f925d61417b8c6c22045fc026dbfa5b0d32a772ad6e2cade48', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 07:56:00', '2018-12-05 07:56:00', '2019-12-05 07:56:00');
INSERT INTO `oauth_access_tokens` VALUES ('4d2e972fc1a97dd206922d489b64a5d17b8250681f519e0482fb5a632dbd0f95480181c76d4ad392', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:33:20', '2018-11-21 02:33:20', '2019-11-21 02:33:20');
INSERT INTO `oauth_access_tokens` VALUES ('5003ed950be7936a2654003e7acb6902c6b52f55912b06f04f8d58ece2a22fdc236ca4e63fa2b5a4', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 00:57:25', '2018-11-22 00:57:25', '2019-11-22 00:57:25');
INSERT INTO `oauth_access_tokens` VALUES ('533fb1eb644db21216bf2b843788d106212561a2efd742bd3d7f1d91cdf420777254e9850f06a6b8', '1', '4', 'JzrXZH', '[]', '0', '2019-02-12 11:10:45', '2019-02-12 11:10:45', '2020-02-12 11:10:45');
INSERT INTO `oauth_access_tokens` VALUES ('54cefe03e1e1287bff03e0ca1fdcf9c6f509400acffa5b09b9687288355de87bfde5cfffe1d163c7', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 08:47:39', '2018-11-21 08:47:39', '2019-11-21 08:47:39');
INSERT INTO `oauth_access_tokens` VALUES ('54d37b6c92501b04786d8349fb18e9666dce0be3f27234e375974c72ce454cbbeb1c609b01549564', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:23:35', '2018-11-21 02:23:35', '2019-11-21 02:23:35');
INSERT INTO `oauth_access_tokens` VALUES ('54f30f140106db70a91dc61370847ba0b335fd8e66c8e5aab17c18d67bbd309d2a003dbae6bf4faf', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:23:53', '2018-11-21 09:23:53', '2019-11-21 09:23:53');
INSERT INTO `oauth_access_tokens` VALUES ('58c59f2d8ab81800efb2827a42afa62d4a56f0f343f34f7cb2b8e8e4f3c0f5a6b19ffb65deb8652c', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 08:43:18', '2018-11-21 08:43:18', '2019-11-21 08:43:18');
INSERT INTO `oauth_access_tokens` VALUES ('58dcdf0b17fa1beed99eef2f7d8c2a248276739db28c1ad4ef7af5d0a9934394c2e9f8c6e0d230f0', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:09:40', '2018-11-21 02:09:40', '2019-11-21 02:09:40');
INSERT INTO `oauth_access_tokens` VALUES ('59b8f60c01019db14c3dd364008e504858df14c1dcc1d5bbd4ef930d0cf3357ccef5c7ab6c2a16f1', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 00:53:37', '2018-11-26 00:53:37', '2019-11-26 00:53:37');
INSERT INTO `oauth_access_tokens` VALUES ('5b18e98d995001fbc9bb2d546557d026b123a0a73e483e4c408331e99325d05286a48fa2e2b0783e', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:25:04', '2019-02-08 04:25:04', '2020-02-08 04:25:04');
INSERT INTO `oauth_access_tokens` VALUES ('5b7033b25a88a93e66908df2853555262e18c419066d4a09b260b1aec2824f40398ead8efa11b76f', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:48:13', '2018-11-21 02:48:13', '2019-11-21 02:48:13');
INSERT INTO `oauth_access_tokens` VALUES ('5ca8a9afb7f4a5af6731f2b05f3e14abbd3fdc67d81530019d02e0de92737231367792cf8945b91a', '3', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:33:56', '2019-02-10 04:33:56', '2020-02-10 04:33:56');
INSERT INTO `oauth_access_tokens` VALUES ('6402de38e826b5631e2a179f3f697d1f0e3884fa39f21511d8bc8846a031f2204324c11f76619baf', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:38:12', '2019-02-08 04:38:12', '2020-02-08 04:38:12');
INSERT INTO `oauth_access_tokens` VALUES ('64df10d3d9018898f7dd40001d938723997f3270a4d35529a7569c876eeddae502a30893d38285b3', '1', '1', 'JzrXZH', '[]', '0', '2019-01-23 12:50:19', '2019-01-23 12:50:19', '2020-01-23 12:50:19');
INSERT INTO `oauth_access_tokens` VALUES ('6577950caa522b97b9c93a1eb6740b160f8479cfb624d11bb14dd9c75915a5f96694b1cd2f03701a', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 05:50:25', '2018-12-05 05:50:25', '2019-12-05 05:50:25');
INSERT INTO `oauth_access_tokens` VALUES ('67de7111391712e7e8930875432ab8734d561d656f480f1f5dc0c286de0fcc5bd1acf6576c5c9673', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:35:17', '2018-11-21 02:35:17', '2019-11-21 02:35:17');
INSERT INTO `oauth_access_tokens` VALUES ('6a14a7a292f9e9e5911c5bfec6806506b7320512d5987363949b969cee4c98bb55d04488e31b5367', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:15:56', '2018-11-21 09:15:56', '2019-11-21 09:15:56');
INSERT INTO `oauth_access_tokens` VALUES ('6b1c086eb6341c74442a948a6e0a0871fba0e1e7ab4f796ef3abae062aef5ccf7e70a744a2c3d102', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:44:01', '2019-02-08 03:44:01', '2020-02-08 03:44:01');
INSERT INTO `oauth_access_tokens` VALUES ('6c5e381bbcf2da99db805502812e65757b38a7ec8289a88bdc2fa6a58059f0d6537531ad55d49d95', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:19:36', '2018-11-21 09:19:36', '2019-11-21 09:19:36');
INSERT INTO `oauth_access_tokens` VALUES ('6c93d6042839297adc32dbc035d9eb42ad7fcaff6e89ef130421d5678ec6c95b77cbc8e9f07cfb9d', '1', '4', 'JzrXZH', '[]', '0', '2019-02-15 17:38:53', '2019-02-15 17:38:53', '2020-02-15 17:38:53');
INSERT INTO `oauth_access_tokens` VALUES ('707151f4e25b39dca3058933c40ec32a3350c762c36c3b75303c70936d0389c0f6a5dc3122830e07', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 00:52:48', '2018-11-22 00:52:48', '2019-11-22 00:52:48');
INSERT INTO `oauth_access_tokens` VALUES ('73182cbd6db39636a9889c0cdd58d221965446b802464606919df74b0500d1c6fd715f4dca9f2de6', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 00:53:36', '2018-11-26 00:53:36', '2019-11-26 00:53:36');
INSERT INTO `oauth_access_tokens` VALUES ('741516ed88de228dd3a86f5906558a4b536cf5fb7df0887ad9392054a6cd63995a17b535d6f0c9b2', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 08:38:26', '2018-11-26 08:38:26', '2019-11-26 08:38:26');
INSERT INTO `oauth_access_tokens` VALUES ('746e52c33bab9ede7feed0a84a22322c675ce116d37736bcad2427bd427e899b65c5dacd9b6a56cb', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:11:12', '2018-11-21 02:11:12', '2019-11-21 02:11:12');
INSERT INTO `oauth_access_tokens` VALUES ('750d102ac08a4c849579f430e73ae799b2f8566f47d05ab6013ea15cf7463f2a20dac21c53a15c85', '1', '1', 'JzrXZH', '[]', '0', '2019-01-23 12:32:06', '2019-01-23 12:32:06', '2020-01-23 12:32:06');
INSERT INTO `oauth_access_tokens` VALUES ('75f43fb7b5723ac5f1713f12eec22b85a25ca6f5bc677e9544a589a79ca0cc8e877c6e9bf949bf83', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:03:18', '2018-11-21 03:03:18', '2019-11-21 03:03:18');
INSERT INTO `oauth_access_tokens` VALUES ('769ce9829597d832c726d686ac7f2527a134ff914eacfdb8d7d2462ee31d4478dda67e84385e586c', '1', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:26:19', '2019-02-10 04:26:19', '2020-02-10 04:26:19');
INSERT INTO `oauth_access_tokens` VALUES ('76d6ce6051275c0f184099508167c23c02bdd2f2597d1d0c857e2ae63404b8f4a5ec781981f46059', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:24:04', '2018-11-21 02:24:04', '2019-11-21 02:24:04');
INSERT INTO `oauth_access_tokens` VALUES ('7a088f7fd3fadecd934d94c8fc29c8f44a5d556b0fdae9f5b657604b71820107b50a3a2130b74ffc', '1', '1', 'JzrXZH', '[]', '0', '2018-12-13 09:43:35', '2018-12-13 09:43:35', '2019-12-13 09:43:35');
INSERT INTO `oauth_access_tokens` VALUES ('7b4a08fb7a1d37c1fa64e1e1486d366e324028fdb3a2ac9958c09e0fe7ac9d59bb6d9555c7ef0cdd', '1', '1', 'JzrXZH', '[]', '0', '2019-01-21 11:28:33', '2019-01-21 11:28:33', '2020-01-21 11:28:33');
INSERT INTO `oauth_access_tokens` VALUES ('7bb15697ca4015e311e0a54cb32cc4666d695a7456bb78fe687ec12597ea5ace23836a038dda6841', '1', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:32:28', '2019-02-10 04:32:28', '2020-02-10 04:32:28');
INSERT INTO `oauth_access_tokens` VALUES ('7bdeca820b8cc3991e120b4f08e344b8d34805bcbc30f5eac9575750c07aa86a305be9e1426ac55e', '1', '1', 'JzrXZH', '[]', '0', '2019-01-29 01:59:01', '2019-01-29 01:59:01', '2020-01-29 01:59:01');
INSERT INTO `oauth_access_tokens` VALUES ('7e190c72dd9760a36eb4ebe5d3a20596eab88dfdc65b3cca5790a474c86f7dc30877faf692be478e', '1', '1', 'JzrXZH', '[]', '0', '2018-12-12 07:06:47', '2018-12-12 07:06:47', '2019-12-12 07:06:47');
INSERT INTO `oauth_access_tokens` VALUES ('7f5343c71c96f9919558d1ec9d8018e234a323b4acaf80c711f451f5dfc06a47429305db53add710', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:53:04', '2019-02-08 03:53:04', '2020-02-08 03:53:04');
INSERT INTO `oauth_access_tokens` VALUES ('7fcf4eeebfa44c3ad7e4e587be04daa16499566b8bd60e35f11a1944cdd78bd9d5bec50aa3a5a927', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:55:24', '2019-02-08 03:55:24', '2020-02-08 03:55:24');
INSERT INTO `oauth_access_tokens` VALUES ('80160ef0aa02b6e3eb945627b6874156c6deaab6b2abb1c8f68b3ca08eb92a9deff4e960bf807f84', '1', '1', 'JzrXZH', '[]', '0', '2018-11-20 05:59:42', '2018-11-20 05:59:42', '2019-11-20 05:59:42');
INSERT INTO `oauth_access_tokens` VALUES ('803f8a280a124feb221ff98a1fd9cdb0c79a032ef4b596e63b17187cb2bf0c58a3d72618426b1faa', '1', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:29:39', '2019-02-10 04:29:39', '2020-02-10 04:29:39');
INSERT INTO `oauth_access_tokens` VALUES ('808489bdb0ab81248891fedaa80136aa3e868b3b3d8eb2b10dbbc3084314d9894268fdc6c4d156d2', '1', '1', 'JzrXZH', '[]', '0', '2019-02-07 04:06:06', '2019-02-07 04:06:06', '2020-02-07 04:06:06');
INSERT INTO `oauth_access_tokens` VALUES ('81c0e2e6bbddc77139d4bfbe26f7aa2bf4565ea42eda8423eba8df7a022b65de599134ecf72a48b7', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:11:07', '2018-11-21 03:11:07', '2019-11-21 03:11:07');
INSERT INTO `oauth_access_tokens` VALUES ('8220bdd4d7fff027c7612de4e58f892db2d8a34e3c661a3e346cd28fe261e5537ddfd87ebbe9501d', '1', '1', 'JzrXZH', '[]', '0', '2019-02-07 11:15:57', '2019-02-07 11:15:57', '2020-02-07 11:15:57');
INSERT INTO `oauth_access_tokens` VALUES ('84faf92ba4c6c62d801f4515598b8fdebe2a72af325ff9d6037f83ea087e5045ee67994932d0d5bd', '1', '1', 'JzrXZH', '[]', '0', '2018-12-12 06:01:30', '2018-12-12 06:01:30', '2019-12-12 06:01:30');
INSERT INTO `oauth_access_tokens` VALUES ('869cca5d4519055b70667da7f2cf8f1714d264af69a8171075ea13216b868a0ebf8fb631c86f1c63', '1', '1', 'JzrXZH', '[]', '0', '2019-01-22 11:32:47', '2019-01-22 11:32:47', '2020-01-22 11:32:47');
INSERT INTO `oauth_access_tokens` VALUES ('87d068194b1b745eeddd20b6913e7c19756ca72907ae93ae35a5670d73adaf3f87ea84a4b3dc59eb', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:41:26', '2019-02-08 03:41:26', '2020-02-08 03:41:26');
INSERT INTO `oauth_access_tokens` VALUES ('8900f40f3bbd91f7ba0246c4ce8a1220e409446c51fdbe68b1c1048ccc43523859e8b4c9a842ae04', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 01:42:45', '2018-11-21 01:42:45', '2019-11-21 01:42:45');
INSERT INTO `oauth_access_tokens` VALUES ('89cd2f8539d55792597aaa55384ed6b959470a3d10226e261be6ed95d3fcd2d5a4ddb00387e439b2', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:52:35', '2019-02-08 03:52:35', '2020-02-08 03:52:35');
INSERT INTO `oauth_access_tokens` VALUES ('8aa1dfbd98f98aa01fec881ae8d799e9731b68659bc07ff3376b88a1fb3c0e4f797757a7ffdf237d', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:48:29', '2018-11-21 02:48:29', '2019-11-21 02:48:29');
INSERT INTO `oauth_access_tokens` VALUES ('8af62c10f5fd91288d2b225e8c8671e80e7ed8358e876707255c2ddd8c2881a4318ae920c620752d', '1', '1', 'JzrXZH', '[]', '0', '2018-12-12 03:07:58', '2018-12-12 03:07:58', '2019-12-12 03:07:58');
INSERT INTO `oauth_access_tokens` VALUES ('8b2bbe7f208a4da416a8b8bddaeb876d28b2889c81e163a5aa9defce3670889341eeb163bfe299e3', '1', '1', 'JzrXZH', '[]', '0', '2019-01-22 11:32:47', '2019-01-22 11:32:47', '2020-01-22 11:32:47');
INSERT INTO `oauth_access_tokens` VALUES ('8c77631f629bbb290c18129080c41da1020e322164bf6f8ff2acee72295f9274ffa68bd07ef9da72', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:24:41', '2019-02-08 04:24:41', '2020-02-08 04:24:41');
INSERT INTO `oauth_access_tokens` VALUES ('8d44269a80a32a738f1653a051de4781fcda971e307478dfb96120182598468a8ff5ddf7562fbb79', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:51:13', '2019-02-08 03:51:13', '2020-02-08 03:51:13');
INSERT INTO `oauth_access_tokens` VALUES ('8d6700f8de23c285976324db760de847d4255316416adba165193508ade99c48f0f1b5eae53cdd4c', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:30:03', '2019-02-08 03:30:03', '2020-02-08 03:30:03');
INSERT INTO `oauth_access_tokens` VALUES ('8d8f8a79ae3bd1319aeca3248a9dd2edc72a92c4b66ca4ac7d7a83c83875bb83536a2234a72b56d4', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:39:27', '2019-02-08 03:39:27', '2020-02-08 03:39:27');
INSERT INTO `oauth_access_tokens` VALUES ('8e74a5be51de33563a7f53c2a4512d3f53a0e44fb10c9345a78ee8750817f134ad19d2338b8ee8f2', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:44:02', '2019-02-08 04:44:02', '2020-02-08 04:44:02');
INSERT INTO `oauth_access_tokens` VALUES ('90e3896e369102d8046d1d09599ff3456592f6281b7589069a029193f709df7ee302549fa4711d51', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 07:55:21', '2018-12-05 07:55:21', '2019-12-05 07:55:21');
INSERT INTO `oauth_access_tokens` VALUES ('915a275ea4180913c0c71453e4c3cd80cbf679e8da7df43e17a2be6ab5f502be78a140c388d72d4b', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:01:45', '2018-11-21 03:01:45', '2019-11-21 03:01:45');
INSERT INTO `oauth_access_tokens` VALUES ('917c57ebad003433f24efe299b944ffae6e22c4ef4b3e66f5040df157157bb5aea19b1b57474c5fd', '1', '1', 'JzrXZH', '[]', '0', '2018-12-04 03:36:30', '2018-12-04 03:36:30', '2019-12-04 03:36:30');
INSERT INTO `oauth_access_tokens` VALUES ('92198186819b863ec278f20cce8145da8037b8118b3a82db7a119dd73f9630e6371fae80539b2784', '1', '1', 'JzrXZH', '[]', '0', '2018-12-08 06:27:45', '2018-12-08 06:27:45', '2019-12-08 06:27:45');
INSERT INTO `oauth_access_tokens` VALUES ('93f66f3800e86977ade76b9e560104a0220382045a136fdd6adefb357ec9126f3b89c71e18e9faf2', '1', '1', 'JzrXZH', '[]', '0', '2019-02-10 05:23:29', '2019-02-10 05:23:29', '2020-02-10 05:23:29');
INSERT INTO `oauth_access_tokens` VALUES ('946f0caa12c591668630e4da04d0ee0b681adaa45acd04ae645e0c261510724463b29eed3406e296', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:41:40', '2019-02-08 03:41:40', '2020-02-08 03:41:40');
INSERT INTO `oauth_access_tokens` VALUES ('94fbe803687e96d897518d8f321fb3d63db48276aab7a180a538100597cfb6d3f7dca099893d7b21', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:40:24', '2019-02-08 03:40:24', '2020-02-08 03:40:24');
INSERT INTO `oauth_access_tokens` VALUES ('9518818711a75db242d941e52cda268cca8eed9edd33935003e3a80477901c8bd285dd65f918bf5c', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 07:56:19', '2018-12-05 07:56:19', '2019-12-05 07:56:19');
INSERT INTO `oauth_access_tokens` VALUES ('9554fd0144ccddc040b227b6061eb3ab7d2949f238ad2b789d79f406587a4cf781b70ac707a2b00b', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:27:11', '2018-11-21 02:27:11', '2019-11-21 02:27:11');
INSERT INTO `oauth_access_tokens` VALUES ('96b831eaef8e1f38ea4f025aa5819989ad80a1af0788a716dbe1b488fa2490f1277dd662b3a458d2', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:55:03', '2018-11-21 02:55:03', '2019-11-21 02:55:03');
INSERT INTO `oauth_access_tokens` VALUES ('985a35d9141103a9e53b474dd716d35efd7c20926dcec739846a9362506f03982b09e77f6123a4f6', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 07:55:09', '2018-12-05 07:55:09', '2019-12-05 07:55:09');
INSERT INTO `oauth_access_tokens` VALUES ('98d1a05372604843643b2ca1019f68a5a017ae32f9e73dbab1d0f10c0eb9b52dcadea794f3a5bea9', '1', '1', 'JzrXZH', '[]', '0', '2018-11-23 06:42:17', '2018-11-23 06:42:17', '2019-11-23 06:42:17');
INSERT INTO `oauth_access_tokens` VALUES ('99634c233e74d8db9311f16514d54716b2f86cd7e8004ae01efd4d2a1effcb0b929c667bc6997243', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:21:48', '2019-02-08 03:21:48', '2020-02-08 03:21:48');
INSERT INTO `oauth_access_tokens` VALUES ('9c3f50a7751c01fab3a7343c28e1ad368875fef925d8c60cf767e3c49d20832a1d90594d41ae366f', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:46:23', '2019-02-08 04:46:23', '2020-02-08 04:46:23');
INSERT INTO `oauth_access_tokens` VALUES ('9f0569f2a3ab693f9f13d212579f53697d41375e1276b4b0150c5ec489b0a09a66cf720503f3289a', '1', '1', 'JzrXZH', '[]', '0', '2018-11-22 06:42:12', '2018-11-22 06:42:12', '2019-11-22 06:42:12');
INSERT INTO `oauth_access_tokens` VALUES ('9fc8c9bac1949477ae9f344f0af386e4b9ea7f4985943a6baaae218de34866fa118b8b5a46367dbc', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:07:38', '2018-11-21 02:07:38', '2019-11-21 02:07:38');
INSERT INTO `oauth_access_tokens` VALUES ('a0428422f5264d8dc1fdc6bf3caa52b35c36ea61aa64f36b4b0aed0cdd963f17d87852a67035cee8', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:02:33', '2019-02-08 04:02:33', '2020-02-08 04:02:33');
INSERT INTO `oauth_access_tokens` VALUES ('a080a29fd19e0595b25912124f8e6f84f0b07d46ed05cf06b79aeca84e438bffa786e79a19af6b47', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 00:53:35', '2018-11-26 00:53:35', '2019-11-26 00:53:35');
INSERT INTO `oauth_access_tokens` VALUES ('a4461f4af95596e624f07f0686f02393e4ee720d1e8032279f6a73f9fb9110e6cedad543b9072c35', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:41:01', '2019-02-08 03:41:01', '2020-02-08 03:41:01');
INSERT INTO `oauth_access_tokens` VALUES ('a553988a533500f7b63ed796ce3eee4034295a42632ad91206de29fe6a79800ff6e155a0f8950bb1', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 08:42:32', '2018-11-26 08:42:32', '2019-11-26 08:42:32');
INSERT INTO `oauth_access_tokens` VALUES ('a68c88c16f761e9c521bd880f0c713f50583ca21ccbb8d8d9f5692cacb0ecc7778c8720475d464df', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:54:51', '2019-02-08 03:54:51', '2020-02-08 03:54:51');
INSERT INTO `oauth_access_tokens` VALUES ('a843eaf72b7dd40850610b47757c27e27e414362dec318ca5e483b3656db5f036cd4be8cc40c17c8', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:35:57', '2018-11-21 02:35:57', '2019-11-21 02:35:57');
INSERT INTO `oauth_access_tokens` VALUES ('a8f821e31e8e1f0d23ef8267826f3a6d02669b095826c29350b748f15ad515dd4ca9298da476dfa1', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:40:19', '2019-02-08 04:40:19', '2020-02-08 04:40:19');
INSERT INTO `oauth_access_tokens` VALUES ('a905568a62c4ce8d2f747d0d696ddf90e0fa2f20d5e08264fcfe90fb0ef24e906a80cb586085cd72', '1', '1', 'JzrXZH', '[]', '0', '2019-02-02 15:49:14', '2019-02-02 15:49:14', '2020-02-02 15:49:14');
INSERT INTO `oauth_access_tokens` VALUES ('a99d4ac1cf7795836b31833f00fd326818f9f0a85ca1476f06fd6fbc19cfa581cce420113f1d9b99', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 08:38:15', '2018-11-26 08:38:15', '2019-11-26 08:38:15');
INSERT INTO `oauth_access_tokens` VALUES ('aad051d8fa55ed838c63faf3f7d9a2475f2f988b98de678cc6856059d67065403feda179d016acb9', '1', '1', 'JzrXZH', '[]', '0', '2019-02-01 09:39:04', '2019-02-01 09:39:04', '2020-02-01 09:39:04');
INSERT INTO `oauth_access_tokens` VALUES ('ac1e735afc98a15b291da2f7f0a08eb6623dedf396d9b7aaed6284b71976136487cf33b3f49458c0', '3', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:28:41', '2019-02-10 04:28:41', '2020-02-10 04:28:41');
INSERT INTO `oauth_access_tokens` VALUES ('ae2e7a5a52eeace316636e8845b3f0ae7cd4d3453ba1769cc5d144e17ff277c0311d7cd17ef92d0a', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:43:51', '2019-02-08 03:43:51', '2020-02-08 03:43:51');
INSERT INTO `oauth_access_tokens` VALUES ('af2cd295ca91f324518530ea6d7c36bf5965a3938daf293de05e38330e4bd1749c01a4a0e3ae0ffe', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:47:23', '2018-11-21 02:47:23', '2019-11-21 02:47:23');
INSERT INTO `oauth_access_tokens` VALUES ('b2ff1254609e946a1470a4c607d2090c7d4f004a7d216cc7fde091feffa160458a248f6b2608e698', '1', '1', 'JzrXZH', '[]', '0', '2019-02-02 10:17:55', '2019-02-02 10:17:55', '2020-02-02 10:17:55');
INSERT INTO `oauth_access_tokens` VALUES ('b31393041c502cfef1c323f46b0085dcc3f51a142c6c11d34994a4d0d88e3925da5a751d5f9e1fe1', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:55:50', '2018-11-21 02:55:50', '2019-11-21 02:55:50');
INSERT INTO `oauth_access_tokens` VALUES ('b7616813810347b5ea487d083a843ed8538828792b308b760f6bf3a44fd80e2f24a8be088bbcd792', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:35:11', '2019-02-08 03:35:11', '2020-02-08 03:35:11');
INSERT INTO `oauth_access_tokens` VALUES ('b9cb85bdd021fd41b25d6590c5cf219e2fe4d48346b775a42687d34f6098fa070b084637e719896b', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:56:21', '2018-11-21 02:56:21', '2019-11-21 02:56:21');
INSERT INTO `oauth_access_tokens` VALUES ('bdb08836d1e705c8a0584347a9c7b18ba2db2937c1fb567f9c139e2c23900317162de7e7b9d9dff7', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:24:12', '2018-11-21 09:24:12', '2019-11-21 09:24:12');
INSERT INTO `oauth_access_tokens` VALUES ('bf295884f95026a8a4ebc0dddef60f84d10a838b08f41606660e0e78e953020345be9d9726b4c392', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:09:02', '2018-11-21 02:09:02', '2019-11-21 02:09:02');
INSERT INTO `oauth_access_tokens` VALUES ('c1cbeba263624f7d52b7754b1cc508a54b795239e479938a2928f0a697d6c726f1a3cd3c193d6b29', '1', '1', 'JzrXZH', '[]', '0', '2019-01-24 12:55:20', '2019-01-24 12:55:20', '2020-01-24 12:55:20');
INSERT INTO `oauth_access_tokens` VALUES ('cb05004e6b3544733cb596a0307c7fe9e82fbd52369b6e0c7f478ca11041eef177fb8af61f18c9f0', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:45:48', '2018-11-21 02:45:48', '2019-11-21 02:45:48');
INSERT INTO `oauth_access_tokens` VALUES ('cd13d73ba89417d6db635bafe9a62b6ed23c2b51c38f98d17def8f973ea3327d82458dd04375e50b', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:09:01', '2018-11-21 09:09:01', '2019-11-21 09:09:01');
INSERT INTO `oauth_access_tokens` VALUES ('cde4963664c2e0c84ffa388ed4dd9f792da63e89d3512228e7a13e87c416ac4566b5dfa7e8a3fb99', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:26:37', '2019-02-08 03:26:37', '2020-02-08 03:26:37');
INSERT INTO `oauth_access_tokens` VALUES ('cefdea9ea28b8a88f3fdd5c2e5601572e95f168e79af571090c350ae5a4e31e3ad3b8796603256e3', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:40:28', '2019-02-08 04:40:28', '2020-02-08 04:40:28');
INSERT INTO `oauth_access_tokens` VALUES ('d03d0625b263b2177a6e5e88fff793c9afb018f0c8dd326a14e167217555d8fe05bc73f46f1f3788', '1', '1', 'JzrXZH', '[]', '0', '2019-02-12 07:41:51', '2019-02-12 07:41:51', '2020-02-12 07:41:51');
INSERT INTO `oauth_access_tokens` VALUES ('d0f592ad724d68a338b57b298e272c1fabae093414bb79b1c8469ba62324cd69539460f0df8de3b0', '1', '1', 'JzrXZH', '[]', '0', '2018-12-05 07:56:31', '2018-12-05 07:56:31', '2019-12-05 07:56:31');
INSERT INTO `oauth_access_tokens` VALUES ('d1dd4e5e04e07b879127f5e4e2930d41eb38bb5ebd8e41709ea65dedc4aa1a0ab3d194d39c7b1e67', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:49:01', '2019-02-08 03:49:01', '2020-02-08 03:49:01');
INSERT INTO `oauth_access_tokens` VALUES ('d47e3d465eb5337df1729031982b40a9a4dadf5b4740e04bcb36f6bf2f6000c2de24fd8c3a0fb6c4', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:50:51', '2019-02-08 04:50:51', '2020-02-08 04:50:51');
INSERT INTO `oauth_access_tokens` VALUES ('d49bbb1a0fbebd04cb931950b0e63d75c02ebed1b19930c76ffd67f7d8770cdf2f488b49eb537695', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:17:42', '2018-11-21 03:17:42', '2019-11-21 03:17:42');
INSERT INTO `oauth_access_tokens` VALUES ('d4b137b8e37e3bd063c3a2e4649d0ebc0c7ae9b8b3935f579f9d0f2a2adbe85854e9f12a4ce1b325', '1', '1', 'JzrXZH', '[]', '0', '2018-11-20 08:30:45', '2018-11-20 08:30:45', '2019-11-20 08:30:45');
INSERT INTO `oauth_access_tokens` VALUES ('d6e431d23f91b9c9c9668781d91a043e1bee52907f7b23c04ff4ab5e92eac850381bf7c68e035733', '2', '1', 'JzrXZH', '[]', '0', '2019-02-08 04:38:02', '2019-02-08 04:38:02', '2020-02-08 04:38:02');
INSERT INTO `oauth_access_tokens` VALUES ('da0b90083f19ebbb24a14b22966514c233617c0b0615d5888ba3c1770db61fc243c8542440462261', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:56:50', '2018-11-21 02:56:50', '2019-11-21 02:56:50');
INSERT INTO `oauth_access_tokens` VALUES ('dc18f597c34b8edae27dea908c75ced59129ae3ae1fcd8e2eecb076d9aca7db1fb718fa78cabd941', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:09:52', '2018-11-21 09:09:52', '2019-11-21 09:09:52');
INSERT INTO `oauth_access_tokens` VALUES ('df4afa6c68e685cc70d5f075e60b9b261452c9cc32accb12b1bd9e00d0037d58dbaee0d090d88837', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:08:04', '2018-11-21 02:08:04', '2019-11-21 02:08:04');
INSERT INTO `oauth_access_tokens` VALUES ('e0bbe122ec7f9265173bd102cb6d98ddf55c2772407a113cbc2d6e5a673059266fec4b7db138a968', '1', '1', 'JzrXZH', '[]', '0', '2019-02-07 04:56:47', '2019-02-07 04:56:47', '2020-02-07 04:56:47');
INSERT INTO `oauth_access_tokens` VALUES ('e12a53ba335ccba749b71f284c77f6e54fb05b735d94571dc030f023e0df8d05c5d303dbc5cfa3e9', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:54:36', '2019-02-08 03:54:36', '2020-02-08 03:54:36');
INSERT INTO `oauth_access_tokens` VALUES ('e271d997a2560f5c363d23c0737a06d5724230ecd61e03d9d5afed5cd3baa8b91df3e70a2d1e98a5', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:55:34', '2019-02-08 03:55:34', '2020-02-08 03:55:34');
INSERT INTO `oauth_access_tokens` VALUES ('e2ef1f45ef787fdf4bc8e72c946505768bb5b857e9ca762522430c0ffd40fa360e9de77e27853a9b', '1', '4', 'JzrXZH', '[]', '0', '2019-02-12 11:33:58', '2019-02-12 11:33:58', '2020-02-12 11:33:58');
INSERT INTO `oauth_access_tokens` VALUES ('e373adb975a40678d9344a9555182767ede5ed862e955b62e107792ac4f53b20077693112867742d', '1', '1', 'JzrXZH', '[]', '0', '2019-01-22 12:30:05', '2019-01-22 12:30:05', '2020-01-22 12:30:05');
INSERT INTO `oauth_access_tokens` VALUES ('e45fc098ac34959a72361641596756329b0dea219743393715ed776ec4ed6326cb0fc54cd9cfd4c5', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:12:53', '2018-11-21 02:12:53', '2019-11-21 02:12:53');
INSERT INTO `oauth_access_tokens` VALUES ('e9c115b6b720d6e0c5a694e799a6d516c2909c68c3f400fdfc54bea127ab02e47abe4614967cd428', '3', '1', 'JzrXZH', '[]', '0', '2019-02-10 04:31:38', '2019-02-10 04:31:38', '2020-02-10 04:31:38');
INSERT INTO `oauth_access_tokens` VALUES ('e9ea52c71cfcde546f57a4ad619ffd51553c92550ec66009f37cfc30f4bba80b5722128aa72967a1', '1', '1', 'JzrXZH', '[]', '0', '2019-02-08 03:40:01', '2019-02-08 03:40:01', '2020-02-08 03:40:01');
INSERT INTO `oauth_access_tokens` VALUES ('ebabe60603656e443147edbd206c7e6ec48bfeeccd26e4f359eeaac7a693f70481d24962050ecc11', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:11:28', '2018-11-21 02:11:28', '2019-11-21 02:11:28');
INSERT INTO `oauth_access_tokens` VALUES ('ed7f266834ec21cf1144d3cb81b555ae72b1d84fe1a5b746972d69d80b9f9bb69e797522dfd61b43', '1', '1', 'JzrXZH', '[]', '0', '2018-12-08 06:21:48', '2018-12-08 06:21:48', '2019-12-08 06:21:48');
INSERT INTO `oauth_access_tokens` VALUES ('ee360403a02bc4ed27f13759cef35fabb6c60e79c3f5bba2ac842e5fd44d44db33d3e7ff64e9111e', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:12:14', '2018-11-21 02:12:14', '2019-11-21 02:12:14');
INSERT INTO `oauth_access_tokens` VALUES ('ee3a381f3c2d44f1f512b832f2f4e9df6ae3e6125d4b605f0771f297aaac26e5c99f1c4b7e2442e1', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:11:44', '2018-11-21 02:11:44', '2019-11-21 02:11:44');
INSERT INTO `oauth_access_tokens` VALUES ('eea5d00985b6f7022cadb17f66116dc3ead85b3ef4cf33e74aeeaa22977a4976224ef10f5d52a669', '1', '1', 'JzrXZH', '[]', '0', '2018-12-07 07:42:20', '2018-12-07 07:42:20', '2019-12-07 07:42:20');
INSERT INTO `oauth_access_tokens` VALUES ('eec44a17d448be59427d270e2a9282cfe6e4a9c3869b4f0f008a0962e439bf4a486adea472aa0adf', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:29:06', '2018-11-21 02:29:06', '2019-11-21 02:29:06');
INSERT INTO `oauth_access_tokens` VALUES ('f0f90fee6c7e6ce3664438360a83c7fb7abf5f8823c5cf42d1b16bb5fd0dec54f29ce10e7a84c5ad', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:04:18', '2018-11-21 03:04:18', '2019-11-21 03:04:18');
INSERT INTO `oauth_access_tokens` VALUES ('f39cd4ed6a9add4d21e8efea6e227b6a690754eeed261de4ffc8e31a1b1f2a427bf091b319d00634', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 09:28:29', '2018-11-21 09:28:29', '2019-11-21 09:28:29');
INSERT INTO `oauth_access_tokens` VALUES ('f8d82bd50c4f867e2a87430704653c743e02002515f5efbb14cffc98cd4b783b404796f06af59dd3', '1', '1', 'JzrXZH', '[]', '0', '2018-12-12 01:54:14', '2018-12-12 01:54:14', '2019-12-12 01:54:14');
INSERT INTO `oauth_access_tokens` VALUES ('fa86e2b8206bc8047d76db169accf84a8b0687b866dfe2ff16e7d871ae69c5c3b81be617d5e2bfc2', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:10:29', '2018-11-21 02:10:29', '2019-11-21 02:10:29');
INSERT INTO `oauth_access_tokens` VALUES ('fbd6bae7a6435339f337e25d7901cc431dd5ce64992100f739b82c159b0a9e64c211db44da29e431', '1', '1', 'JzrXZH', '[]', '0', '2019-01-28 01:06:08', '2019-01-28 01:06:08', '2020-01-28 01:06:08');
INSERT INTO `oauth_access_tokens` VALUES ('fd088e1ef86fe9dc3c8237e6f70e3318ce6b212a4a5908376e8aee8b5bc909ffa8c1350635b4697a', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 03:01:04', '2018-11-21 03:01:04', '2019-11-21 03:01:04');
INSERT INTO `oauth_access_tokens` VALUES ('fdba687b76d360cf9eeff486a0b4e5b2e7ce9126a2e8506aa3498a43c25dd44a1f7bd2eff85a1e01', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:25:39', '2018-11-21 02:25:39', '2019-11-21 02:25:39');
INSERT INTO `oauth_access_tokens` VALUES ('fdca040e06cb4b3df8ebc9e589a90e176f0eb39af4396d9b9a12a8373da233618aaa3df5845bb261', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:23:50', '2018-11-21 02:23:50', '2019-11-21 02:23:50');
INSERT INTO `oauth_access_tokens` VALUES ('fdd7a7c961acf6f01cb326ea91aebeba44cc26b253eab59f6a9f94ca3e34e5785eb53d9528c9d879', '1', '1', 'JzrXZH', '[]', '0', '2018-11-26 08:38:48', '2018-11-26 08:38:48', '2019-11-26 08:38:48');
INSERT INTO `oauth_access_tokens` VALUES ('fe03ea23ba89df1aae9f700f4fe8419ae9e5f5602e2573ece45216a14a42b727e1795f542dd71ba4', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:18:00', '2018-11-21 02:18:00', '2019-11-21 02:18:00');
INSERT INTO `oauth_access_tokens` VALUES ('feda197a01ee8346469b34913991bfa9e1f5b29005574635df45c733a0e91955e710db01c32d96d2', '1', '1', 'JzrXZH', '[]', '0', '2019-02-04 11:21:04', '2019-02-04 11:21:04', '2020-02-04 11:21:04');
INSERT INTO `oauth_access_tokens` VALUES ('ffefb6a272b5e1d8593bf488053bdf2d948ce550a7f6817e7f4823ce14224d793a76caa701b85ef6', '1', '1', 'JzrXZH', '[]', '0', '2018-11-21 02:12:41', '2018-11-21 02:12:41', '2019-11-21 02:12:41');

-- ----------------------------
-- Table structure for oauth_auth_codes
-- ----------------------------
DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of oauth_auth_codes
-- ----------------------------

-- ----------------------------
-- Table structure for oauth_clients
-- ----------------------------
DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE `oauth_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of oauth_clients
-- ----------------------------
INSERT INTO `oauth_clients` VALUES ('1', null, 'Laravel Personal Access Client', 'w8vy7v5JZHMoJll4npLUtZJYOAf2YOJQ5JG2nmOM', 'http://localhost', '1', '0', '0', '2018-11-20 05:58:33', '2018-11-20 05:58:33');
INSERT INTO `oauth_clients` VALUES ('2', null, 'Laravel Password Grant Client', '24d5kW8p8Lgl4YZVX9OXvF8jD4wkxcgUT14CGzLX', 'http://localhost', '0', '1', '0', '2018-11-20 05:58:33', '2018-11-20 05:58:33');
INSERT INTO `oauth_clients` VALUES ('3', null, 't', 'fiRmSzbZZ66SwkGbtamHbNejPLJ4VHi24TvxE6Pe', 'http://localhost/auth/callback', '0', '0', '0', '2018-11-20 05:59:27', '2018-11-20 05:59:27');
INSERT INTO `oauth_clients` VALUES ('4', null, 'Laravel Personal Access Client', 'feoI5T2QRxAk47f0gGiwYc2rCo2EDXqrVm22WtQi', 'http://localhost', '1', '0', '0', '2019-02-12 11:10:25', '2019-02-12 11:10:25');
INSERT INTO `oauth_clients` VALUES ('5', null, 'Laravel Password Grant Client', 'Sdalsaqatp7oijBwEbqWycUfI4un7XGOqabGpkjC', 'http://localhost', '0', '1', '0', '2019-02-12 11:10:25', '2019-02-12 11:10:25');

-- ----------------------------
-- Table structure for oauth_personal_access_clients
-- ----------------------------
DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of oauth_personal_access_clients
-- ----------------------------
INSERT INTO `oauth_personal_access_clients` VALUES ('1', '1', '2018-11-20 05:58:33', '2018-11-20 05:58:33');
INSERT INTO `oauth_personal_access_clients` VALUES ('2', '4', '2019-02-12 11:10:25', '2019-02-12 11:10:25');

-- ----------------------------
-- Table structure for oauth_refresh_tokens
-- ----------------------------
DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of oauth_refresh_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '公司名称',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '留言人',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '联系电话',
  `status` int(11) NOT NULL COMMENT '处理状态',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '父类id',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '说明内容',
  `lv` int(11) NOT NULL DEFAULT '0' COMMENT '层级',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of products
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '角色描述',
  `sort` smallint(6) NOT NULL DEFAULT '1000' COMMENT '排序',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '状态：{0：禁用，1：正常}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('1', '超管', '系统超级管理员默认拥有所有权限', '1000', '1', '2018-11-26 09:42:57', '2018-12-04 03:49:48');
INSERT INTO `roles` VALUES ('2', '运营', '基础运营权限', '1000', '1', '2019-02-08 03:16:04', '2019-02-08 03:16:04');

-- ----------------------------
-- Table structure for role_and_auth
-- ----------------------------
DROP TABLE IF EXISTS `role_and_auth`;
CREATE TABLE `role_and_auth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `auth_id` int(10) unsigned NOT NULL COMMENT '权限ID',
  `extented` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限扩展配置',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `page` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '该权限是属于哪个菜单页面的',
  `state` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=423 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of role_and_auth
-- ----------------------------
INSERT INTO `role_and_auth` VALUES ('393', '2', '23', '[]', null, null, 'config', '1');
INSERT INTO `role_and_auth` VALUES ('394', '2', '5', '[\"add\",\"edit\",\"delete\",\"url\"]', null, null, 'article_list', '1');
INSERT INTO `role_and_auth` VALUES ('395', '2', '6', '[\"add\",\"edit\",\"delete\"]', null, null, 'recovery', '1');
INSERT INTO `role_and_auth` VALUES ('396', '2', '8', '[]', null, null, 'publish_article', '1');
INSERT INTO `role_and_auth` VALUES ('397', '2', '25', '[\"add\",\"edit\",\"delete\"]', null, null, 'url', '1');
INSERT INTO `role_and_auth` VALUES ('398', '2', '24', '[]', null, null, 'article_edit', '1');
INSERT INTO `role_and_auth` VALUES ('399', '2', '13', '[\"show\",\"search\",\"delete\"]', null, null, 'goods_order', '1');
INSERT INTO `role_and_auth` VALUES ('400', '2', '27', '[\"recovery\",\"delete\"]', null, null, 'recoveryOrder', '1');
INSERT INTO `role_and_auth` VALUES ('401', '2', '18', '[\"extension\"]', null, null, 'goods_list', '1');
INSERT INTO `role_and_auth` VALUES ('402', '1', '1', '[\"add\",\"edit\",\"delete\"]', null, null, 'menu', '1');
INSERT INTO `role_and_auth` VALUES ('403', '1', '22', '[]', null, null, 'visit', '1');
INSERT INTO `role_and_auth` VALUES ('404', '1', '23', '[]', null, null, 'config', '1');
INSERT INTO `role_and_auth` VALUES ('405', '1', '2', '[\"add\",\"edit\",\"delete\"]', null, null, 'role', '1');
INSERT INTO `role_and_auth` VALUES ('406', '1', '3', '[\"add\",\"edit\",\"delete\",\"disable\",\"userGiveRole\",\"editUserRole\"]', null, null, 'user', '1');
INSERT INTO `role_and_auth` VALUES ('407', '1', '4', '[\"add\",\"edit\",\"delete\"]', null, null, 'auth', '1');
INSERT INTO `role_and_auth` VALUES ('408', '1', '5', '[\"add\",\"edit\",\"delete\",\"url\"]', null, null, 'article_list', '1');
INSERT INTO `role_and_auth` VALUES ('409', '1', '6', '[\"add\",\"edit\",\"delete\"]', null, null, 'recovery', '1');
INSERT INTO `role_and_auth` VALUES ('410', '1', '8', '[]', null, null, 'publish_article', '1');
INSERT INTO `role_and_auth` VALUES ('411', '1', '25', '[\"add\",\"edit\",\"delete\"]', null, null, 'url', '1');
INSERT INTO `role_and_auth` VALUES ('412', '1', '24', '[]', null, null, 'article_edit', '1');
INSERT INTO `role_and_auth` VALUES ('413', '1', '12', '[\"add\",\"edit\",\"delete\"]', null, null, 'source_count', '1');
INSERT INTO `role_and_auth` VALUES ('414', '1', '13', '[\"show\",\"search\",\"delete\"]', null, null, 'goods_order', '1');
INSERT INTO `role_and_auth` VALUES ('415', '1', '14', '[\"add\",\"edit\",\"delete\"]', null, null, 'zh_count', '1');
INSERT INTO `role_and_auth` VALUES ('416', '1', '15', '[\"add\",\"edit\",\"delete\"]', null, null, 'staff_count', '1');
INSERT INTO `role_and_auth` VALUES ('417', '1', '17', '[\"add\",\"edit\",\"delete\"]', null, null, 'source', '1');
INSERT INTO `role_and_auth` VALUES ('418', '1', '27', '[\"recovery\",\"delete\"]', null, null, 'recoveryOrder', '1');
INSERT INTO `role_and_auth` VALUES ('419', '1', '18', '[\"add\",\"edit\",\"delete\",\"extension\"]', null, null, 'goods_list', '1');
INSERT INTO `role_and_auth` VALUES ('420', '1', '19', '[\"add\",\"edit\",\"delete\"]', null, null, 'publish_goods', '1');
INSERT INTO `role_and_auth` VALUES ('421', '1', '20', '[\"add\",\"edit\",\"delete\"]', null, null, 'template', '1');
INSERT INTO `role_and_auth` VALUES ('422', '1', '26', '[]', null, null, 'edit_goods', '1');

-- ----------------------------
-- Table structure for sizes
-- ----------------------------
DROP TABLE IF EXISTS `sizes`;
CREATE TABLE `sizes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `size_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '尺码名称',
  `goods_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '套餐对应的商品Id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of sizes
-- ----------------------------

-- ----------------------------
-- Table structure for sources
-- ----------------------------
DROP TABLE IF EXISTS `sources`;
CREATE TABLE `sources` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '来源名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of sources
-- ----------------------------
INSERT INTO `sources` VALUES ('1', 'ALG');

-- ----------------------------
-- Table structure for source_urls
-- ----------------------------
DROP TABLE IF EXISTS `source_urls`;
CREATE TABLE `source_urls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '商品Id',
  `source_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品的推广渠道',
  `source_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '商品的来源地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of source_urls
-- ----------------------------
INSERT INTO `source_urls` VALUES ('1', '2', 'ALG', 'http://www.wx.com/ZW5jcnlwdDItQUxHLTF6dHM=');

-- ----------------------------
-- Table structure for s_e_os
-- ----------------------------
DROP TABLE IF EXISTS `s_e_os`;
CREATE TABLE `s_e_os` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of s_e_os
-- ----------------------------

-- ----------------------------
-- Table structure for urls
-- ----------------------------
DROP TABLE IF EXISTS `urls`;
CREATE TABLE `urls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '谁添加的',
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'url链接',
  `type` tinyint(4) NOT NULL COMMENT '类型 0 A链接 1 B链接',
  `click` int(11) DEFAULT '0',
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of urls
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户密码',
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号码',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '用户头像',
  `sex` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户性别:{0:未填写,1:男,2:女}',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '用户类型：{0:管理员，1:普通用户}',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '用户状态：{0:禁用,1:正常}',
  `options` text COLLATE utf8mb4_unicode_ci COMMENT '个人信息配置',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '记住密码',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_mobile_unique` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'ALG', '$2y$10$pmF42Zhx.Lxk6OCdEXvgmOHgXkzDAm80w/JAZhbZJAYdoa3FumtSi', '13686840083', '513051043@qq.com', 'https://qudongit.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720181120143701.jpg', '1', '0', '1', '', null, '2018-11-26 09:42:57', '2019-02-07 06:29:45', null);

-- ----------------------------
-- Table structure for user_and_role
-- ----------------------------
DROP TABLE IF EXISTS `user_and_role`;
CREATE TABLE `user_and_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL COMMENT '角色ID',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户ID',
  `role_name` int(11) DEFAULT NULL COMMENT '角色名称',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user_and_role
-- ----------------------------
INSERT INTO `user_and_role` VALUES ('1', '1', '1', null, '2018-11-26 09:42:57', '2018-11-26 09:42:57');

-- ----------------------------
-- Table structure for visit_logs
-- ----------------------------
DROP TABLE IF EXISTS `visit_logs`;
CREATE TABLE `visit_logs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ip地址',
  `system_type` text COLLATE utf8mb4_unicode_ci COMMENT '系统及其型号',
  `event` text COLLATE utf8mb4_unicode_ci COMMENT '触发事件',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of visit_logs
-- ----------------------------
