# nodejs-blog
NodeJS Blog 


#Database

![database here](https://i.ibb.co/6PDzsxV/Screenshot-4.png)
## Posts Table database

CREATE TABLE `nodejsblog`.`posts` (
`id` INT NOT NULL AUTO_INCREMENT,
`title` VARCHAR(255) NOT NULL,
`content` MEDIUMTEXT NULL,
`author` VARCHAR(255) NULL,
`created_at` DATETIME NULL,
`updated_at` DATETIME NULL,
PRIMARY KEY (`id`));
