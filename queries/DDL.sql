SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS ProducedMaterials;
DROP TABLE IF EXISTS NaturalResources;
DROP TABLE IF EXISTS Planets;
DROP TABLE IF EXISTS Materials;
DROP TABLE IF EXISTS StarSystems;
DROP TABLE IF EXISTS StarTypes;
DROP TABLE IF EXISTS Ships;
DROP TABLE IF EXISTS Nations;

-- Table Creations

CREATE TABLE Nations (
	nationID INT AUTO_INCREMENT UNIQUE NOT NULL,
    nationName VARCHAR(255) NOT NULL,
    conquestsQuantity int,
    shipQuantity int DEFAULT 0,
    PRIMARY KEY (nationID)
);

CREATE TABLE Ships (
	shipID INT AUTO_INCREMENT NOT NULL,
    nationID INT NOT NULL,
    name VARCHAR(255),
    speed DECIMAL(3,2),
    capacity INT,
    PRIMARY KEY (shipID),
    FOREIGN KEY (nationID) REFERENCES Nations(nationID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE StarTypes (
	starID INT AUTO_INCREMENT,
	starType VARCHAR(255),
    PRIMARY KEY (starID)
);

CREATE TABLE StarSystems (
	systemID INT AUTO_INCREMENT NOT NULL,
    distance decimal(16, 2) NOT NULL,
    starID INT NOT NULL,
    systemName VARCHAR(255),
    planetQuantity INT,
    numColonized INT DEFAULT 0,
    PRIMARY KEY (systemID),
    FOREIGN KEY (starID) REFERENCES StarTypes(starID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Materials (
	materialID INT AUTO_INCREMENT,
	materialName VARCHAR(100) NOT NULL,
    value DECIMAL(16,2),
    units VARCHAR(50),
    PRIMARY KEY (materialID)
);

CREATE TABLE Planets (
    planetID INT AUTO_INCREMENT NOT NULL,
    nationID INT,
    planetName VARCHAR (100) NOT NULL DEFAULT 'Nameless',
    systemID INT NOT NULL,
    colonized BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (planetID),
    FOREIGN KEY (nationID) REFERENCES Nations(nationID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (systemID) REFERENCES StarSystems(systemID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ProducedMaterials (
    prodMaterialsID INT AUTO_INCREMENT NOT NULL,
    materialID INT,
    planetID INT,
    prodQuantity INT DEFAULT 0,
    PRIMARY KEY (prodMaterialsID),
    FOREIGN KEY (materialID) REFERENCES Materials(materialID)  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (planetID) REFERENCES Planets(planetID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE NaturalResources (
    natlResourcesID INT AUTO_INCREMENT NOT NULL,
    materialID INT,
    planetID INT,
    natlQuantity INT DEFAULT 0,
    PRIMARY KEY (natlResourcesID),
    FOREIGN KEY (materialID) REFERENCES Materials(materialID)  ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (planetID) REFERENCES Planets(planetID)  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Data insertion

INSERT INTO Nations (nationName, conquestsQuantity, shipQuantity)
VALUES	("Mexico", 1, 2),
		("Guatemala", 1,1),
        ("Canada", 2, 1);
        
INSERT INTO Ships (nationID, name, speed, capacity)
VALUES	(1, "Bacchus", 5, 10),
		(1, "Pinta", 2, 16),
        (2, "Yamato", 5.2, 10),
        (3, "Albatross", 7, 5);
        
INSERT INTO StarTypes (starType)
VALUES	("Red Giant Star"),
		("White Dwarf Star"),
        ("Red Dwarf Star");
        
INSERT INTO StarSystems (distance, starID, systemName, planetQuantity, numColonized)
VALUES	(4, 3, "Proxima Centauri", 3, 0),
		(2, 1, "Aldebaran", 2, 0),
        (5, 2, "Sirius B", 2, 0);
        
INSERT INTO Materials (materialName, value, units)
VALUES	("rubber", 6, "lbs"),
		("oil", 9, "liters"),
        ("minerals", 3, "oz");
        
INSERT INTO Planets (nationID, planetName, systemID, colonized)
VALUES	(1, "Proxima Centauri b", 1, 1),
		(1, "Anunnaki", 2, 1),
		(2, "Proxima Centauri d", 1, 1),
        (3, "Cancri e", 3, 1);
        
INSERT INTO ProducedMaterials (materialID, planetID, prodQuantity)
VALUES	(1, 2, 4),
		(1, 4, 2),
        (3, 3, 6);
        
INSERT INTO NaturalResources (materialID, planetID, natlQuantity)
VALUES	(1, 2, 2),
		(1, 4, 0),
		(3, 3, 0);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;