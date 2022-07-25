-- ----------------------------
-- 			NATIONS
-- ----------------------------
	-- INSERT
		-- adding a nation
		INSERT INTO Nations (nationName, conquestsQuantity, shipQuantity) 
			VALUES(:countryName, :numConquests, :numShips);

    -- SELECT 
		-- get all the nation names and IDs for the dropdown list
		SELECT nationID, nationName from Nations ORDER BY nationName ASC;
        
        SELECT nationID, nationName from Nations ORDER BY nationName DESC;
    
		-- get all Nations data and sort by alphabetical order ASC then DESC
		SELECT nationID, nationName, conquestsQuantity, shipQuantity 
			FROM NATIONS
			ORDER BY nationName ASC;
			
		SELECT nationID, nationName, conquestsQuantity, shipQuantity 
			FROM NATIONS
			ORDER BY nationName DESC;
            
		-- get nations with 1+ ships ASC or DESC
		SELECT Nations.nationName, Ships.name as shipName  FROM Ships
			INNER JOIN Nations ON Nations.nationID = Ships.nationID
			WHERE Nations.shipQuantity > 0
            ORDER BY Nations.nationName ASC;
            
		SELECT Nations.nationName, Ships.name as shipName  FROM Ships
			INNER JOIN Nations ON Nations.nationID = Ships.nationID
			WHERE Nations.shipQuantity > 0
            ORDER BY Nations.nationName DESC;

		-- get nations with no ships 
		SELECT nationID, nationName, conquestsQuantity, shipQuantity from Nations WHERE shipQuantity = 0
			ORDER BY nationName ASC;

		-- get all planets, their star system names, and nation names from nations that have colonized planets
		SELECT Nations.nationName, Planets.planetName, StarSystems.systemName FROM Nations
			INNER JOIN Planets on Nations.nationID = Planets.nationID
            INNER JOIN StarSystems on Planets.systemID = StarSystems.systemID
			WHERE Nations.conquestsQuantity > 0
            ORDER BY nationName ASC;
     
     -- UPDATE
		-- update a nation
		UPDATE Nations SET nationName = :inputNationName, conquestsQuantity = :inputConquests, shipQuantity = :inputQuantity WHERE nationID = :nationIDFromDropdownList;

    -- DELETE
		-- delete a nation based on the nationID
		DELETE FROM Nations WHERE nationID = :nationIDInput;

-- ----------------------------
-- 			SHIPS
-- ----------------------------
	-- INSERT
		-- add a new ship
		INSERT INTO Ships (nationID, name, speed, capacity) 
			VALUES (:nationIDFromDropdownInput, :nationName, :speed, :cap);

	-- SELECT
		-- get all ship from a specific nation
		SELECT name, speed, capacity, shipID FROM Ships WHERE nationID = :IDFromDropdownInput ORDER BY name ASC;

	-- DELETE
	   -- delete a ship from a given nation
		DELETE FROM Ships WHERE nationID = :nationIDFromDropDownInput;
	
    -- UPDATE
		-- set ships and nation ID relatinship to NULL
		UPDATE Ships SET nationID = NULL WHERE shipID = :inputShipID;

-- ----------------------------
-- 			STARTYPES
-- ----------------------------
	-- INSERT
	-- add a new starType
	INSERT INTO StarTypes (starType) VALUES (:starType);
    
    -- SELECT
		-- get all star IDs and star types to populate drop down
		SELECT starID, starType from StarTypes ORDER BY starType ASC;
    
    -- DELETE
		-- delete a star type based on the ID
        DELETE FROM StarTypes WHERE starID = :inputFromDropdown;
    
    -- UPDATE
		-- updates the star type
        UPDATE StarTypes SET starType = :inputFromUser WHERE starID = :inputFromDropdown;

-- ----------------------------
-- 			STARSYSTEMS
-- ----------------------------
	-- INSERT
		-- add a new starSystem
		INSERT INTO StarSystems (distance, starID, systemName, planetQuantity, numColonized) 
			VALUES	(:distance, :starIDFromDropdownInput, :nameSystem, :numPlanets, :numColonized);

	-- SELECT 
		-- get star planets from a ___ minimum distance from the sol
		SELECT distance, systemName, planetQuantity, numColonized, starID FROM StarSystems 
			WHERE distance >= :inputFromTextbox
            ORDER BY distance ASC;
            
		-- get the total number of colonized planets in a system
        SELECT numColonized FROM StarSystems WHERE starID = :inputFromDropdown;
        
        -- get all star systems and IDs to populate dropdown
        SELECT starID, systemName FROM StarSystems ORDER BY systemName ASC;

	-- UPDATES
		-- updates the num of colonized planets in a given starSystem
		UPDATE StarSystems SET numColonized = :currNumColonizedPlus1 WHERE starID = :inputFromDropdown;
        
	-- DELETE
		-- deletes a starSystem
        DELETE FROM StarSystem WHERE starID = :inputFromDropdown;

-- ----------------------------
-- 			MATERIALS
-- ----------------------------
	-- INSERT
		-- add a new material
		INSERT INTO Materials (materialName, value, units) VALUES (:matl, :val, :unit);

	-- SELECT
		-- get all material IDs and material names to populate drop down
		SELECT materialID, materialName FROM Materials ORDER BY materialName ASC;
        
        -- get all materials and info
        SELECT materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, materialID FROM Materials ORDER BY materialName ASC;
        
        -- get all materials that appear in a planet
        SELECT Materials.materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, Materials.materialID, Planets.planetName, NaturalResources.planetID
			FROM Planets 
            INNER JOIN NaturalResources ON Planets.planetID = NaturalResources.planetID
            INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
            WHERE Planets.planetID = :IDFromDropdown
            GROUP BY materialName
            ORDER BY materialName ASC;
            
        -- get all materials that appear in a nation's planets
        SELECT Materials.materialName, CONCAT (Materials.value, " (", Materials.units, ")") AS pricePer, Materials.materialID, Nations.nationName, Planets.planetName
			FROM Nations
            INNER JOIN Planets ON Nations.nationID = Planets.nationID
            INNER JOIN NaturalResources ON Planets.planetID = NaturalResources.planetID
            INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
            WHERE Nations.nationID = :IDFromDropdown
            GROUP BY materialName
            ORDER BY materialName ASC;
        
	-- UPDATE
		UPDATE Materials SET materialName = :matlName, value = :price, units = :units WHERE materialID = :IDFromDropdown;
        
	-- DELETE
		-- Delete a material
		DELETE Materials WHERE materialID = :materialIDFromDropdownMenu;
        
-- ----------------------------
-- 			PLANETS
-- ----------------------------
	-- INSERT
		-- add a new planet
		INSERT INTO Planets (nationID, planetName, systemID, colonized) 
			VALUES	(:nationIDFromDropdownInput, :planetName, :sysID, :colonizedStat);

	-- UPDATE
		-- updates a planet that has been recently colonized - add a relationship bt nations and planets
		UPDATE Planets SET nationID = :IDFromDropdown, planetName = :userInput, systemID = :IDFromDropdown, colonized = :1Colonized0NotColonized;

		-- update a planet to have no nation associated with it
		UPDATE Planets SET nationID = NULL;
        
	-- SELECT
		-- get all planets that are not colonized
		SELECT Planets.planetID, Planets.planetName, StarSystems.systemName, Planets.colonized 
			FROM Planets 
            INNER JOIN StarSystems ON Planets.systemID = StarSystems.systemID
            WHERE colonized = 0;
        
        -- get all planets from a specific nation
        SELECT Nations.nationName, Planets.planetName; 
    
    -- DELETE
		-- Delete a planet
		DELETE FROM Planets WHERE planetID = :planetIDFromDropdown;

-- ----------------------------
-- 		PRODUCED MATERIALS
-- ----------------------------
	-- INSERT
		-- add a new producedMaterial
		INSERT INTO ProducedMaterials (materialID, planetID, prodQuantity) 
			VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numProduced);

	-- SELECT
		-- get all produced materials
		SELECT ProducedMaterials.materialID, Materials.materialName, Planets.planetName, ProducedMaterials.prodQuantity, ProducedMaterials.prodMaterialsID
			FROM ProducedMaterials
            INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
			INNER JOIN Planets ON ProducedMaterials.planetID = Planets.planetID 
            Order BY Materials.materialName ASC;
            
		-- get produced materials by nation
        SELECT ProducedMaterials.materialID, Materials.materialName, Nations.nationName, ProducedMaterials.prodQuantity, ProducedMaterials.prodMaterialsID 
			FROM ProducedMaterials
            INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
			INNER JOIN Planets ON ProducedMaterials.planetID = Planets.planetID 
            INNER JOIN Nations ON Planets.nationID = Nations.nationID
            WHERE Nations.nationID = :IDFromDropdown
            Order BY Materials.materialName ASC;
        
        -- get produced materials by planet
        SELECT ProducedMaterials.materialID, Materials.materialName, Planets.planetName, ProducedMaterials.prodQuantity, ProducedMaterials.prodMaterialsID 
			FROM ProducedMaterials
            INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
			INNER JOIN Planets ON ProducedMaterials.planetID = Planets.planetID 
            WHERE Nations.nationID = :IDFromDropdown
            Order BY Materials.materialName ASC;

	-- UPDATE
		-- update the material from a produced material
		UPDATE ProducedMaterials SET materialID = :IDFromDropdown, planetID = :IDFromDropdown, prodQuantity = :userInput WHERE prodMaterialsID = :producedIDFromDropdown;

	-- DELETE
		-- delete a produced material
		DELETE FROM ProducedMaterials WHERE prodMaterialsID = :IDFromDropdownInput;
    
-- ----------------------------
-- 		NATURAL RESOURCES
-- ----------------------------
	-- INSERT
		-- add a new naturalResource
		INSERT INTO NaturalResources (materialID, planetID, natlQuantity) VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numNatl);

	-- SELECT
		-- get all produced materials
			SELECT NaturalResources.materialID, Materials.materialName, Planets.planetName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID
				FROM NaturalResources
				INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
				INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID 
				Order BY Materials.materialName ASC;
				
			-- get produced materials by nation
			SELECT NaturalResources.materialID, Materials.materialName, Nations.nationName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID 
				FROM NaturalResources
				INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
				INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID 
				INNER JOIN Nations ON Planets.nationID = Nations.nationID
				WHERE Nations.nationID = :IDFromDropdown
				Order BY Materials.materialName ASC;
			
			-- get produced materials by planet
			SELECT NaturalResources.materialID, Materials.materialName, Planets.planetName, NaturalResources.natlQuantity, NaturalResources.natlResourcesID 
				FROM NaturalResources
				INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
				INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID 
				WHERE Nations.nationID = :IDFromDropdown
				Order BY Materials.materialName ASC;
            
	-- UPDATE
		-- update the material from a produced material
		UPDATE NaturalResources SET materialID = :IDFromDropdown, planetID = :IDFromDropdown, natlQuantity = :userInput WHERE natlResourcesID = :IDFromDropdown;

	-- DELETE
		-- delete a natural resource
		DELETE FROM NaturalResources WHERE planetID = :planetIDFromDropdownInput;