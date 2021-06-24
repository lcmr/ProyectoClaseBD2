-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bases2
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bases2` ;

-- -----------------------------------------------------
-- Schema bases2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bases2` DEFAULT CHARACTER SET utf8 ;
USE `bases2` ;

-- -----------------------------------------------------
-- Table `bases2`.`banco`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bases2`.`banco` ;

CREATE TABLE IF NOT EXISTS `bases2`.`banco` (
  `idBanco` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idBanco`))
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bases2`.`detallefinanciero`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bases2`.`detallefinanciero` ;

CREATE TABLE IF NOT EXISTS `bases2`.`detallefinanciero` (
  `idDetalleFinanciero` INT NOT NULL AUTO_INCREMENT,
  `Activo` DECIMAL(18,4) NULL DEFAULT NULL,
  `Pasivo` DECIMAL(18,4) NULL DEFAULT NULL,
  `Capital` DECIMAL(18,4) NULL DEFAULT NULL,
  `idBanco` INT NOT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idDetalleFinanciero`),
  INDEX `fk_DetalleFinanciero_Banco_idx` (`idBanco` ASC) VISIBLE,
  CONSTRAINT `fk_DetalleFinanciero_Banco`
    FOREIGN KEY (`idBanco`)
    REFERENCES `bases2`.`banco` (`idBanco`))
ENGINE = InnoDB
AUTO_INCREMENT = 275
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bases2`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bases2`.`usuario` ;

CREATE TABLE IF NOT EXISTS `bases2`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NULL DEFAULT NULL,
  `password` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

USE `bases2` ;

-- -----------------------------------------------------
-- Placeholder table for view `bases2`.`rankingbancos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bases2`.`rankingbancos` (`nombre` INT, `Activo` INT, `fecha` INT);

-- -----------------------------------------------------
-- View `bases2`.`rankingbancos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bases2`.`rankingbancos`;
DROP VIEW IF EXISTS `bases2`.`rankingbancos` ;
USE `bases2`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bases2`.`rankingbancos` AS select `b`.`nombre` AS `nombre`,(`d`.`Pasivo` + `d`.`Capital`) AS `Activo`,`d`.`fecha` AS `fecha` from (`bases2`.`detallefinanciero` `d` join `bases2`.`banco` `b` on((`d`.`idBanco` = `b`.`idBanco`))) group by `b`.`nombre`,`d`.`fecha` order by `d`.`fecha`,`Activo` desc;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
