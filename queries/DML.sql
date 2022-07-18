-- NATION MANIPULATIONS
	-- add a new Nation
	INSERT INTO Nations (nationName, conquestsQuantity, shipQuantity) 
        VALUES(:countryName, :numConquests, :numShips);

    -- get all nation IDs and nation names to populate drop down
    SELECT nationID, name from Nations;
    
    -- get all Nations data and sort by alphabetical order
    SELECT nationID, nationName, conquestsQuantity, shipQuantity 
        FROM NATIONS
        ORDER BY nationName ASC

    -- get ship names and nation names from nations with 1+ ships
    SELECT Ships.name, Nations.nationName FROM Ships
        INNER JOIN Nations ON Nations.nationID = Ships.naionID
        WHERE Nations.shipQuantity > 0

    -- get nations with no ships 
    SELECT nationName from Nations WHERE shipQuantity = 0

    -- get all planets, star system names, and nation names from nations that have colonized planets
    SELECT Planets.planetName, Planets.starSystem, Nations.nationName FROM Nations
        INNER JOIN Planets on Nations.nationID = Planets.naionID
        WHERE Nations.conquestsQuantity > 1

    -- update a nation to have no ships
    UPDATE Ships SET nationID = 0;

-- SHIPS
	-- add a new ship
	INSERT INTO Ships (nationID, name, speed, capacity) 
        VALUES (:nationIDFromDropdownInput, :nationName, :speed, :cap);

    -- get all ship names from a specific nation
    SELECT name FROM Ships WHERE nationID = :natStarTypesionIDFromDropdownInput ORDER BY name ASC;

   -- delete a ship from a nation
    DELETE FROM Ships WHERE nationID = :nationIDFromDropDownInput;

-- STARTYPES
	-- add a new starType
	INSERT INTO StarTypes (starType) VALUES (:starType);

    -- get all star IDs and star types to populate drop down
    SELECT starID, starType from StarTypes;

-- STARSYSTEMS
	-- add a new starSystem
	INSERT INTO StarSystems (distance, starID, systemName, planetQuantity, numColonized) 
        VALUES	(:distance, :starIDFromDropdownInput, :nameSystem, :numPlanets, :numColonized);

    -- get the num of planets colonized in a single starSystem
    SELECT numColonized FROM StarSystems WHERE systemID = :systemIDFromDropdownInput;

    -- updates the num of colonized planets in a given starSystem
    UPDATE StarSystems SET numColonized = :currNumColonizedPlus1;

-- MATERIALS
	-- add a new material
	INSERT INTO Materials (materialName, value, units) VALUES (:matl, :val, :unit);

    -- get all material IDs and material names to populate drop down
    SELECT materialID, materialName from StarTypes;

-- PLANETS
	-- add a new planet
	INSERT INTO Planets (nationID, planetName, systemID, colonized) 
        VALUES	(:nationIDFromDropdownInput, :planetName, :sysID, :colonizedStat);

    -- updates a planet that has been recently colonized - add a relationship bt nations and planets
    UPDATE Planets SET nationID = :nationIDFromDropDownInput, colonized: = :colonizedStatOf1;

    -- update a planet to have no nation associated with it
    UPDATE Planets SET nationID = NULL;

    -- get all planets that are not colonized
    SELECT planetID, planetName FROM Planets where colonized = 0

    -- get all planets that are colonized
    SELECT planetID, planetName FROM Planets where colonized = 1

    -- get all materials found on a given nation's planets
    SELECT ProducedMaterials.materialID, Nations.nationID, Planets.planetID
        FROM Nations
        INNER JOIN Planets ON Nations.nationID = Planets.naionID
        INNER JOIN ProducedMaterials ON Planets.planetID = ProducedMaterials.planetID
        INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
        WHERE Nations.nationID = :nationIDFromDropDownInput;

-- PRODUCED MATERIALS
	-- add a new producedMaterial
	INSERT INTO ProducedMaterials (materialID, planetID, prodQuantity) 
        VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numProduced);

    -- select all produced materials
    SELECT materialID, Planets.planetName, prodQuantity FROM ProducedMaterials 
    INNER JOIN Planets ON ProducedMaterials.planetID = Planets.planetID Order BY Planets.planetName ASC

    -- update the material from a produced material
    UPDATE ProducedMaterials SET materialID = :matlIDFromDropdownInput WHERE producedID = :producedIDFromDropdown

    -- break relat bt a produced material and a planet
    UPDATE ProducedMaterials SET planetID = NULL WHERE producedID = :producedIDFromDropdown

    -- delete a produced material
    DELETE FROM ProducedMaterials WHERE planetID = :planetIDFromDropdownInput

    -- get all produced materials from a planet
    SELECT Materials.materialName, Planets.planetID, ProducedMaterials.prodQuantity 
        FROM ProducedMaterials
        INNER JOIN Materials ON ProducedMaterials.materialID = Materials.materialID
        INNER JOIN Planets on ProducedMaterials.planetID = Planets.planetID
        WHERE ProducedMaterials.planetID = :planetIDFromDropdownInput

-- NATURAL RESOURCES
	-- add a new naturalResource
	INSERT INTO NaturalResources (materialID, planetID, natlQuantity) VALUES (:matlIDFromDropdownInput, :planetIDFromInput, :numNatl);
    
    -- select all natural Resouces
    SELECT materialID, Planets.planetName, prodQuantity FROM NaturalResources 
        INNER JOIN Planets ON NaturalResources.planetID = Planets.planetID Order BY Planets.planetName ASC

    -- update the material from a natural resource
    UPDATE NaturalResources SET materialID = :matlIDFromDropdownInput WHERE natlResourcesID = :natlResourcesIDFromDropdown

    -- break relat bt a natural resource and a planet
    UPDATE NaturalResources SET planetID = NULL WHERE natlResourcesID = :natlResourcesIDFromDropdown

    -- delete a natural resource
    DELETE FROM NaturalResources WHERE planetID = :planetIDFromDropdownInput

    -- get all natural resources from a planet
    SELECT Materials.materialName, Planets.planetName, NaturalResources.natlQuantity 
        FROM NaturalResources
        INNER JOIN Materials ON NaturalResources.materialID = Materials.materialID
        INNER JOIN Planets on NaturalResources.planetID = Planets.planetID
        WHERE NaturalResources.planetID = :planetIDFromDropdownInput