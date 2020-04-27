-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema viva_rdc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema viva_rdc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `viva_rdc` DEFAULT CHARACTER SET utf8 ;
USE `viva_rdc` ;

-- -----------------------------------------------------
-- Table `viva_rdc`.`citoyens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`citoyens` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`citoyens` (
  `citoyenId` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `postnom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `age` INT NULL,
  `sexe` CHAR(1) NULL,
  PRIMARY KEY (`citoyenId`),
  UNIQUE INDEX `idCitoyen_UNIQUE` (`citoyenId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`positions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`positions` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`positions` (
  `positionId` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `longitude` DOUBLE NULL,
  `laltitude` DOUBLE NULL,
  `date` TIMESTAMP NULL,
  `citoyenId` INT NOT NULL,
  PRIMARY KEY (`positionId`),
  INDEX `fk_positions_citoyens_idx` (`citoyenId` ASC) VISIBLE,
  CONSTRAINT `fk_positions_citoyens`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`hopitaux`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`hopitaux` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`hopitaux` (
  `hopitalId` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  PRIMARY KEY (`hopitalId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`agents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`agents` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`agents` (
  `agentId` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `postnom` VARCHAR(20) NULL,
  `prenom` VARCHAR(45) NULL,
  PRIMARY KEY (`agentId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`adresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`adresses` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`adresses` (
  `adresseId` INT NOT NULL AUTO_INCREMENT,
  `province` VARCHAR(45) NULL,
  `ville` VARCHAR(45) NULL,
  `commune` VARCHAR(45) NULL,
  `quartier` VARCHAR(45) NULL,
  `avenue` VARCHAR(45) NULL,
  `numero` INT NULL,
  `citoyenId` INT NOT NULL,
  `hopitalId` INT NOT NULL,
  `agentId` INT NOT NULL,
  PRIMARY KEY (`adresseId`),
  INDEX `fk_adresses_citoyens1_idx` (`citoyenId` ASC) VISIBLE,
  INDEX `fk_adresses_hoptaux1_idx` (`hopitalId` ASC) VISIBLE,
  INDEX `fk_adresses_AgentMinistere1_idx` (`agentId` ASC) VISIBLE,
  CONSTRAINT `fk_adresses_citoyens1`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_adresses_hoptaux1`
    FOREIGN KEY (`hopitalId`)
    REFERENCES `viva_rdc`.`hopitaux` (`hopitalId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_adresses_AgentMinistere1`
    FOREIGN KEY (`agentId`)
    REFERENCES `viva_rdc`.`agents` (`agentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`medecins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`medecins` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`medecins` (
  `medecinId` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NULL,
  `postnom` VARCHAR(45) NULL,
  `prenom` VARCHAR(45) NULL,
  `hopitalId` INT NOT NULL,
  PRIMARY KEY (`medecinId`),
  INDEX `fk_medecins_hoptaux1_idx` (`hopitalId` ASC) VISIBLE,
  UNIQUE INDEX `medecinId_UNIQUE` (`medecinId` ASC) VISIBLE,
  CONSTRAINT `fk_medecins_hoptaux1`
    FOREIGN KEY (`hopitalId`)
    REFERENCES `viva_rdc`.`hopitaux` (`hopitalId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`contacts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`contacts` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`contacts` (
  `contactId` INT NOT NULL,
  `numero` INT NULL,
  `email` INT NULL,
  `citoyenId` INT NOT NULL,
  `agentId` INT NOT NULL,
  `medecinId` INT NOT NULL,
  PRIMARY KEY (`contactId`),
  INDEX `fk_contacts_citoyens1_idx` (`citoyenId` ASC) VISIBLE,
  INDEX `fk_contacts_AgentMinistere1_idx` (`agentId` ASC) VISIBLE,
  INDEX `fk_contacts_medecins1_idx` (`medecinId` ASC) VISIBLE,
  CONSTRAINT `fk_contacts_citoyens1`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_AgentMinistere1`
    FOREIGN KEY (`agentId`)
    REFERENCES `viva_rdc`.`agents` (`agentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contacts_medecins1`
    FOREIGN KEY (`medecinId`)
    REFERENCES `viva_rdc`.`medecins` (`medecinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`questions` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`questions` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
  `questionnaire` VARCHAR(45) NULL,
  `citoyens_citoyenId` INT NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE INDEX `questionId_UNIQUE` (`questionId` ASC) VISIBLE,
  INDEX `fk_questions_citoyens2_idx` (`citoyens_citoyenId` ASC) VISIBLE,
  CONSTRAINT `fk_questions_citoyens2`
    FOREIGN KEY (`citoyens_citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`users` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `citoyenId` INT NOT NULL,
  `agentId` INT NOT NULL,
  `medicinId` INT NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `idUsers_UNIQUE` (`userId` ASC) VISIBLE,
  INDEX `agentId_idx` (`agentId` ASC) VISIBLE,
  INDEX `citoyenId_idx` (`citoyenId` ASC) VISIBLE,
  INDEX `medecinId_idx` (`medicinId` ASC) VISIBLE,
  CONSTRAINT `citoyenId`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `agentId`
    FOREIGN KEY (`agentId`)
    REFERENCES `viva_rdc`.`agents` (`agentId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `medecinId`
    FOREIGN KEY (`medicinId`)
    REFERENCES `viva_rdc`.`medecins` (`medecinId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`messages` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`messages` (
  `messageId` INT NOT NULL AUTO_INCREMENT,
  `msg` TEXT NULL,
  `date` INT NULL,
  `type` VARCHAR(45) NULL,
  `citoyenId` INT NULL,
  `agentId` INT NULL,
  `medecinId` INT NULL,
  PRIMARY KEY (`messageId`),
  INDEX `fk_messages_citoyens1_idx` (`citoyenId` ASC) VISIBLE,
  INDEX `fk_messages_AgentMinistere1_idx` (`agentId` ASC) VISIBLE,
  INDEX `fk_messages_medecins1_idx` (`medecinId` ASC) VISIBLE,
  CONSTRAINT `fk_messages_citoyens1`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_AgentMinistere1`
    FOREIGN KEY (`agentId`)
    REFERENCES `viva_rdc`.`agents` (`agentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_medecins1`
    FOREIGN KEY (`medecinId`)
    REFERENCES `viva_rdc`.`medecins` (`medecinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`nouveauxcas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`nouveauxcas` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`nouveauxcas` (
  `nouveaucasId` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`nouveaucasId`),
  UNIQUE INDEX `nouvauxcasId_UNIQUE` (`nouveaucasId` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`cas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`cas` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`cas` (
  `casId` INT NOT NULL AUTO_INCREMENT,
  `citoyenId` INT NULL,
  `medecinId` INT NULL,
  `etat` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`casId`),
  UNIQUE INDEX `casid_UNIQUE` (`casId` ASC) VISIBLE,
  INDEX `fk_cas_citoyens1_idx` (`citoyenId` ASC) VISIBLE,
  INDEX `fk_cas_medecins1_idx` (`medecinId` ASC) VISIBLE,
  CONSTRAINT `fk_cas_citoyens1`
    FOREIGN KEY (`citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cas_medecins1`
    FOREIGN KEY (`medecinId`)
    REFERENCES `viva_rdc`.`medecins` (`medecinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`questions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`questions` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`questions` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
  `questionnaire` VARCHAR(45) NULL,
  `citoyens_citoyenId` INT NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE INDEX `questionId_UNIQUE` (`questionId` ASC) VISIBLE,
  INDEX `fk_questions_citoyens2_idx` (`citoyens_citoyenId` ASC) VISIBLE,
  CONSTRAINT `fk_questions_citoyens2`
    FOREIGN KEY (`citoyens_citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `viva_rdc`.`resultats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `viva_rdc`.`resultats` ;

CREATE TABLE IF NOT EXISTS `viva_rdc`.`resultats` (
  `resultatId` INT NOT NULL AUTO_INCREMENT,
  `questions_questionId` INT NOT NULL,
  `citoyens_citoyenId` INT NOT NULL,
  PRIMARY KEY (`resultatId`),
  UNIQUE INDEX `resultatId_UNIQUE` (`resultatId` ASC) VISIBLE,
  INDEX `fk_resultats_questions1_idx` (`questions_questionId` ASC) VISIBLE,
  INDEX `fk_resultats_citoyens1_idx` (`citoyens_citoyenId` ASC) VISIBLE,
  CONSTRAINT `fk_resultats_questions1`
    FOREIGN KEY (`questions_questionId`)
    REFERENCES `viva_rdc`.`questions` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resultats_citoyens1`
    FOREIGN KEY (`citoyens_citoyenId`)
    REFERENCES `viva_rdc`.`citoyens` (`citoyenId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
