-- INSERTIONS
	-- add a new Nation
	INSERT INTO Nations (nationName, conquestsQuantity, shipQuantity) VALUES(:countryName, :numConquests, :numShips);

	-- add a new ship
	INSERT INTO Ships (nationID, name, speed, capacity) VALUES (:nationIDFromDropdownInput, :nationName, :speed, :cap);

	-- add a new starType
	INSERT INTO StarTypes (starType) VALUES (:starType);

	-- add a new starSystem
	INSERT INTO StarSystems (distance, starID, systemName, planetQuantity, numColonized) VALUES	(:distance, :starIDFromDropdownInput, :nameSystem, :numPlanets, :numColonized);

	-- add a new material
	INSERT INTO Materials (materialName, value, units) VALUES (:matl, :val, :unit);

	-- add a new planet
	INSERT INTO Planets (nationID, planetName, systemID, colonized) VALUES	(:nationIDFromDropdownInput, :planetName, :sysID, :colonizedStat);

	-- add a new producedMaterial
	INSERT INTO ProducedMaterials (materialID, planetID, prodQuantity) VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numProduced);

	-- add a new naturalResource
	INSERT INTO NaturalResources (materialID, planetID, natlQuantity) VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numNatl);

    
-- SELECTIONS
	-- get all nation IDs and nation names to populate drop down
    SELECT nationID, name from Nations;
    
    -- get all star IDs and star types to populate drop down
    SELECT starID, starType from StarTypes;
    
    -- get all material IDs and material names to populate drop down
    SELECT materialID, materialName from StarTypes;
    
    -- get all ships from a specific nation
    SELECT name FROM Ships WHERE nationID = :nationIDFromDropdownInput;
    
    -- get the num of planets colonized in a single starSystem
    SELECT numColonized FROM StarSystems WHERE systemID = :systemIDFromDropdownInput;
    
-- SELECT JOINS
	-- get all materials found on a given nation's planets
    SELECT ProducedMaterials.materialID, Nations.nationID, Planets.planetID
    FROM Nations
    INNER JOIN Planets ON Nations.nationID = Planets.naionID
    INNER JOIN ProducedMaterials ON Planets.planetID = ProducedMaterials.planetID
    INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
    WHERE Nations.nationID = :nationIDFromDropDownInput;
    
    -- DELETES
		-- delete a ship from a nation
        DELETE FROM Ships WHERE nationID = :nationIDFromDropDownInput;
    
    -- UPDATES
    -- updates a planet that has been recently colonized - add a relationship bt nations and planets
    UPDATE Planets SET nationID = :nationIDFromDropDownInput, colonized: = :colonizedStatOf1;
    
    -- updates the num of colonized planets in a given starSystem
    UPDATE StarSystems SET numColonized = :currNumColonizedPlus1;
    
    -- update a nation to have no ships
    UPDATE Ships SET nationID = NULL;
    
    -- update a planet to have no nation associated with it
    UPDATE Planets SET nationID = NULL;